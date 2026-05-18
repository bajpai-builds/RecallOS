"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useOnboarding } from "./onboarding-context"
import { X, ChevronRight, ChevronLeft, Sparkles, CheckCircle2, Play } from "lucide-react"

interface Step {
  title: string
  content: string
  targetId?: string
  fallbackSelector?: string
}

const steps: Step[] = [
  {
    title: "Welcome to RecallOS ✨",
    content: "Your personal content memory system. Quietly organizing, priority tagging, and resurfacing saved videos worth your focus.\n\nSave less. Remember more.",
  },
  {
    title: "Surfacing What Matters 📊",
    content: "This is your memory dashboard. RecallOS monitors your collections and highlights what is still to watch, high-priority, or completely catch up.",
    targetId: "onboarding-stats-row",
  },
  {
    title: "Intelligent Smart Collections 📂",
    content: "Your saved content is automatically grouped into smart categories (Coding & Tech, Music, Productivity). Manual adjustments let you override folder paths seamlessly.",
    targetId: "onboarding-sidebar-collections",
  },
  {
    title: "Intelligent Reorganization ⚡",
    content: "RecallOS continuously learns and refines your library. Press Smart Organize to let AI analyze metadata signals and sort all items instantly.",
    targetId: "onboarding-smart-organize",
  },
  {
    title: "Memory-Aware Video Cards 🍿",
    content: "Each card tracks watch progress, priority tiers, and category badges. Use inline menus to prioritize, categorize, or manage states in one click.",
    targetId: "onboarding-video-card-0",
  },
  {
    title: "Pick Up Where You Left Off 🍿",
    content: "Began watching but got interrupted? This continuum shelf remembers your exact session, prompting you to mark it complete when finished.",
    targetId: "onboarding-continue-watching",
  },
  {
    title: "Human-Friendly Priorities ⚡",
    content: "Items are organized into active priority tiers (Watch Soon, Worth Watching, Saved For Later). This helps structure what truly deserves attention.",
    targetId: "onboarding-stats-watch-soon",
  },
  {
    title: "Instant Rediscovery 🔍",
    content: "Looking for something you saved months ago? Switch collections, filter by watch states, or sort by priority to retrieve forgotten knowledge instantly.",
    targetId: "onboarding-sidebar-collections", // Highlight sidebar/navigation focus
  },
  {
    title: "Customize Your Atmosphere 🌗",
    content: "Whether you thrive in a calm, dark-mode glassmorphic interface or a high-accessibility light mode, toggle themes instantly to match your flow.",
    targetId: "onboarding-theme-toggle",
  },
  {
    title: "You're all set! 🚀",
    content: "Your saved content library now has memory. Start syncing, exploring, and reclaiming your digital workspace.\n\nEnjoy the focus.",
  },
]

