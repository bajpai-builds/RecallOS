"use client"

import React from "react"

interface RecallOSLogoProps {
  className?: string
  showText?: boolean
  textClassName?: string
  animate?: boolean
}

export function RecallOSLogo({
  className = "w-6 h-6",
  showText = false,
  textClassName = "text-base font-extrabold tracking-tight",
  animate = true,
}: RecallOSLogoProps) {
  return (
    <div className="flex items-center gap-2.5 select-none shrink-0">
      {/* Premium Infinite Memory Loop Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} transition-all duration-500 hover:scale-105`}
      >
        <defs>
          {/* Main Loop Gradient: flowing from Indigo to Violet to Blue-Gray */}
          <linearGradient id="recall-loop-grad" x1="4.5" y1="12" x2="19.5" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4f46e5" /> {/* Deep Indigo */}
            <stop offset="50%" stopColor="#8b5cf6" /> {/* Muted Violet */}
            <stop offset="100%" stopColor="#0ea5e9" /> {/* Soft Blue-Gray */}
          </linearGradient>
          
          {/* Central Glow Filter */}
          <filter id="recall-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Abstract Infinity Loop (Connected Thoughts & Flowing Knowledge) */}
        <path
          d="M12 12C9.5 7.5 4.5 7.5 4.5 12C4.5 16.5 9.5 16.5 12 12C14.5 7.5 19.5 7.5 19.5 12C19.5 16.5 14.5 16.5 12 12Z"
          stroke="url(#recall-loop-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="opacity-95"
        />

        {/* Ambient Outer Halo surrounding the main path */}
        <path
          d="M12 12C9.5 7.5 4.5 7.5 4.5 12C4.5 16.5 9.5 16.5 12 12C14.5 7.5 19.5 7.5 19.5 12C19.5 16.5 14.5 16.5 12 12Z"
          stroke="url(#recall-loop-grad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="opacity-15 blur-[1px]"
        />

        {/* Satellite Connection Node A (Flowing Saved Idea) */}
        <circle 
          cx="7.5" 
          cy="9.8" 
          r="0.8" 
          className="fill-indigo-400 dark:fill-indigo-300 opacity-80" 
        />

        {/* Satellite Connection Node B (Flowing Learning Resource) */}
        <circle 
          cx="16.5" 
          cy="14.2" 
          r="0.8" 
          className="fill-sky-400 dark:fill-sky-300 opacity-80" 
        />

        {/* Inner concentric ring for central node focus */}
        <circle
          cx="12"
          cy="12"
          r="3.5"
          className="stroke-violet-500/30 fill-none"
          strokeWidth="0.8"
        />

        {/* Central Luminous Memory Core Node (Converging Insights) */}
        <circle
          cx="12"
          cy="12"
          r="1.8"
          className={`fill-indigo-500 dark:fill-indigo-400 ${
            animate ? "animate-pulse" : ""
          }`}
          style={{ 
            animationDuration: "2.5s",
            filter: "url(#recall-glow-filter)"
          }}
        />
      </svg>

      {/* Rebranded Wordmark next to Logo */}
      {showText && (
        <span className={`${textClassName} flex items-center select-none font-bold tracking-tight text-foreground`}>
          <span className="text-zinc-900 dark:text-zinc-50 font-extrabold">Recall</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">OS</span>
        </span>
      )}
    </div>
  )
}
