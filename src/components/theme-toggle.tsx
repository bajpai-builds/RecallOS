"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure hydration matches
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full border border-border bg-surface shrink-0" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      id="onboarding-theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-8 h-8 rounded-full bg-surface border border-border text-muted-foreground hover:text-foreground hover:bg-surface-hover hover:border-ring/30 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background shrink-0 shadow-sm"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  )
}
