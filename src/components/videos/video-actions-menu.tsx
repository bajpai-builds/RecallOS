"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash2 } from "lucide-react"
import { updateVideoStatus, updateVideoPriority, overrideVideoCategory, deleteVideo } from "@/actions/video"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { formatCategoryName, formatPriority } from "@/lib/ux-formatter"

interface Category {
  id: string
  name: string
  slug: string
}

export function VideoActionsMenu({ 
  videoId, 
  currentStatus, 
  currentPriority,
  currentCategoryId
}: { 
  videoId: string
  currentStatus: string
  currentPriority: string
  currentCategoryId?: string | null
}) {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const controller = new AbortController()

    // Dynamic fetch of all categories for override menu
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories", { signal: controller.signal })
        if (res.ok) {
          const data = await res.json()
          setCategories(data.categories || [])
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error("Failed to load categories for override action:", err)
        }
      }
    }
    loadCategories()

    return () => {
      controller.abort()
    }
  }, [])

  const handleStatusChange = async (status: any) => {
    try {
      setLoading(true)
      await updateVideoStatus(videoId, status)
      toast.success("Status updated successfully")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePriorityChange = async (priority: any) => {
    try {
      setLoading(true)
      await updateVideoPriority(videoId, priority)
      toast.success(`Priority updated to ${formatPriority(priority)}`)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = async (categoryId: string | null) => {
    try {
      setLoading(true)
      await overrideVideoCategory(videoId, categoryId)
      toast.success("Collection overridden successfully")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this video from your library?")) return
    try {
      setLoading(true)
      await deleteVideo(videoId)
      toast.success("Video deleted from companion library")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        render={
          <button disabled={loading} className="text-muted-foreground hover:text-foreground disabled:opacity-50 cursor-pointer p-2 -mr-1 hover:bg-muted/80 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-52 bg-popover border border-border text-popover-foreground backdrop-blur-md rounded-xl p-1 shadow-lg shadow-black/10 dark:shadow-black/40">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-[10px] tracking-widest uppercase font-black px-2 py-1.5">Organize</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-border" />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-lg text-xs font-semibold px-2 py-1.5 focus:bg-accent focus:text-accent-foreground cursor-pointer">
            <span>Status</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-popover border border-border text-popover-foreground rounded-xl p-1 shadow-md">
            <DropdownMenuRadioGroup value={currentStatus === 'UNWATCHED' ? 'SAVED' : currentStatus} onValueChange={handleStatusChange}>
              <DropdownMenuRadioItem value="SAVED" className="text-xs rounded-lg cursor-pointer">📌 Saved for Later</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="STARTED" className="text-xs rounded-lg cursor-pointer">👀 Just Started</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="IN_PROGRESS" className="text-xs rounded-lg cursor-pointer">⏳ Continue Watching</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="COMPLETED" className="text-xs rounded-lg cursor-pointer">✨ Completed</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ARCHIVED" className="text-xs rounded-lg cursor-pointer">📦 Archived</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
 
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-lg text-xs font-semibold px-2 py-1.5 focus:bg-accent focus:text-accent-foreground cursor-pointer">
            <span>Priority</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-popover border border-border text-popover-foreground rounded-xl p-1 shadow-md">
            <DropdownMenuRadioGroup value={currentPriority} onValueChange={handlePriorityChange}>
              <DropdownMenuRadioItem value="LOW" className="text-xs rounded-lg cursor-pointer">📌 Saved For Later</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="MEDIUM" className="text-xs rounded-lg cursor-pointer">✨ Worth Watching</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="HIGH" className="text-xs rounded-lg cursor-pointer">🔥 Watch Soon</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="CRITICAL" className="text-xs rounded-lg cursor-pointer">🚨 Watch Now</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
 
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-lg text-xs font-semibold px-2 py-1.5 focus:bg-accent focus:text-accent-foreground cursor-pointer">
            <span>Move to Collection</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-popover border border-border text-popover-foreground rounded-xl p-1 max-h-[300px] overflow-y-auto shadow-md">
            <DropdownMenuRadioGroup 
              value={currentCategoryId || "uncategorized"} 
              onValueChange={(val) => handleCategoryChange(val === "uncategorized" ? null : val)}
            >
              <DropdownMenuRadioItem value="uncategorized" className="text-xs rounded-lg cursor-pointer">🗂 Needs Organizing</DropdownMenuRadioItem>
              {categories.map((cat) => (
                <DropdownMenuRadioItem key={cat.id} value={cat.id} className="text-xs rounded-lg cursor-pointer">
                  {formatCategoryName(cat.name)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
 
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem onClick={handleDelete} className="text-rose-600 dark:text-rose-400 focus:text-rose-700 dark:focus:text-rose-300 focus:bg-rose-500/10 text-xs font-bold rounded-lg px-2 py-1.5 cursor-pointer">
          <Trash2 className="w-4 h-4 mr-2 text-rose-500" />
          Remove Video
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
