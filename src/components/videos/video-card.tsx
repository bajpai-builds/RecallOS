"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, PlayCircle } from "lucide-react"
import { VideoActionsMenu } from "@/components/videos/video-actions-menu"
import { VideoCardDebug } from "@/components/videos/video-card-debug"
import { QuickCategorySelect } from "@/components/videos/quick-category-select"
import { formatPriority, getPriorityStyle, formatCategoryName, formatWatchState, getWatchStateStyle, getCategoryColorStyle } from "@/lib/ux-formatter"
import { registerWatchEvent } from "@/actions/video"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

function formatDuration(seconds: number | null) {
  if (!seconds) return "Unknown"
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  return `${m}:${s.toString().padStart(2, '0')}`
}

type VideoCardProps = {
  video: {
    id: string
    title: string
    channelName: string
    thumbnailUrl: string | null
    duration: number | null
    status: string
    priority: string
    url: string
    completedAt?: Date | null
    categoryId?: string | null
    category?: { name: string; slug: string; color: string } | null
    classificationSignals?: string | null
  }
  showCategory?: boolean
  showCompletedDate?: boolean
  id?: string
}

export function VideoCard({ video, showCategory = false, showCompletedDate = false, id }: VideoCardProps) {
  const router = useRouter()
  const [showPrompt, setShowPrompt] = useState(false)

  const handleWatch = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If the video is already marked as completed, let it open normally
    if (video.status === 'COMPLETED') {
      return
    }

    e.preventDefault()
    
    // Step 1: Open the YouTube video in a new browser tab safely and immediately (bypasses popup blockers)
    window.open(video.url, '_blank', 'noopener,noreferrer')
    
    // Step 2: Show the calming custom confirmation prompt instantly
    setShowPrompt(true)

    try {
      // Step 3: Fire OPEN_VIDEO watch state machine event in the background
      await registerWatchEvent(video.id, "OPEN_VIDEO")
      
      // Step 4: Refresh lists to update Started/Continue Watching badge
      router.refresh()
    } catch (err: any) {
      console.error("Failed to register watch event on click:", err)
    }
  }

  const handlePromptOption = async (eventOption: "EXPLICIT_COMPLETE" | "EXPLICIT_STILL_WATCHING" | "EXPLICIT_SAVE_FOR_LATER") => {
    try {
      await registerWatchEvent(video.id, eventOption)
      setShowPrompt(false)
      
      if (eventOption === "EXPLICIT_COMPLETE") {
        toast.success("Awesome! Marked as Finished Watching ✅")
      } else if (eventOption === "EXPLICIT_STILL_WATCHING") {
        toast.success("No rush! Added to Continue Watching ⏳")
      } else if (eventOption === "EXPLICIT_SAVE_FOR_LATER") {
        toast.success("Saved for later watch session! 📌")
      }
      
      router.refresh()
    } catch (err: any) {
      console.error("Failed to update explicit watch prompt choice:", err)
      toast.error("Couldn't update state. Please try again.")
    }
  }

  return (
    <Card id={id} className="glass-card glass-card-hover rounded-2xl overflow-hidden h-full flex flex-col group">
      <div className="relative aspect-video w-full bg-surface-hover overflow-hidden select-none">
        {video.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <PlayCircle className="w-10 h-10 text-muted group-hover:text-primary transition-colors" />
          </div>
        )}
        
        {/* Play Icon Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-center justify-center pointer-events-none">
          <div className="p-3 rounded-full bg-background/85 backdrop-blur-md border border-white/10 text-primary transform scale-90 group-hover:scale-100 transition-transform duration-300 ease-out shadow-lg shadow-primary/15">
            <PlayCircle className="w-5 h-5 fill-primary/20" />
          </div>
        </div>

        {/* Thumbnail Bottom Shadow Fade */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent pointer-events-none opacity-80" />

        <div className="absolute bottom-2.5 right-2.5 bg-background/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-bold text-foreground flex items-center gap-1 border border-border/50 shadow-inner">
          <Clock className="w-3 h-3 text-muted-foreground" />
          {formatDuration(video.duration)}
        </div>
      </div>
      <CardContent className="p-5 md:p-6 flex flex-col justify-between flex-1 min-h-[200px] gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant="outline" className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full tracking-wide uppercase border-border ${getPriorityStyle(video.priority)}`}>
                {formatPriority(video.priority)}
              </Badge>
              {video.category?.slug === 'uncategorized' ? (
                <QuickCategorySelect videoId={video.id} currentCategoryId={video.categoryId} />
              ) : (
                showCategory && video.category && (
                  <Badge variant="outline" className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wide select-none ${getCategoryColorStyle(video.category.name)}`}>
                    {formatCategoryName(video.category.name)}
                  </Badge>
                )
              )}
            </div>
            <VideoActionsMenu 
              videoId={video.id} 
              currentStatus={video.status} 
              currentPriority={video.priority}
              currentCategoryId={video.categoryId}
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-foreground group-hover:text-primary line-clamp-2 text-sm leading-snug tracking-tight transition-colors cursor-pointer" title={video.title}>
              <a href={video.url} target="_blank" rel="noreferrer" onClick={handleWatch} className="hover:text-primary transition-colors">
                {video.title}
              </a>
            </h3>
            <p className="text-[11px] text-muted-foreground font-bold tracking-wide uppercase truncate select-none">
              {video.channelName}
            </p>
          </div>
        </div>

        <div>
          {/* Collapsible classification logs developer helper */}
          <VideoCardDebug signalsJson={video.classificationSignals} />

          {/* Conditional smart watch prompt overlay */}
          {showPrompt ? (
            <div className="mt-2 pt-3 border-t border-border/80 flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest text-center select-none">
                Finished watching?
              </p>
              <div className="flex gap-1.5 justify-center">
                <button 
                  onClick={() => handlePromptOption("EXPLICIT_COMPLETE")}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/25 px-2.5 py-1.5 rounded-xl text-[10px] font-black transition-all cursor-pointer shadow-sm active:scale-95 hover:shadow-emerald-500/5"
                >
                  ✨ Completed
                </button>
                <button 
                  onClick={() => handlePromptOption("EXPLICIT_STILL_WATCHING")}
                  className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/25 px-2.5 py-1.5 rounded-xl text-[10px] font-black transition-all cursor-pointer shadow-sm active:scale-95 hover:shadow-amber-500/5"
                >
                  ⏳ Still Watching
                </button>
                <button 
                  onClick={() => handlePromptOption("EXPLICIT_SAVE_FOR_LATER")}
                  className="bg-surface hover:bg-surface-hover text-foreground border border-border px-2.5 py-1.5 rounded-xl text-[10px] font-black transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  📌 Save for Later
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-border/60 flex justify-between items-center text-[11px] select-none">
              <Badge variant="secondary" className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getWatchStateStyle(video.status)}`}>
                {formatWatchState(video.status)}
              </Badge>
              {showCompletedDate && video.completedAt && (
                <span className="text-[10px] text-muted-foreground font-semibold tracking-tight">
                  {new Date(video.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
              <a href={video.url} target="_blank" rel="noreferrer" onClick={handleWatch} className="text-[11px] font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer hover:underline underline-offset-4 active:scale-95 py-1 px-2 -mr-2 rounded-md">
                Watch →
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
