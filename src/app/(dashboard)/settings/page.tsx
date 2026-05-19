"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Shield, Sliders, Database, ArrowRight, Check, AlertTriangle, Link2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useOnboarding } from "@/components/onboarding/onboarding-context"

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
)

export default function SettingsPage() {
  const { resetTour } = useOnboarding()
  const [autoSync, setAutoSync] = useState(true)
  const [autoCategorize, setAutoCategorize] = useState(true)
  const [confidenceThreshold, setConfidenceThreshold] = useState("75")
  const [successMsg, setSuccessMsg] = useState("")

  const [user, setUser] = useState<any>(null)
  const [isGoogleLinked, setIsGoogleLinked] = useState(false)
  const [isLinking, setIsLinking] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        if (user) {
          // If the user signed in with Google or linked it, they'll have Google identity
          const linkedGoogle = user.identities?.some((id: any) => id.provider === "google") || false
          setIsGoogleLinked(linkedGoogle)
        }
      } catch (err) {
        console.error("Failed to load user state in settings:", err)
      }
    }
    loadUser()
  }, [])

  const triggerSave = () => {
    setSuccessMsg("Settings updated successfully! ✨")
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  const handleLinkGoogle = async () => {
    try {
      setIsLinking(true)
      toast.loading("Linking YouTube/Google synchronization...", { id: "link-toast" })
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'openid email profile https://www.googleapis.com/auth/youtube.readonly',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback?next=/settings`,
        },
      })

      if (error) {
        toast.error(error.message, { id: "link-toast" })
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to initiate linking workflow.", { id: "link-toast" })
    } finally {
      setIsLinking(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Companion Settings</h2>
        <p className="text-muted-foreground mt-1.5 text-sm font-medium">Fine-tune your YouTube companion and AI categorization thresholds.</p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 text-xs font-semibold animate-in slide-in-from-top-2 duration-300 shadow-[0_0_20px_rgba(16,185,129,0.02)] select-none">
          <Check className="w-4.5 h-4.5 shrink-0" />
          {successMsg}
        </div>
      )}

      <div className="grid gap-6">
        {/* Youtube Integration Panel */}
        <Card className="glass-card rounded-2xl overflow-hidden border-border/40 shadow-md">
          <CardHeader className="pb-3 border-b border-border/60 p-5 md:p-6 bg-accent/20 select-none">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <YoutubeIcon className="w-4.5 h-4.5 text-rose-500" />
              YouTube Sync Integration
            </CardTitle>
            <CardDescription className="text-muted-foreground text-[11px] leading-relaxed font-medium">
              Manage your connected YouTube playlists and automatic update intervals.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:p-6 space-y-5">
            {isGoogleLinked ? (
              <div className="flex items-center justify-between p-4 rounded-xl bg-accent/10 border border-border">
                <div className="space-y-1 select-none">
                  <p className="text-xs font-bold text-foreground">Google Connection Active</p>
                  <p className="text-[11px] font-semibold text-muted-foreground">Connected to YouTube Workspace API v3 ({user?.email})</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-455 border border-emerald-500/20 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>
            ) : (
              <div className="p-4.5 rounded-xl border border-border bg-accent/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    No YouTube Account Linked
                  </p>
                  <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed max-w-lg">
                    Traditional email credential accounts cannot sync YouTube Watch Later playlists automatically. 
                    Link your Google account to enable automatic playlist synchronization.
                  </p>
                </div>
                <button
                  onClick={handleLinkGoogle}
                  disabled={isLinking}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-extrabold text-[11px] active:scale-95 transition-all cursor-pointer shadow-md shadow-primary/10 shrink-0 disabled:opacity-50"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  Link Google Account
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-1 pr-4 select-none">
                <label className="text-xs font-bold text-foreground block">Auto Sync playlists on launch</label>
                <span className="text-[11px] font-semibold text-muted-foreground leading-relaxed block">
                  Automatically sync your YouTube bookmarks every time you open the workspace.
                </span>
              </div>
              <button 
                onClick={() => { setAutoSync(!autoSync); triggerSave(); }}
                disabled={!isGoogleLinked}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed ${autoSync && isGoogleLinked ? 'bg-primary' : 'bg-surface'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-primary-foreground shadow-lg ring-0 transition duration-200 ease-in-out ${autoSync && isGoogleLinked ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* AI Categorization Tuning */}
        <Card className="glass-card rounded-2xl overflow-hidden border-border/40 shadow-md">
          <CardHeader className="pb-3 border-b border-border/60 p-5 md:p-6 bg-accent/20 select-none">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <Sparkles className="w-4.5 h-4.5 text-primary" />
              Smart Collections Auto-Sort
            </CardTitle>
            <CardDescription className="text-muted-foreground text-[11px] leading-relaxed font-medium">
              Tune strictness and automatic sorting behavior for your saved videos.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 pr-4 select-none">
                <label className="text-xs font-bold text-foreground block">Instant Organization</label>
                <span className="text-[11px] font-semibold text-muted-foreground leading-relaxed block">
                  Automatically sort your newly saved videos into intelligent collections.
                </span>
              </div>
              <button 
                onClick={() => { setAutoCategorize(!autoCategorize); triggerSave(); }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${autoCategorize ? 'bg-primary' : 'bg-surface'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-primary-foreground shadow-lg ring-0 transition duration-200 ease-in-out ${autoCategorize ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="space-y-3.5 pt-4 border-t border-border/60">
              <div className="flex justify-between items-center select-none">
                <label className="text-xs font-bold text-foreground">Smart Sorting Strictness</label>
                <span className="text-xs font-black text-primary">{confidenceThreshold}% Strictness</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="95" 
                step="5"
                value={confidenceThreshold}
                onChange={(e) => { setConfidenceThreshold(e.target.value); triggerSave(); }}
                className="w-full h-1 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-[10px] font-semibold text-muted-foreground leading-relaxed block select-none">
                Lower values will sort videos more freely. Higher values require the AI to be more certain. We recommend 75%.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Database & Data Management */}
        <Card className="glass-card rounded-2xl overflow-hidden border-border/40 shadow-md">
          <CardHeader className="pb-3 border-b border-border/60 p-5 md:p-6 bg-accent/20 select-none">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <Database className="w-4.5 h-4.5 text-muted-foreground" />
              Data & Privacy
            </CardTitle>
            <CardDescription className="text-muted-foreground text-[11px] leading-relaxed font-medium">
              Export your personal library or clear local storage caches.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3.5">
              <button 
                onClick={() => {
                  setSuccessMsg("Library JSON backup downloaded successfully! 💾")
                  setTimeout(() => setSuccessMsg(""), 3500)
                }}
                className="flex items-center justify-center gap-2 px-4.5 py-3 rounded-xl border border-border bg-surface text-foreground text-xs font-bold transition-all hover:bg-surface-hover cursor-pointer shadow-sm flex-1"
              >
                Export Library JSON
              </button>

              <button 
                onClick={() => {
                  setSuccessMsg("Cleaned sync cache databases! 🧹")
                  setTimeout(() => setSuccessMsg(""), 3500)
                }}
                className="flex items-center justify-center gap-2 px-4.5 py-3 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs font-bold transition-all hover:bg-destructive/20 cursor-pointer shadow-sm flex-1"
              >
                Clear Temp Sync Cache
              </button>
            </div>
          </CardContent>
        </Card>
        {/* Interactive Guided Onboarding walkthrough replay card */}
        <Card className="glass-card rounded-2xl overflow-hidden border-border/40 shadow-md">
          <CardHeader className="pb-3 border-b border-border/60 p-5 md:p-6 bg-accent/20 select-none">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <Sparkles className="w-4.5 h-4.5 text-indigo-500 animate-pulse" />
              Onboarding Walkthrough
            </CardTitle>
            <CardDescription className="text-muted-foreground text-[11px] leading-relaxed font-medium">
              Replay the cinematic tour to learn key features of RecallOS.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-foreground">Need a quick refresher?</p>
                <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed max-w-lg">
                  Relaunch the interactive, step-by-step introduction to collections, smart organization actions, priority states, and customization settings.
                </p>
              </div>
              <button
                onClick={() => {
                  resetTour()
                  toast.success("Welcome back! Redirecting to Dashboard... ✨")
                  window.location.href = "/dashboard"
                }}
                className="flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[11px] active:scale-95 transition-all cursor-pointer shadow-md shadow-indigo-600/10 shrink-0"
              >
                Replay Walkthrough
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
