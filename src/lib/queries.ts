import prisma from "@/lib/db"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { normalizeCategorySlug } from "./normalize"

// ─── Auth Helper ───────────────────────────────────────────────────────────────

export async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return user
}

// ─── Video Queries ─────────────────────────────────────────────────────────────

export type VideoFilter = {
  status?: string | string[]
  priority?: string | string[]
  categoryId?: string
  categorySlug?: string
}

export async function getUserVideos(userId: string, filters?: VideoFilter) {
  const where: any = { userId }

  if (filters?.status) {
    if (filters.status === 'UNWATCHED') {
      where.status = { in: ['SAVED', 'STARTED', 'IN_PROGRESS', 'UNWATCHED'] }
    } else {
      where.status = Array.isArray(filters.status) 
        ? { in: filters.status } 
        : filters.status
    }
  }

  if (filters?.priority) {
    where.priority = Array.isArray(filters.priority) 
      ? { in: filters.priority } 
      : filters.priority
  }

  if (filters?.categoryId) {
    where.categoryId = filters.categoryId
  }

  if (filters?.categorySlug) {
    const normalizedSlug = normalizeCategorySlug(filters.categorySlug)
    where.category = { slug: normalizedSlug }
  }

  return prisma.video.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
}

// ─── Category Queries ──────────────────────────────────────────────────────────

export async function getUserCategories(userId: string) {
  const dbCategories = await prisma.category.findMany({
    where: { userId },
    include: {
      _count: { select: { videos: true } }
    },
    orderBy: { name: 'asc' },
  })

  // Hide empty categories (0 videos) as per product requirement
  return dbCategories.filter(cat => cat._count.videos > 0)
}

export async function getCategoryBySlug(userId: string, slug: string) {
  const normalizedSlug = normalizeCategorySlug(slug)
  return prisma.category.findFirst({
    where: { userId, slug: normalizedSlug },
    include: {
      _count: { select: { videos: true } }
    },
  })
}

// ─── Stats Queries ─────────────────────────────────────────────────────────────

export async function getVideoStats(userId: string) {
  const [totalSaved, unwatched, highPriority, completed] = await Promise.all([
    prisma.video.count({ where: { userId } }),
    prisma.video.count({ where: { userId, status: { in: ['SAVED', 'STARTED', 'IN_PROGRESS', 'UNWATCHED'] } } }),
    prisma.video.count({ where: { userId, priority: { in: ['HIGH', 'CRITICAL'] } } }),
    prisma.video.count({ where: { userId, status: 'COMPLETED' } }),
  ])

  return { totalSaved, unwatched, highPriority, completed }
}
