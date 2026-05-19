import { getAuthenticatedUser, getUserVideos, getVideoStats } from "@/lib/queries"
import { VideoCard } from "@/components/videos/video-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Trophy, CheckCircle, Star, Flame } from "lucide-react"
import { Video } from "@/types/video"

export default async function CompletedPage() {
  const user = await getAuthenticatedUser()

  const [videos, stats] = await Promise.all([
    getUserVideos(user.id, { status: 'COMPLETED' }),
    getVideoStats(user.id),
  ])

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Finished Watching</h2>
        <p className="text-muted-foreground mt-1.5 text-sm font-medium">All the videos you&apos;ve successfully completed. Well done! 🎓</p>
      </div>

      {/* Gamified Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl glass-card p-5 shadow-md hover:border-border/80 transition-colors">
          <div className="rounded-xl bg-emerald-500/10 p-3 border border-emerald-500/10 text-emerald-500 dark:text-emerald-400">
            <Trophy className="w-5.5 h-5.5 stroke-[1.5]" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-foreground">{stats.completed}</p>
            <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider font-extrabold select-none">Finished Watching</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl glass-card p-5 shadow-md hover:border-border/80 transition-colors">
          <div className="rounded-xl bg-amber-500/10 p-3 border border-amber-500/10 text-amber-500 dark:text-amber-400">
            <Star className="w-5.5 h-5.5 stroke-[1.5]" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-foreground">
              {stats.totalSaved > 0 ? Math.round((stats.completed / stats.totalSaved) * 100) : 0}%
            </p>
            <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider font-extrabold select-none">Completion Rate</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl glass-card p-5 shadow-md hover:border-border/80 transition-colors">
          <div className="rounded-xl bg-rose-500/10 p-3 border border-rose-500/10 text-rose-500 dark:text-rose-450">
            <Flame className="w-5.5 h-5.5 stroke-[1.5]" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-foreground">{stats.unwatched}</p>
            <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider font-extrabold select-none">Still To Watch</p>
          </div>
        </div>
      </div>

      {videos.length === 0 ? (
        <EmptyState
          icon={CheckCircle}
          title="No completed videos yet ✨"
          description="Your finished videos will appear here. Enjoy your learning journey!"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video: Video) => (
            <VideoCard key={video.id} video={video} showCategory showCompletedDate />
          ))}
        </div>
      )}
    </div>
  )
}
