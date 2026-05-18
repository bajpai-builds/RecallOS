"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

function revalidateAll() {
  revalidatePath("/")
  revalidatePath("/library")
  revalidatePath("/completed")
  revalidatePath("/watch-later")
  revalidatePath("/category/[slug]", "layout")
}

import { transitionWatchState, WatchEvent } from "@/lib/watch-state-engine"

export async function updateVideoStatus(
  id: string, 
  status: "SAVED" | "STARTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED"
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const data: any = { status }

  // Align timestamps and states cleanly
  if (status === 'COMPLETED') {
    data.completedAt = new Date()
    data.manuallyCompleted = true
    data.inferredCompletionConfidence = 1.0
  } else if (status === 'ARCHIVED') {
    data.archivedAt = new Date()
  } else if (status === 'SAVED') {
    data.completedAt = null
    data.startedAt = null
    data.lastOpenedAt = null
    data.openCount = 0
    data.manuallyCompleted = false
    data.inferredCompletionConfidence = 0.0
  }

  await prisma.video.update({
    where: { id, userId: user.id },
    data
  })
  
  revalidateAll()
}

export async function registerWatchEvent(id: string, event: WatchEvent) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const video = await prisma.video.findUnique({
    where: { id, userId: user.id }
  })
  if (!video) throw new Error("Video not found")

  // Transition using the event-driven Watch-State Engine
  const nextFields = transitionWatchState({
    status: video.status,
    startedAt: video.startedAt,
    lastOpenedAt: video.lastOpenedAt,
    openCount: video.openCount,
    completedAt: video.completedAt,
    archivedAt: video.archivedAt,
    manuallyCompleted: video.manuallyCompleted,
    inferredCompletionConfidence: video.inferredCompletionConfidence
  }, event)

  // Save the updated state machine fields back to the DB
  await prisma.video.update({
    where: { id, userId: user.id },
    data: nextFields
  })

  revalidateAll()
}

export async function updateVideoPriority(id: string, priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL") {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  await prisma.video.update({
    where: { id, userId: user.id },
    data: { priority }
  })
  
  revalidateAll()
}

export async function overrideVideoCategory(id: string, categoryId: string | null) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  let targetCategoryId = categoryId

  // Self-healing: normalize "null" category to the actual real "uncategorized" Category ID
  if (!targetCategoryId) {
    let uncategorizedCategory = await prisma.category.findFirst({
      where: { userId: user.id, slug: 'uncategorized' }
    })
    if (!uncategorizedCategory) {
      uncategorizedCategory = await prisma.category.create({
        data: {
          name: 'Uncategorized',
          slug: 'uncategorized',
          color: 'bg-zinc-500',
          userId: user.id
        }
      })
    }
    targetCategoryId = uncategorizedCategory.id
  }

  await prisma.video.update({
    where: { id, userId: user.id },
    data: {
      categoryId: targetCategoryId,
      isCategoryOverridden: true,
      categoryConfidence: 1.0
    }
  })

  revalidateAll()
}

export async function reclassifyAllVideos() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const videos = await prisma.video.findMany({
    where: { userId: user.id }
  })

  let reclassifiedCount = 0
  const { runHybridCategorizer } = require('../services/categorizer')

  for (const video of videos) {
    if (video.isCategoryOverridden) continue

    const classification = runHybridCategorizer({
      title: video.title,
      description: video.description,
      channelName: video.channelName,
      youtubeCategoryId: video.youtubeCategoryId,
      tags: video.tags || []
    })

    // Find or create category record safely
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
          userId: user.id
        }
      })
    }

    await prisma.video.update({
      where: { id: video.id },
      data: {
        categoryId: category.id,
        priority: classification.priority,
        categoryConfidence: classification.confidence,
        classificationSignals: classification.debugSignals
      }
    })

    reclassifiedCount++
  }

  revalidateAll()
  return { success: true, count: reclassifiedCount }
}

export async function deleteVideo(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  await prisma.video.delete({
    where: { id, userId: user.id }
  })
  
  revalidateAll()
}
