import { config } from 'dotenv'
config()

import { runHybridCategorizer } from "../src/services/categorizer"

async function main() {
  console.log("Starting backfill for existing videos with 7-Stage Classification Pipeline...")

  // Load Prisma AFTER dotenv has populated process.env
  const prisma = require('../src/lib/db').default

  // Fetch all videos
  const videos = await prisma.video.findMany()
  console.log(`Found ${videos.length} total videos in database.`)

  let updatedCount = 0
  for (const video of videos) {
    try {
      let classification = {
        categoryName: 'Uncategorized',
        slug: 'uncategorized',
        color: 'bg-zinc-500',
        priority: 'MEDIUM',
        confidence: 0.0,
        debugSignals: ''
      }

      if (!video.isCategoryOverridden) {
        const result = runHybridCategorizer({
          title: video.title,
          description: video.description,
          channelName: video.channelName,
          youtubeCategoryId: video.youtubeCategoryId,
          tags: video.tags || []
        })
        classification = {
          categoryName: result.categoryName,
          slug: result.slug,
          color: result.color,
          priority: result.priority,
          confidence: result.confidence,
          debugSignals: result.debugSignals
        }
      } else {
        // For overridden videos, let's resolve their current category or fall back to uncategorized if it was set to null
        if (!video.categoryId) {
          classification = {
            categoryName: 'Uncategorized',
            slug: 'uncategorized',
            color: 'bg-zinc-500',
            priority: video.priority || 'MEDIUM',
            confidence: 1.0,
            debugSignals: '{"explanation": "Manual override reset to standardized uncategorized category."}'
          }
        } else {
          // Keep current category ID
          continue
        }
      }

      // Query by both name and slug to avoid any unique constraint conflicts
      let category = await prisma.category.findFirst({
        where: { 
          userId: video.userId,
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
            userId: video.userId,
          }
        })
      }

      await prisma.video.update({
        where: { id: video.id },
        data: {
          categoryId: category.id,
          priority: video.isCategoryOverridden ? video.priority : classification.priority,
          categoryConfidence: video.isCategoryOverridden ? 1.0 : classification.confidence,
          classificationSignals: video.isCategoryOverridden ? video.classificationSignals : classification.debugSignals
        }
      })

      console.log(`[Normalized] Title: "${video.title}" -> ${classification.categoryName} (${category.slug})`)
      updatedCount++
    } catch (err) {
      console.error(`Failed to normalize video ${video.id}:`, err)
    }
  }

  console.log(`Successfully normalized ${updatedCount} videos in database!`)
}

main()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
