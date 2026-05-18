"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { reclassifyAllVideos } from "@/actions/video"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function ReclassifyButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleReclassify = async () => {
    try {
      setLoading(true)
      toast.loading("Organizing your library collections...", { id: "reclassify-toast" })
      
      const res = await reclassifyAllVideos()
      
      toast.success(`Organized ${res.count} videos into beautiful collections! ✨`, { 
        id: "reclassify-toast",
        duration: 4000 
      })
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || "Failed to organize library.", { id: "reclassify-toast" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      id="onboarding-smart-organize"
      onClick={handleReclassify}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-surface border border-border hover:border-indigo-500/30 hover:bg-indigo-500/10 active:scale-95 transition-all text-foreground disabled:opacity-50 hover:text-indigo-600 dark:hover:text-indigo-350 group cursor-pointer shadow-sm"
      title="Smart organize all videos in your library"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
      ) : (
        <Sparkles className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform group-hover:text-indigo-400" />
      )}
      <span>Smart Organize</span>
    </button>
  )
}
