import prisma from "@/lib/db"
import { runHybridCategorizer } from "./categorizer"

function parseISODuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const hours = parseInt(match[1] || '0', 10)
  const minutes = parseInt(match[2] || '0', 10)
  const seconds = parseInt(match[3] || '0', 10)
  return hours * 3600 + minutes * 60 + seconds
}

export class SyncService {
  static async refreshGoogleAccessToken(userId: string, refreshToken: string): Promise<string> {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in background refresh.")
      throw new Error("Your YouTube session expired. Please reconnect your account.")
    }

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      })

      if (!response.ok) {
        const errData = await response.json()
        console.error("Google OAuth token refresh error:", errData)
        throw new Error("Your YouTube session expired. Please reconnect your account.")
      }

      const data = await response.json()
      const newAccessToken = data.access_token

      if (!newAccessToken) {
        throw new Error("Your YouTube session expired. Please reconnect your account.")
      }

      // Update in database
      await prisma.user.update({
        where: { id: userId },
        data: { providerToken: newAccessToken }
      })

      return newAccessToken
    } catch (err: any) {
      console.error("Token refresh utility error:", err)
      throw new Error(
        err.message === "Your YouTube session expired. Please reconnect your account."
          ? err.message
          : "Your YouTube session expired. Please reconnect your account."
      )
    }
  }

  static async syncLikedVideos(userId: string, pageToken?: string | null) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user || !user.providerToken) {
      throw new Error("No YouTube provider token found for this user.")
    }

    try {
      // Step 1: Fetch Liked Videos playlist items (max 50)
      let token = user.providerToken
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=LL`
      if (pageToken) {
        url += `&pageToken=${pageToken}`
      }

      let playlistResponse = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // If token is expired, try to refresh it dynamically!
      if (playlistResponse.status === 401) {
        if (user.providerRefreshToken) {
          console.log("Access token expired (401). Attempting automatic refresh using refresh token...")
          try {
            token = await this.refreshGoogleAccessToken(userId, user.providerRefreshToken)
            // Retry the request with the fresh token!
            playlistResponse = await fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          } catch (refreshError: any) {
            console.error("Dynamic token refresh failed:", refreshError)
            throw new Error("Your YouTube session expired. Please reconnect your account.")
          }
        } else {
          console.warn("Access token expired (401) but no refresh token is stored in the database.")
          throw new Error("Your YouTube session expired. Please reconnect your account.")
        }
      }

      if (!playlistResponse.ok) {
        const errData = await playlistResponse.json()
        console.error("YouTube PlaylistItems API error:", errData)
        throw new Error(`YouTube API returned ${playlistResponse.status}: ${errData.error?.message}`)
      }

      const playlistData = await playlistResponse.json()
      const items = playlistData.items || []
      const nextPageToken = playlistData.nextPageToken || null

      if (items.length === 0) {
        return { success: true, count: 0, nextPageToken }
      }

      // Step 2: Extract video IDs for batch fetching details
      const videoIds = items.map((item: any) => item.snippet?.resourceId?.videoId).filter(Boolean)

      // Step 3: Batch fetch full video details (description, tags, categoryId, duration)
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds.join(',')}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!videosResponse.ok) {
        const errData = await videosResponse.json()
        console.error("YouTube Videos API error:", errData)
        throw new Error(`YouTube API returned ${videosResponse.status}: ${errData.error?.message}`)
      }

      const videosData = await videosResponse.json()
      const richVideos = videosData.items || []

      // Create a lookup map by Video ID
      const richVideoMap = new Map<string, any>()
      for (const rv of richVideos) {
        richVideoMap.set(rv.id, rv)
      }

      // Process each video
      let syncedCount = 0
      for (const item of items) {
        try {
          const snippet = item.snippet
          const videoId = snippet?.resourceId?.videoId
          if (!videoId) continue

          const richData = richVideoMap.get(videoId)
          const richSnippet = richData?.snippet || {}
          const contentDetails = richData?.contentDetails || {}

          // Check if video already exists and category is manually overridden
          const existingVideo = await prisma.video.findUnique({
            where: { userId_youtubeId: { userId: user.id, youtubeId: videoId } }
          })

          let finalCategoryId: string | null = existingVideo?.categoryId || null
          let finalPriority = existingVideo?.priority || 'MEDIUM'
          let finalConfidence = existingVideo?.categoryConfidence || null
          let finalDebugSignals = existingVideo?.classificationSignals || null

          if (existingVideo && existingVideo.isCategoryOverridden) {
            // Keep manually overridden details intact
            console.log(`Video ${videoId} has manual override. Skipping auto-categorization.`)
          } else {
            // Run Stage 7 Hybrid Categorization Engine with full preprocessed signals
            const classification = runHybridCategorizer({
              title: snippet.title,
              description: richSnippet.description || snippet.description,
              channelName: snippet.videoOwnerChannelTitle || snippet.channelTitle,
              youtubeCategoryId: richSnippet.categoryId,
              tags: richSnippet.tags || []
            })

            // Ensure category exists in DB
            let category = await prisma.category.findFirst({
              where: { 
                userId: user.id,
                OR: [
                  { slug: classification.slug },
                  { name: classification.categoryName }
                ]
              }
            })

            if (!category) {
              category = await prisma.category.create({
                data: {
                  name: classification.categoryName,
                  slug: classification.slug,
                  color: classification.color,
                  userId: user.id,
                }
              })
            }

            finalCategoryId = category.id
            finalPriority = classification.priority
            finalConfidence = classification.confidence
            finalDebugSignals = classification.debugSignals
          }

          const parsedDuration = contentDetails.duration ? parseISODuration(contentDetails.duration) : 0

          // Upsert the video with high-fidelity metadata
          await prisma.video.upsert({
            where: { userId_youtubeId: { userId: user.id, youtubeId: videoId } },
            update: {
              title: snippet.title,
              channelName: snippet.videoOwnerChannelTitle || snippet.channelTitle,
              thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
              duration: parsedDuration || existingVideo?.duration || 0,
              description: richSnippet.description || snippet.description || null,
              youtubeCategoryId: richSnippet.categoryId || null,
              tags: richSnippet.tags || [],
              categoryConfidence: finalConfidence,
              categoryId: finalCategoryId,
              classificationSignals: finalDebugSignals,
            },
            create: {
              userId: user.id,
              youtubeId: videoId,
              url: `https://www.youtube.com/watch?v=${videoId}`,
              title: snippet.title,
              channelName: snippet.videoOwnerChannelTitle || snippet.channelTitle,
              thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
              duration: parsedDuration || 0,
              status: "UNWATCHED",
              priority: finalPriority as any,
              categoryId: finalCategoryId,
              description: richSnippet.description || snippet.description || null,
              youtubeCategoryId: richSnippet.categoryId || null,
              tags: richSnippet.tags || [],
              categoryConfidence: finalConfidence,
              isCategoryOverridden: false,
              classificationSignals: finalDebugSignals,
            }
          })

          syncedCount++
        } catch (itemError) {
          console.error(`Failed to sync video ${item.snippet?.resourceId?.videoId}:`, itemError)
        }
      }

      // Update last sync time only when the pagination is complete or there's no nextPageToken
      if (!nextPageToken) {
        await prisma.user.update({
          where: { id: user.id },
          data: { lastSyncAt: new Date() }
        })
      }

      return { success: true, count: syncedCount, nextPageToken }

    } catch (error) {
      console.error("Error syncing Liked Videos:", error)
      throw error
    }
  }
}
