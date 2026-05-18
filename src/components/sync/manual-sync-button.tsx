"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function ManualSyncButton() {
  const [syncState, setSyncState] = useState<{ active: boolean; count: number }>({ active: false, count: 0 })
  const router = useRouter()

  const handleSync = async () => {
    if (syncState.active) return

    try {
      setSyncState({ active: true, count: 0 })
      toast.loading("Syncing YouTube Liked Videos...", { id: "manual-sync" })

      let pageToken: string | undefined = undefined
      let totalCount = 0

      while (true) {
        const url: string = pageToken ? `/api/sync?force=true&pageToken=${pageToken}` : "/api/sync?force=true"
        
        const res = await fetch(url, { 
          method: "POST",
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Failed to complete manual sync.")
        }

        if (data.count !== undefined) {
          totalCount += data.count
          setSyncState({ active: true, count: totalCount })
          if (totalCount > 0) {
            toast.loading(`Imported ${totalCount} videos...`, { id: "manual-sync" })
          }
        }

        if (!data.nextPageToken) {
          if (totalCount > 0) {
            toast.success(`Sync complete! Loaded ${totalCount} new videos! 🍿`, { id: "manual-sync" })
          } else {
            toast.success("Synchronized successfully with YouTube! ✨", { id: "manual-sync" })
          }
          break
        }

        pageToken = data.nextPageToken
      }

      // Refresh the active route to load newly synced items
      router.refresh()
    } catch (err: any) {
      console.error("[Manual Sync Error]:", err)
      toast.error(err.message || "Could not connect to YouTube. Please try again.", { id: "manual-sync" })
    } finally {
      setSyncState({ active: false, count: 0 })
    }
  }

  return (
    <button
      onClick={handleSync}
      disabled={syncState.active}
      className="flex items-center gap-2 px-3.5 py-2 bg-surface/60 backdrop-blur-md border border-border hover:bg-surface-hover text-foreground rounded-xl text-xs font-bold transition-all shadow-md active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0 select-none"
    >
      <RefreshCw className={`w-3.5 h-3.5 text-primary ${syncState.active ? 'animate-spin' : ''}`} />
      <span>{syncState.active ? (syncState.count > 0 ? `Imported ${syncState.count}...` : `Syncing...`) : "Sync YouTube"}</span>
    </button>
  )
}
