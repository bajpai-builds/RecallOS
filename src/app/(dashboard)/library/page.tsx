import { getAuthenticatedUser, getUserVideos } from "@/lib/queries"
import { VideoCard } from "@/components/videos/video-card"
import { EmptyState } from "@/components/ui/empty-state"
import { PlayCircle } from "lucide-react"
import { Video } from "@/types/video"

export default async function LibraryPage() {
  const user = await getAuthenticatedUser()

  const videos = await getUserVideos(user.id)

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Library</h2>
          <p className="text-muted-foreground mt-1.5 text-sm font-medium">All categorized and uncategorized videos in your collection.</p>
        </div>
      </div>

      {videos.length === 0 ? (
        <EmptyState
          icon={PlayCircle}
          title="Your library is beautifully empty ✨"
          description="Start saving videos from YouTube, and they'll be organized here automatically."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video: Video) => (
            <VideoCard key={video.id} video={video} showCategory />
          ))}
        </div>
      )}
    </div>
  )
}
