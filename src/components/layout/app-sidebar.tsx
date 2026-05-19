"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Sparkles, PlaySquare, Clock, Settings, LogOut, CheckCircle, Code } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { RecallOSLogo } from "@/components/ui/logo"
import { useEffect, useState } from "react"
import { useDeveloperMode } from "@/hooks/use-developer-mode"
import { formatCategoryName } from "@/lib/ux-formatter"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Sparkles,
  },
  {
    title: "Library",
    url: "/library",
    icon: PlaySquare,
  },
  {
    title: "Completed",
    url: "/completed",
    icon: CheckCircle,
  },
  {
    title: "Watch Later",
    url: "/watch-later",
    icon: Clock,
  },
]

type CategoryItem = {
  id: string
  name: string
  slug: string
  color: string
  _count: { videos: number }
}

import { toast } from "sonner"


export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [devMode, setDevMode] = useDeveloperMode()

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories', { signal: controller.signal })
        if (res.ok) {
          const data = await res.json()
          setCategories(data.categories || [])
        }
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          console.error("Failed to load categories:", e)
        }
      }
    }
    fetchCategories()

    return () => {
      controller.abort()
    }
  }, [pathname]) // Refetch when navigating to catch new categories after sync

  const handleLogout = async () => {
    try {
      toast.loading("Purging session memory...", { id: "logout-toast" })
      await supabase.auth.signOut()
      toast.success("Logged out successfully! ✨", { id: "logout-toast" })
      router.push('/login')
      router.refresh()
    } catch (e) {
      router.push('/login')
    }
  }

  return (
    <Sidebar variant="inset" className="border-r border-border bg-surface/70 backdrop-blur-xl transition-all duration-300">
      <SidebarHeader className="flex items-center p-5 border-b border-border/60">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-foreground hover:opacity-80 transition-all group w-full">
          <div className="bg-background border border-border p-2 rounded-xl group-hover:scale-105 transition-all shadow-sm group-hover:border-primary/30">
            <RecallOSLogo className="w-5 h-5" animate={true} />
          </div>
          <span className="tracking-tight text-sm uppercase font-extrabold bg-gradient-to-r from-foreground via-primary to-primary/80 bg-clip-text text-transparent">RecallOS</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup className="py-4">
          <SidebarGroupLabel className="text-muted-foreground text-[10px] uppercase tracking-widest font-extrabold px-3 select-none">Main Companion</SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer relative group/item overflow-hidden ${
                        isActive 
                          ? 'bg-accent/80 border border-border/80 text-primary font-bold glow-accent shadow-sm' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover border border-transparent'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 transition-transform icon-wiggle ${isActive ? 'text-primary scale-105' : 'text-muted-foreground group-hover/item:text-foreground'}`} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {categories.length > 0 && (
          <SidebarGroup id="onboarding-sidebar-collections" className="py-2 border-t border-border/50">
            <SidebarGroupLabel className="text-muted-foreground text-[10px] uppercase tracking-widest font-extrabold px-3 select-none">Collections</SidebarGroupLabel>
            <SidebarGroupContent className="mt-2">
              <SidebarMenu className="space-y-1">
                {categories.map((cat) => {
                  const isActive = pathname === `/category/${cat.slug}`
                  return (
                    <SidebarMenuItem key={cat.id} className="pl-1.5">
                      <SidebarMenuButton 
                        render={<Link href={`/category/${cat.slug}`} />}
                        isActive={isActive}
                        className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer relative group/item overflow-hidden ${
                          isActive 
                            ? 'bg-accent/80 border border-border/80 text-primary font-bold glow-accent shadow-sm' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover border border-transparent'
                        }`}
                      >
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${cat.color} ring-2 ring-background shrink-0 transition-transform group-hover/item:scale-110`} />
                        <span className="flex-1 truncate">{formatCategoryName(cat.name)}</span>
                        <span className="text-[9px] text-muted-foreground font-extrabold bg-background/50 px-1.5 py-0.5 rounded border border-border/40 tabular-nums">{cat._count.videos}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 p-4 space-y-3">
        {/* Modern developer mode toggle switch */}
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-background/50 border border-border/50 text-[11px] font-semibold text-muted-foreground select-none">
          <span className="flex items-center gap-2">
            <Code className="w-3.5 h-3.5 text-primary" />
            Developer Mode
          </span>
          <button
            onClick={() => setDevMode(!devMode)}
            className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              devMode ? 'bg-primary' : 'bg-surface'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                devMode ? 'translate-x-4' : 'translate-x-0.5'
              } mt-0.5`}
            />
          </button>
        </div>

        <SidebarMenu className="space-y-0.5">
          <SidebarMenuItem>
            <SidebarMenuButton 
              render={<Link href="/settings" />}
              isActive={pathname === "/settings"}
              className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer relative group/item overflow-hidden ${
                pathname === "/settings"
                  ? 'bg-accent/80 border border-border/80 text-primary font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover border border-transparent'
              }`}
            >
              <Settings className={`w-3.5 h-3.5 transition-transform icon-wiggle ${pathname === "/settings" ? 'text-primary scale-105' : 'text-muted-foreground group-hover/item:text-foreground'}`} />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive transition-all cursor-pointer group/logout">
              <LogOut className="w-3.5 h-3.5 text-muted-foreground group-hover/logout:text-destructive transition-colors" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
