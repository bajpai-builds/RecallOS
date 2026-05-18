"use client"

import { useState, useEffect } from "react"

const DEV_MODE_KEY = "content-os-dev-mode"

export function useDeveloperMode() {
  const [devMode, setDevModeState] = useState<boolean>(false)

  useEffect(() => {
    // Read from localStorage on mount
    const stored = localStorage.getItem(DEV_MODE_KEY)
    if (stored === "true") {
      setDevModeState(true)
    }

    // Listener for changes in other components
    const handleStorageChange = () => {
      const current = localStorage.getItem(DEV_MODE_KEY) === "true"
      setDevModeState(current)
    }

    window.addEventListener("content-os-dev-mode-change", handleStorageChange)
    return () => {
      window.removeEventListener("content-os-dev-mode-change", handleStorageChange)
    }
  }, [])

  const setDevMode = (val: boolean) => {
    localStorage.setItem(DEV_MODE_KEY, String(val))
    setDevModeState(val)
    // Dispatch custom event to notify all other mounting components instantly
    window.dispatchEvent(new Event("content-os-dev-mode-change"))
  }

  return [devMode, setDevMode] as const
}
