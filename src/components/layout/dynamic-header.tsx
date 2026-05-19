"use client"

import { usePathname } from "next/navigation"

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/library": "Library",
  "/completed": "Completed",
  "/watch-later": "Watch Later",
}

export function DynamicHeader() {
  const pathname = usePathname()

  let title = routeTitles[pathname]

  if (!title && pathname.startsWith("/category/")) {
    const slug = pathname.split("/category/")[1]
    title = `Collection: ${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`
  }

  return (
    <h1 className="font-semibold tracking-tight text-foreground">
      {title || "RecallOS"}
    </h1>
  )
}
