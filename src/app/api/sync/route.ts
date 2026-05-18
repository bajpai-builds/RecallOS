import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { SyncService } from '@/services/youtube-sync'
import prisma from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const isForced = searchParams.get('force') === 'true'
    const pageToken = searchParams.get('pageToken')

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (!dbUser || !dbUser.providerToken) {
      return NextResponse.json({ error: 'No YouTube access token found. Please sign in again.' }, { status: 400 })
    }

    // Check if we need to sync (e.g., last sync was > 1 hour ago)
    const ONE_HOUR = 60 * 60 * 1000
    // If pageToken is provided, this is a continuation of an ongoing sync, so bypass the throttle.
    if (!isForced && !pageToken && dbUser.lastSyncAt && (Date.now() - new Date(dbUser.lastSyncAt).getTime() < ONE_HOUR)) {
      return NextResponse.json({ message: 'Sync skipped (already synced recently)', success: true })
    }

    // Trigger sync
    const result = await SyncService.syncLikedVideos(user.id, pageToken)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Sync API Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
