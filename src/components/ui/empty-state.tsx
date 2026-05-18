import React from "react"
import { LucideIcon, Sparkles } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  isActionLoading?: boolean
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  isActionLoading = false,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 lg:p-16 glass-card rounded-3xl border border-border max-w-xl mx-auto my-6 animate-in fade-in zoom-in-95 duration-500 ease-out shadow-2xl shadow-indigo-950/5">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-2xl transform scale-150 animate-pulse" />
        <div className="relative bg-muted border border-border p-4.5 rounded-2xl flex items-center justify-center text-indigo-500 dark:text-indigo-400 shadow-md">
          {Icon ? (
            <Icon className="w-8 h-8 stroke-[1.5]" />
          ) : (
            <Sparkles className="w-8 h-8 stroke-[1.5] text-indigo-400" />
          )}
        </div>
      </div>
      
      <h3 className="text-foreground font-bold text-base md:text-lg tracking-tight mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-sm mb-8 select-none">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          disabled={isActionLoading}
          className="relative inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-550 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {isActionLoading && (
            <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {actionLabel}
        </button>
      )}
    </div>
  )
}
