"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"

export function VideoCardSkeleton() {
  return (
    <Card className="glass-card rounded-2xl overflow-hidden h-full flex flex-col animate-pulse border border-zinc-900/40 select-none">
      {/* Thumbnail Aspect Grid */}
      <div className="relative aspect-video w-full bg-zinc-900/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
      
      {/* Skeleton Info Elements */}
      <CardContent className="p-5 md:p-6 flex flex-col justify-between flex-1 min-h-[200px] gap-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-4.5 w-16 bg-zinc-850 rounded-full" />
            <div className="h-4.5 w-20 bg-zinc-850 rounded-full" />
          </div>
          
          <div className="space-y-2">
            <div className="h-4 w-full bg-zinc-850 rounded-md" />
            <div className="h-4 w-3/4 bg-zinc-850 rounded-md" />
          </div>
          
          <div className="h-3 w-1/3 bg-zinc-900 rounded-md" />
        </div>
        
        <div className="pt-3.5 border-t border-zinc-900/60 flex justify-between items-center">
          <div className="h-4.5 w-16 bg-zinc-850 rounded-md" />
          <div className="h-3 w-12 bg-zinc-850 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}

export function VideoGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, idx) => (
        <VideoCardSkeleton key={idx} />
      ))}
    </div>
  )
}
