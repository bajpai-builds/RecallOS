import { getAuthenticatedUser } from "@/lib/queries"
import { VideoCard } from "@/components/videos/video-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Clock, Zap, AlertTriangle } from "lucide-react"
import prisma from "@/lib/db"

export default async function WatchLaterPage() {
  const user = await getAuthenticatedUser()

  const videos = await prisma.video.findMany({
    where: { userId: user.id, status: { in: ['SAVED', 'STARTED', 'IN_PROGRESS', 'UNWATCHED'] } },
    include: { category: true },
    orderBy: [
      { priority: 'desc' }, // CRITICAL first
      { createdAt: 'desc' },
    ],
  })

  // Priority breakdown
  const critical = videos.filter(v => v.priority === 'CRITICAL').length
  const high = videos.filter(v => v.priority === 'HIGH').length
  const medium = videos.filter(v => v.priority === 'MEDIUM').length
  const low = videos.filter(v => v.priority === 'LOW').length

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Watch Later</h2>
        <p className="text-muted-foreground mt-1.5 text-sm font-medium">Your curated personal learning queue. {videos.length} videos waiting for you.</p>
      </div>

      {/* Priority Breakdown Widgets */}
      {videos.length > 0 && (
        <div className="flex flex-wrap gap-2.5 select-none">
          {critical > 0 && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/15 bg-rose-500/5 px-3 py-1.5 text-xs font-bold shadow-sm">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-rose-550 dark:text-rose-450 font-extrabold">{critical}</span>
              <span className="text-muted-foreground font-semibold">Watch Soon</span>
            </div>
          )}
          {high > 0 && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/10 bg-rose-500/5 px-3 py-1.5 text-xs font-bold shadow-sm">
              <Zap className="w-3.5 h-3.5 text-rose-450" />
              <span className="text-rose-550 dark:text-rose-450 font-extrabold">{high}</span>
              <span className="text-muted-foreground font-semibold">Watch Soon</span>
            </div>
          )}
          {medium > 0 && (
            <div className="flex items-center gap-2 rounded-xl border border-amber-500/10 bg-amber-500/5 px-3 py-1.5 text-xs font-bold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-amber-600 dark:text-amber-400 font-extrabold">{medium}</span>
              <span className="text-muted-foreground font-semibold">Worth Watching</span>
            </div>
          )}
          {low > 0 && (
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-bold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              <span className="text-foreground font-extrabold">{low}</span>
              <span className="text-muted-foreground font-semibold">Saved For Later</span>
            </div>
          )}
        </div>
      )}

      {videos.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="All caught up! ✨"
          description="Nothing saved for later right now. Your next great watch will appear here."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} showCategory />
          ))}
        </div>
      )}
    </div>
  )
}
