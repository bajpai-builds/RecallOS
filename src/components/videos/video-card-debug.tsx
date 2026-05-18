"use client"

import { useState } from "react"
import { ShieldAlert, Terminal, ChevronDown, ChevronUp, BarChart2, HelpCircle } from "lucide-react"
import { useDeveloperMode } from "@/hooks/use-developer-mode"

export function VideoCardDebug({ 
  signalsJson 
}: { 
  signalsJson?: string | null 
}) {
  const [open, setOpen] = useState(false)
  const [devMode] = useDeveloperMode()

  if (!signalsJson) return null

  let data: any = null
  try {
    data = JSON.parse(signalsJson)
  } catch (e) {
    return null
  }

  const bandColors = {
    strong: 'text-violet-500 dark:text-violet-400 bg-violet-500/10 border-violet-500/20',
    medium: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    soft: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
    uncategorized: 'text-muted-foreground bg-muted border-border'
  }

  const band = (data.confidenceBand || 'uncategorized') as keyof typeof bandColors

  // 1. Regular User Mode View (Calm, emotional, friendly description only)
  if (!devMode) {
    // Only show "Why this category?" if there's a friendly explanation present
    if (!data.explanation) return null

    return (
      <div className="mt-3 pt-3 border-t border-border/60">
        <button 
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full text-[10px] tracking-wide font-bold text-muted-foreground hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          <span className="flex items-center gap-1.5 font-sans font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
            Why this category?
          </span>
          {open ? <ChevronUp className="w-3 h-3 text-muted-foreground" /> : <ChevronDown className="w-3 h-3 text-muted-foreground" />}
        </button>

        {open && (
          <div className="mt-2 p-3 rounded-xl bg-muted/50 border border-border text-[11px] font-sans text-muted-foreground leading-relaxed shadow-inner">
            <p className="first-letter:uppercase">{data.explanation}</p>
          </div>
        )}
      </div>
    )
  }

  // 2. High-Fidelity Developer Mode View (Complete multi-label scores and contributors)
  return (
    <div className="mt-3 pt-3 border-t border-border">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-[10px] uppercase tracking-wider font-semibold text-indigo-500 dark:text-indigo-450 hover:text-indigo-650 dark:hover:text-indigo-350 transition-colors"
      >
        <span className="flex items-center gap-1">
          <Terminal className="w-3.5 h-3.5" />
          Engine Classification Logs
        </span>
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {open && (
        <div className="mt-2.5 p-3 rounded-lg bg-popover border border-border text-[11px] font-mono text-popover-foreground space-y-2.5 leading-relaxed overflow-x-auto max-h-[260px] scrollbar-thin shadow-inner">
          <div className="flex justify-between items-center pb-1.5 border-b border-border">
            <span className="text-muted-foreground text-[10px]">Pipeline:</span>
            <span className="text-indigo-550 dark:text-indigo-400 font-semibold text-[10px] truncate max-w-[150px]">{data.stage || 'Multi-Signal Match'}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Confidence Band:</span>
            <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase ${bandColors[band] || bandColors.uncategorized}`}>
              {band}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Raw Engine Score:</span>
            <span className="text-foreground font-bold">
              {data.score !== undefined ? data.score : 'N/A'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Confidence:</span>
            <span className={`font-semibold ${data.confidence >= 0.85 ? 'text-violet-500 dark:text-violet-400 font-bold' : data.confidence >= 0.60 ? 'text-emerald-500 dark:text-emerald-400' : data.confidence >= 0.40 ? 'text-amber-500 dark:text-amber-400' : 'text-rose-500 dark:text-rose-450'}`}>
              {(data.confidence * 100 || 0).toFixed(0)}%
            </span>
          </div>

          {data.channel && (
            <div>
              <span className="text-muted-foreground block mb-0.5">Creator Profile:</span>
              <span className="text-foreground bg-muted px-1.5 py-0.5 rounded border border-border/80 text-[10px]">
                {data.channel}
              </span>
            </div>
          )}

          {data.matchingSignals && data.matchingSignals.length > 0 && (
            <div>
              <span className="text-muted-foreground block mb-1">Score Contribution breakdown:</span>
              <ul className="space-y-1 list-disc list-inside text-muted-foreground pl-1 text-[10px]">
                {data.matchingSignals.map((sig: string, idx: number) => (
                  <li key={idx} className="truncate" title={sig}>{sig}</li>
                ))}
              </ul>
            </div>
          )}

          {data.topCandidates && data.topCandidates.length > 0 && (
            <div className="p-2 rounded bg-muted/60 border border-border">
              <span className="text-muted-foreground font-semibold flex items-center gap-1 mb-1 text-[10px]">
                <BarChart2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                Multi-Label Candidates (Top 3):
              </span>
              <div className="space-y-1 pl-1 text-[10px]">
                {data.topCandidates.map((candidate: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-muted-foreground">
                    <span className={idx === 0 ? "text-indigo-650 dark:text-indigo-300 font-medium" : ""}>
                      {idx + 1}. {candidate.name}
                    </span>
                    <span className="font-mono text-muted-foreground/60">Score: {candidate.score.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.suppressionLogs && data.suppressionLogs.length > 0 && (
            <div className="p-2 rounded bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 text-rose-600 dark:text-rose-300">
              <span className="text-rose-500 dark:text-rose-400 font-semibold flex items-center gap-1 mb-1 text-[10px]">
                <ShieldAlert className="w-3.5 h-3.5" />
                Dominance Suppression:
              </span>
              <ul className="space-y-0.5 list-disc list-inside text-[9px] text-rose-600/90 dark:text-rose-400/90">
                {data.suppressionLogs.map((log: string, idx: number) => (
                  <li key={idx}>{log}</li>
                ))}
              </ul>
            </div>
          )}

          {data.explanation && (
            <div className="text-muted-foreground italic leading-snug text-[10px]">
              {data.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