export function OnboardingTour() {
  const { isOpen, currentStep, nextStep, prevStep, skipTour, completeTour, setStep } = useOnboarding()
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [mounted, setMounted] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Track the target element's bounding rect
  useEffect(() => {
    setMounted(true)
    if (!isOpen) return

    const updateRect = () => {
      const activeStep = steps[currentStep]
      if (!activeStep?.targetId) {
        setTargetRect(null)
        return
      }

      const element = document.getElementById(activeStep.targetId)
      if (element) {
        // Element found, query rect
        const rect = element.getBoundingClientRect()
        setTargetRect(rect)
      } else {
        // Fallback: If target element doesn't exist on dashboard (e.g. no videos in list), render centered modal
        setTargetRect(null)
      }
    }

    // Initial update
    updateRect()

    // Add event listeners for resizing and scrolling
    window.addEventListener("resize", updateRect)
    window.addEventListener("scroll", updateRect, true)

    // Mutation observer to capture changes in DOM structure
    const observer = new MutationObserver(updateRect)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("resize", updateRect)
      window.removeEventListener("scroll", updateRect, true)
      observer.disconnect()
    }
  }, [isOpen, currentStep])

  if (!isOpen || !mounted) return null

  const activeStep = steps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  // Dynamic Tooltip positioning calculation
  const getTooltipStyle = () => {
    if (!targetRect) {
      // Centered overlay modal style
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(440px, calc(100vw - 32px))",
      }
    }

    const screenHeight = window.innerHeight
    const screenWidth = window.innerWidth
    const tooltipWidth = 360
    const tooltipHeight = 220

    let top = targetRect.bottom + 16
    let left = targetRect.left + (targetRect.width - tooltipWidth) / 2

    // Check bottom boundary and flip to top if needed
    if (top + tooltipHeight > screenHeight - 20) {
      top = targetRect.top - tooltipHeight - 16
    }

    // Check horizontal boundaries
    if (left < 16) {
      left = 16
    } else if (left + tooltipWidth > screenWidth - 16) {
      left = screenWidth - tooltipWidth - 16
    }

    // Mobile viewport bottom drawer sheet styling
    if (screenWidth < 640) {
      return {
        bottom: "24px",
        left: "16px",
        right: "16px",
        width: "auto",
        maxWidth: "calc(100vw - 32px)",
      }
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      width: `${tooltipWidth}px`,
    }
  }

  const tooltipStyle = getTooltipStyle()

  return (
    <div className="fixed inset-0 z-[9990] overflow-hidden select-none">
      {/* Dynamic SVG Spotlight Cutout Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-500">
        <defs>
          <mask id="recallos-spotlight-mask">
            {/* White represents opaque backdrop cover */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black represents cutout spotlight focus */}
            {targetRect && (
              <rect
                x={targetRect.left - 8}
                y={targetRect.top - 8}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx={16}
                fill="black"
              />
            )}
          </mask>
        </defs>
        {/* Semi-transparent backdrop utilizing the cutout mask */}
        <rect
          width="100%"
          height="100%"
          fill="rgba(9, 9, 11, 0.72)"
          className="backdrop-blur-[1.5px] pointer-events-auto"
          mask="url(#recallos-spotlight-mask)"
          onClick={skipTour} // Clicking backdrop closes/skips tour
        />
      </svg>

      {/* Target Boundary Border Highlight Glow */}
      {targetRect && (
        <div
          className="fixed border-2 border-indigo-500/40 rounded-2xl pointer-events-none transition-all duration-500 shadow-[0_0_35px_rgba(99,102,241,0.22)]"
          style={{
            left: targetRect.left - 8,
            top: targetRect.top - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
        />
      )}

      {/* Animated Card Walkthrough Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.95, y: targetRect ? 5 : 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: targetRect ? 5 : 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed glass-card border border-border/80 p-6 md:p-7 rounded-2xl text-foreground shadow-[0_0_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl bg-surface/75 overflow-hidden flex flex-col justify-between"
          style={tooltipStyle}
        >
          {/* Subtle Ambient Decorative Glowing Gradient inside modal */}
          {!targetRect && (
            <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[70px] pointer-events-none" />
          )}

          {/* Close/Skip Icon */}
          <button
            onClick={skipTour}
            className="absolute top-4 right-4 p-1.5 rounded-lg border border-border/30 bg-muted/40 hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            aria-label="Skip walkthrough"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Steps Title & Details content */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              {!targetRect && currentStep === 0 && (
                <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              {isLastStep && (
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <h3 className="font-extrabold tracking-tight text-foreground text-sm md:text-base leading-none">
                {activeStep.title}
              </h3>
            </div>
            
            <p className="text-muted-foreground text-xs font-semibold leading-relaxed whitespace-pre-line pr-2">
              {activeStep.content}
            </p>
          </div>

          {/* Walkthrough Navigation Footer */}
          <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
            {/* Elegant Step Dots indicator */}
            <div className="flex items-center gap-1.5 select-none">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setStep(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentStep ? "w-4 bg-indigo-500" : "w-1 bg-border/80 hover:bg-border"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* CTA button items */}
            <div className="flex items-center gap-2 shrink-0">
              {!isFirstStep && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border hover:bg-surface-hover text-muted-foreground hover:text-foreground text-[10px] font-black tracking-wide uppercase transition-all cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              )}

              {isLastStep ? (
                <button
                  onClick={completeTour}
                  className="flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black tracking-wide uppercase transition-all cursor-pointer active:scale-95 shadow-md shadow-indigo-600/15"
                >
                  Start Exploring
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-1 px-4 py-2 bg-foreground hover:opacity-90 text-background rounded-xl text-[10px] font-black tracking-wide uppercase transition-all cursor-pointer active:scale-95 shadow-md"
                >
                  {isFirstStep ? "Start Tour" : "Next"}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
