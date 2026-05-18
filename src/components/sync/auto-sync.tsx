"use client"

import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import { RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

export function AutoSync() {
  const [syncState, setSyncState] = useState<{ active: boolean; count: number }>({ active: false, count: 0 })
  const router = useRouter()
  const hasFetchedRef = useRef(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => { isMountedRef.current = false }
  }, [])

  useEffect(() => {
    if (hasFetchedRef.current) return
    hasFetchedRef.current = true
    
    const triggerSync = async () => {
      try {
        setSyncState({ active: true, count: 0 })
        
        let pageToken: string | undefined = undefined
        let totalCount = 0

        while (true) {
          if (!isMountedRef.current) break

          const url: string = pageToken ? `/api/sync?pageToken=${pageToken}` : "/api/sync"
          const res = await fetch(url, { method: "POST" })
          const data = await res.json()

          if (!res.ok) {
            // If the token is missing or invalid, we don't want to spam console errors unless it's a real failure
            if (data.error?.includes("No YouTube access token found")) {
              console.log("[AutoSync] Bypassed automatic sync: No YouTube OAuth credentials linked to this email account.")
            } else if (data.error?.includes("reconnect your account") || data.error?.includes("expired")) {
              toast.error("Your YouTube session expired. Please reconnect your account.")
            } else {
              console.error("AutoSync failed:", data.error)
              if (data.error?.includes("403") || data.error?.includes("insufficient authentication scopes")) {
                toast.error("YouTube API Access Denied. Make sure your account has YouTube scopes granted.")
              }
            }
            break
          } 

          if (data.message && data.message.includes("skipped")) {
            // Skipped due to 1-hour throttle on first page
            break
          }

          if (data.count !== undefined) {
            totalCount += data.count
            if (isMountedRef.current) setSyncState({ active: true, count: totalCount })
          }

          if (!data.nextPageToken) {
            if (totalCount > 0) {
              toast.success(`Synced ${totalCount} new videos from Watch Later!`)
              router.refresh()
            }
            break
          }

          pageToken = data.nextPageToken
        }
      } catch (error) {
        console.error("Failed to ping sync endpoint", error)
      } finally {
        if (isMountedRef.current) setSyncState({ active: false, count: 0 })
      }
    }

    triggerSync()
  }, [router])

  if (!syncState.active) return null

  return (
    <div className="fixed bottom-4 right-4 bg-surface border border-border text-foreground px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2.5 text-xs font-bold z-50 animate-bounce">
      <RefreshCw className="w-4 h-4 animate-spin text-primary" />
      {syncState.count > 0 ? `Imported ${syncState.count} videos...` : `Syncing Watch Later...`}
    </div>
  )
}
