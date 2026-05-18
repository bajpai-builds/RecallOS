"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface OnboardingContextType {
  isOpen: boolean
  currentStep: number
  isCompleted: boolean
  isSkipped: boolean
  startTour: () => void
  skipTour: () => void
  nextStep: () => void
  prevStep: () => void
  completeTour: () => void
  resetTour: () => void
  setStep: (step: number) => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isSkipped, setIsSkipped] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize and check first-time status on mount
  useEffect(() => {
    setMounted(true)
    const completed = localStorage.getItem("recallos-onboarding-completed") === "true"
    const skipped = localStorage.getItem("recallos-onboarding-skipped") === "true"
    
    setIsCompleted(completed)
    setIsSkipped(skipped)

    // Trigger onboarding automatically only for new/first-time users
    if (!completed && !skipped) {
      // Small timeout to allow initial page layout to mount cleanly
      const timer = setTimeout(() => {
        setIsOpen(true)
        setCurrentStep(0)
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const startTour = () => {
    setIsOpen(true)
    setCurrentStep(0)
  }

  const skipTour = () => {
    setIsOpen(false)
    setIsSkipped(true)
    localStorage.setItem("recallos-onboarding-skipped", "true")
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  const setStep = (step: number) => {
    setCurrentStep(step)
  }

  const completeTour = () => {
    setIsOpen(false)
    setIsCompleted(true)
    localStorage.setItem("recallos-onboarding-completed", "true")
    localStorage.removeItem("recallos-onboarding-skipped") // completed overrides skipped
  }

  const resetTour = () => {
    localStorage.removeItem("recallos-onboarding-completed")
    localStorage.removeItem("recallos-onboarding-skipped")
    setIsCompleted(false)
    setIsSkipped(false)
    setCurrentStep(0)
    setIsOpen(true)
  }

  // Keyboard accessibility
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        skipTour()
      } else if (e.key === "ArrowRight") {
        // Only trigger arrow keys if not focusing an input/textarea
        const activeEl = document.activeElement?.tagName
        if (activeEl !== "INPUT" && activeEl !== "TEXTAREA") {
          nextStep()
        }
      } else if (e.key === "ArrowLeft") {
        const activeEl = document.activeElement?.tagName
        if (activeEl !== "INPUT" && activeEl !== "TEXTAREA") {
          prevStep()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentStep])

  return (
    <OnboardingContext.Provider
      value={{
        isOpen,
        currentStep,
        isCompleted,
        isSkipped,
        startTour,
        skipTour,
        nextStep,
        prevStep,
        completeTour,
        resetTour,
        setStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
