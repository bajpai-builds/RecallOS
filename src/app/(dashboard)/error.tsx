"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error quietly
    console.error("Dashboard error boundary caught:", error)
  }, [error])

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-4 animate-in fade-in zoom-in-95 duration-500">
      <Card className="glass-card max-w-md w-full border-rose-900/30 overflow-hidden shadow-2xl shadow-rose-950/10">
        <div className="h-1 w-full bg-gradient-to-r from-rose-500/50 to-orange-500/50" />
        <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-100">Something didn&apos;t load right</h2>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              We encountered a slight hiccup while loading this content. Don&apos;t worry, your data is safe.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 text-zinc-900 font-bold text-xs hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md shadow-white/10 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try again
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
