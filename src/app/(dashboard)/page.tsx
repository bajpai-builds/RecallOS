import { AutoSync } from "@/components/sync/auto-sync"
import { ManualSyncButton } from "@/components/sync/manual-sync-button"
import { VideoCard } from "@/components/videos/video-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle, Clock, Zap, Target } from "lucide-react"
import { getAuthenticatedUser, getVideoStats } from "@/lib/queries"
import prisma from "@/lib/db"

export default async function DashboardPage() {
  const user = await getAuthenticatedUser()

  const stats = await getVideoStats(user.id)

  // Query partially watched videos (Netflix/Spotify watch continuity)
  const continueWatchingVideos = await prisma.video.findMany({
    where: {
      userId: user.id,
      status: { in: ['STARTED', 'IN_PROGRESS'] }
    },
    include: { category: true },
    orderBy: { lastOpenedAt: 'desc' },
    take: 3
  })

  const resurfacedVideos = await prisma.video.findMany({
    where: { 
      userId: user.id, 
      status: { in: ['SAVED', 'STARTED', 'IN_PROGRESS', 'UNWATCHED'] },
      priority: { in: ['HIGH', 'CRITICAL', 'MEDIUM'] }
    },
    include: { category: true },
    orderBy: { createdAt: 'asc' }, // oldest first
    take: 3
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <AutoSync />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Welcome Back</h2>
          <p className="text-muted-foreground mt-1.5 text-sm font-medium">Your personal companion for calm and structured learning.</p>
        </div>
        <ManualSyncButton />
      </div>

      {/* Stats row */}
      <div id="onboarding-stats-row" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 select-none">
        <Card className="glass-card rounded-2xl shadow-md transition-colors hover:border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-5">
            <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Your Saved Videos</CardTitle>
            <PlayCircle className="h-4.5 w-4.5 text-primary" />
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <div className="text-3xl font-extrabold text-foreground leading-none">{stats.totalSaved}</div>
          </CardContent>
        </Card>
        <Card className="glass-card rounded-2xl shadow-md transition-colors hover:border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-5">
            <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Still To Watch</CardTitle>
            <Clock className="h-4.5 w-4.5 text-amber-500" />
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <div className="text-3xl font-extrabold text-foreground leading-none">{stats.unwatched}</div>
          </CardContent>
        </Card>
        <Card id="onboarding-stats-watch-soon" className="glass-card rounded-2xl shadow-md transition-colors hover:border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-5">
            <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Watch Soon</CardTitle>
            <Zap className="h-4.5 w-4.5 text-rose-500" />
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <div className="text-3xl font-extrabold text-foreground leading-none">{stats.highPriority}</div>
          </CardContent>
        </Card>
        <Card className="glass-card rounded-2xl shadow-md transition-colors hover:border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-5">
            <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Finished Watching</CardTitle>
            <Target className="h-4.5 w-4.5 text-emerald-500" />
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <div className="text-3xl font-extrabold text-foreground leading-none">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Watching Section */}
      {continueWatchingVideos.length > 0 && (
        <div className="grid gap-6">
          <Card id="onboarding-continue-watching" className="glass-card rounded-2xl shadow-md overflow-hidden border-border/40">
            <CardHeader className="pb-3 border-b border-border/60 p-5 md:p-6 bg-accent/20">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                <PlayCircle className="w-4.5 h-4.5 text-primary" />
                🍿 Continue Watching
              </CardTitle>
              <CardDescription className="text-muted-foreground text-[11px] leading-relaxed font-medium">
                Pick up right where you left off. Every opened link is carefully cataloged here until you say so.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 md:p-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {continueWatchingVideos.map((video, index) => (
                  <VideoCard key={video.id} video={video} showCategory id={index === 0 ? "onboarding-video-card-0" : undefined} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resurfacing Widget */}
      <div className="grid gap-6">
        <Card className="glass-card rounded-2xl shadow-md overflow-hidden border-border/40">
          <CardHeader className="pb-3 border-b border-border/60 p-5 md:p-6 bg-accent/20">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <Zap className="w-4.5 h-4.5 text-primary animate-pulse" />
              Smart Resurfacing
            </CardTitle>
            <CardDescription className="text-muted-foreground text-[11px] leading-relaxed font-medium">
              You saved these earlier — maybe now&apos;s the right time to watch them.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:p-6">
            {resurfacedVideos.length === 0 ? (
              <EmptyState
                icon={Zap}
                title="All caught up! ✨"
                description="No pressing items need your attention right now. Your companion will resurface content here when it's time."
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resurfacedVideos.map((video, index) => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    showCategory 
                    id={continueWatchingVideos.length === 0 && index === 0 ? "onboarding-video-card-0" : undefined}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
