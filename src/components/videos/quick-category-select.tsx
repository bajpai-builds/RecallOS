"use client"

import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { FolderPlus, Loader2 } from "lucide-react"
import { overrideVideoCategory } from "@/actions/video"
import { toast } from "sonner"
import { formatCategoryName } from "@/lib/ux-formatter"

interface Category {
  id: string
  name: string
  slug: string
  color: string
}

export function QuickCategorySelect({
  videoId,
  currentCategoryId,
}: {
  videoId: string
  currentCategoryId?: string | null
}) {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const controller = new AbortController()

    async function loadCategories() {
      try {
        const res = await fetch("/api/categories", { signal: controller.signal })
        if (res.ok) {
          const data = await res.json()
          // Exclude the 'uncategorized' slug itself so they only see categorizable slots!
          const list = (data.categories || []).filter((c: Category) => c.slug !== 'uncategorized')
          setCategories(list)
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error("Failed to load categories for quick selector:", err)
        }
      }
    }
    loadCategories()

    return () => {
      controller.abort()
    }
  }, [])

  const handleCategorySelect = async (categoryId: string) => {
    try {
      setLoading(true)
      toast.loading("Moving video to collection...", { id: `quick-cat-${videoId}` })
      await overrideVideoCategory(videoId, categoryId)
      
      const targetCat = categories.find(c => c.id === categoryId)
      const formattedName = targetCat ? formatCategoryName(targetCat.name) : "new collection"
      
      toast.success(`Video moved to ${formattedName}! 🎉`, { 
        id: `quick-cat-${videoId}`,
        duration: 3000
      })
    } catch (err: any) {
      toast.error(err.message || "Failed to move video.", { id: `quick-cat-${videoId}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button 
            disabled={loading}
            className="outline-none"
            title="Click to organize this video into a collection"
          >
            <Badge 
              variant="outline" 
              className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-700 dark:hover:text-rose-300 cursor-pointer shadow-sm flex items-center gap-1 transition-all active:scale-95 select-none"
            >
              {loading ? (
                <Loader2 className="w-2.5 h-2.5 animate-spin" />
              ) : (
                <FolderPlus className="w-2.5 h-2.5" />
              )}
              🗂 Needs Organizing
            </Badge>
          </button>
        }
      />
      <DropdownMenuContent 
        align="start" 
        className="w-56 bg-popover border border-border text-popover-foreground backdrop-blur-md rounded-xl p-1 shadow-lg shadow-black/10 dark:shadow-black/40 max-h-[280px] overflow-y-auto"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-[10px] tracking-widest uppercase font-black px-2 py-1.5 flex items-center gap-1.5">
            <FolderPlus className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            Select Collection
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-border" />
        
        {categories.length === 0 ? (
          <div className="text-[10px] text-muted-foreground italic p-3 text-center">
            No collections found
          </div>
        ) : (
          categories.map((cat) => (
            <DropdownMenuItem
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="text-xs rounded-lg cursor-pointer flex items-center gap-2.5 px-2 py-1.5 focus:bg-accent focus:text-accent-foreground transition-colors"
            >
              <span className={`inline-block w-2 h-2 rounded-full ${cat.color} ring-1 ring-background`} />
              <span className="font-semibold">{formatCategoryName(cat.name)}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
