import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { RecallOSLogo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Zap, 
  Target, 
  Shield, 
  Lock,
  Trash2, 
  History, 
  Smartphone, 
  Mail, 
  BookOpen, 
  Infinity 
} from "lucide-react"

const Github = (props: React.ComponentPropsWithoutRef<"svg">) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)



export const metadata = {
  title: "RecallOS - Remember what matters.",
  description: "Intelligently organize, resurface, and rediscover your saved YouTube Watch Later playlists before they are forgotten.",
}

export default async function LandingPage() {
  // Server-side authentication check. If authenticated, seamlessly redirect to dashboard workspace
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect("/dashboard")
  }

  const features = [
    {
      icon: Sparkles,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
      title: "Smart Categorization",
      description: "Auto-groups content into structured learning paths (Tech, Design, Science) using semantic classifications.",
    },
    {
      icon: History,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
      title: "Continue Watching",
      description: "Resumes playback precisely where you left off. Every active resource is tracked automatically.",
    },
    {
      icon: Zap,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      title: "Smart Resurfacing",
      description: "Gently surfaces aging high-priority items so they don't drown in endless bookmark backlogs.",
    },
    {
      icon: Target,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      title: "Watch Memory",
      description: "Logs completed videos into a searchable, categorized database of your personal knowledge.",
    },
    {
      icon: Shield,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      title: "Strict Privacy",
      description: "Your data is entirely yours. We do not sell your personal details or share synced YouTube watch history.",
    },
    {
      icon: Smartphone,
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
      title: "Mobile Friendly",
      description: "Fully responsive layouts. Catalog, tag, and read summaries on your phone, tablet, or laptop.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Sleek Digital Ambient Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-16 px-6 md:px-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-95 transition-opacity">
            <RecallOSLogo showText className="w-6 h-6" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-muted-foreground select-none">
            <Link href="#problem" className="hover:text-foreground transition-colors">The Problem</Link>
            <Link href="#solution" className="hover:text-foreground transition-colors">Our Solution</Link>
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors px-3.5 py-2 rounded-xl hover:bg-surface border border-border/30 hover:border-border"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-extrabold text-xs active:scale-[0.98] transition-all shadow-md shadow-primary/10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24 flex flex-col items-center text-center">
          {/* Top Pill Accent */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-6 select-none animate-fade-in">
            <Sparkles className="w-3 h-3" />
            Introducing RecallOS 1.0
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl text-foreground bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Your Watch Later <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">finally has memory.</span>
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
            RecallOS intelligently organizes, resurfaces, and helps you rediscover saved YouTube content before it gets forgotten forever.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/signup"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-black text-sm shadow-lg shadow-primary/20 active:scale-[0.98] transition-all group"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="#problem"
              className="flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-xl bg-surface border border-border text-foreground hover:bg-surface-hover font-bold text-sm transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Premium UI Mockup Showcase */}
          <div className="mt-16 w-full max-w-5xl rounded-2xl border border-border/60 bg-card p-2 md:p-3 shadow-[0_0_50px_rgba(99,102,241,0.08)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] select-none">
            <div className="rounded-xl border border-border/40 overflow-hidden bg-background">
              {/* Browser Header dots */}
              <div className="h-10 bg-accent/20 border-b border-border/40 flex items-center px-4 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="w-48 h-5 rounded bg-surface border border-border/50 text-[9px] text-muted-foreground flex items-center justify-center font-medium">
                  recallos.app/dashboard
                </div>
                <div className="w-6" />
              </div>
              
              {/* Mock Dashboard Layout */}
              <div className="flex min-h-[380px] bg-background text-left">
                {/* Mock Sidebar */}
                <div className="w-1/4 border-r border-border/40 p-4 space-y-4 hidden sm:block bg-accent/5">
                  <div className="flex items-center gap-2 pb-2 border-b border-border/30">
                    <RecallOSLogo className="w-4.5 h-4.5" animate={false} />
                    <span className="text-[10px] font-extrabold tracking-tight">RecallOS</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-6 rounded-md bg-indigo-500/10 border border-indigo-500/10 flex items-center px-2 gap-2 text-[9px] font-bold text-indigo-600 dark:text-indigo-400">
                      <Sparkles className="w-3.5 h-3.5" /> Dashboard
                    </div>
                    <div className="h-6 rounded-md hover:bg-surface flex items-center px-2 gap-2 text-[9px] font-bold text-muted-foreground">
                      <BookOpen className="w-3.5 h-3.5" /> Library
                    </div>
                    <div className="h-6 rounded-md hover:bg-surface flex items-center px-2 gap-2 text-[9px] font-bold text-muted-foreground">
                      <Target className="w-3.5 h-3.5" /> Completed
                    </div>
                  </div>
                </div>

                {/* Mock Main Content Area */}
                <div className="flex-1 p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="h-4 w-28 bg-foreground/10 rounded" />
                      <div className="h-3 w-48 bg-muted-foreground/10 rounded" />
                    </div>
                    <div className="h-8 w-24 bg-primary/10 border border-primary/20 rounded-xl" />
                  </div>

                  {/* Mock Stats Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-border/40 bg-accent/5 rounded-xl p-3.5 space-y-2">
                      <div className="h-2.5 w-16 bg-muted-foreground/10 rounded" />
                      <div className="h-6 w-8 bg-foreground/20 rounded" />
                    </div>
                    <div className="border border-border/40 bg-accent/5 rounded-xl p-3.5 space-y-2">
                      <div className="h-2.5 w-16 bg-muted-foreground/10 rounded" />
                      <div className="h-6 w-8 bg-amber-500/20 rounded" />
                    </div>
                    <div className="border border-border/40 bg-accent/5 rounded-xl p-3.5 space-y-2">
                      <div className="h-2.5 w-16 bg-muted-foreground/10 rounded" />
                      <div className="h-6 w-8 bg-emerald-500/20 rounded" />
                    </div>
                  </div>

                  {/* Mock Video Items */}
                  <div className="space-y-3.5">
                    <div className="h-3.5 w-24 bg-muted-foreground/20 rounded" />
                    <div className="border border-border/40 rounded-xl p-3 flex items-center justify-between bg-card">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-8 bg-indigo-500/10 rounded border border-indigo-500/10 flex items-center justify-center text-[10px] font-bold text-indigo-500">▶</div>
                        <div className="space-y-1.5">
                          <div className="h-3 w-32 bg-foreground/15 rounded" />
                          <div className="h-2 w-16 bg-muted-foreground/10 rounded" />
                        </div>
                      </div>
                      <div className="h-5 w-12 bg-surface border border-border rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section id="problem" className="border-t border-border/30 bg-accent/[0.01]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500">
                <Trash2 className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                The Endless Cycle of Digital Clutter
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-medium">
                <p>
                  We catalog bookmarks, save tutorials, and add guides to our &quot;Watch Later&quot; playlist with every intention of learning from them.
                </p>
                <p>
                  But YouTube algorithms are built to distract, dragging us to the next viral video. Over time, that learning playlist turns into a digital graveyard where great insights are forgotten forever.
                </p>
              </div>
            </div>

            <div className="border border-border/40 bg-card rounded-2xl p-6 md:p-8 space-y-6 shadow-sm select-none">
              <div className="space-y-2 border-b border-border/40 pb-4">
                <div className="text-[10px] font-black uppercase tracking-wider text-rose-500">Typical Watch Later List</div>
                <div className="text-sm font-extrabold text-foreground">Endless backlog of unwatched lessons</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface/50 border border-border/30 opacity-70">
                  <span className="text-[11px] font-bold text-muted-foreground">❌ Advanced Rust Concurrency Models</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">Added 2 years ago</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface/50 border border-border/30 opacity-60">
                  <span className="text-[11px] font-bold text-muted-foreground">❌ Next.js 16 Architectural Deep Dive</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">Added 1 year ago</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface/50 border border-border/30 opacity-40">
                  <span className="text-[11px] font-bold text-muted-foreground">❌ Clean Code Architectural Principles</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">Added 6 months ago</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION */}
        <section id="solution" className="border-t border-border/30 bg-accent/[0.02]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 flex flex-col items-center text-center">
            <div className="inline-flex p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 mb-6">
              <Infinity className="w-5 h-5 stroke-[1.8]" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground max-w-xl">
              Meet RecallOS. <br />
              <span className="text-muted-foreground">A clean memory space for your mind.</span>
            </h2>
            
            <p className="mt-4 text-sm text-muted-foreground max-w-2xl leading-relaxed font-medium">
              We sync directly with your YouTube account to extract, structure, and categorize your watch playlists into a beautiful workspace. Zero recommendations, zero distractions.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-12 text-left select-none">
              <div className="border border-border/40 bg-card rounded-2xl p-5 space-y-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <h3 className="text-xs font-bold text-foreground">Smart Organization</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  No more messy folders. AI groups incoming videos automatically based on content semantics.
                </p>
              </div>
              <div className="border border-border/40 bg-card rounded-2xl p-5 space-y-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <h3 className="text-xs font-bold text-foreground">Personal Resurfacing</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Older high-priority bookmarks are gently brought back to your dashboard so they aren&apos;t lost.
                </p>
              </div>
              <div className="border border-border/40 bg-card rounded-2xl p-5 space-y-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <h3 className="text-xs font-bold text-foreground">Continue Watching</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Resume active lectures immediately. Keep tracking watch state details in real-time.
                </p>
              </div>
              <div className="border border-border/40 bg-card rounded-2xl p-5 space-y-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <h3 className="text-xs font-bold text-foreground">Watch Memory</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Archive completed items into a cataloged database, building a permanent log of your learnings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="border-t border-border/30 bg-accent/[0.01]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                Engineered for Learning
              </h2>
              <p className="text-sm text-muted-foreground font-medium max-w-xl mx-auto">
                Discover the workspace features built specifically to combat catalog fatigue and digital amnesia.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon
                return (
                  <div
                    key={idx}
                    className="group border border-border/40 hover:border-border/80 bg-card p-6 rounded-2xl shadow-sm hover:shadow transition-all duration-300 space-y-4"
                  >
                    <div className={`inline-flex p-2.5 rounded-xl border ${feat.color}`}>
                      <Icon className="w-4.5 h-4.5 stroke-[1.8]" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ABOUT RECALLOS SECTION */}
        <section id="about" className="border-t border-border/30 bg-accent/[0.02]">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-24 space-y-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-500 border border-indigo-500/15 select-none">
              Platform Intent
            </div>
            
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
              About RecallOS
            </h2>
            
            <p className="text-sm text-muted-foreground leading-relaxed font-medium text-left md:text-center">
              RecallOS is designed to help people remember valuable content they once wanted to watch, learn from, or revisit. Reviewers and users can link their YouTube library through a secure Google OAuth process. We extract your watch playlists in the background, sort items cleanly, and present them in a distractor-free companion dashboard so you can actually study the materials you saved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black text-muted-foreground pt-4 select-none">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-500" />
                Verified Google OAuth Integration
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-sky-500" />
                Secure Supabase Session Control
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-10 select-none bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <RecallOSLogo className="w-4.5 h-4.5" animate={false} />
            <span className="text-[11px] font-black tracking-tight text-foreground">
              RecallOS
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <a 
              href="https://github.com/bajpai-builds/RecallOS" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-foreground flex items-center gap-1 hover:underline underline-offset-4"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a 
              href="mailto:support@recallos.app" 
              className="hover:text-foreground flex items-center gap-1 hover:underline underline-offset-4"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact Support
            </a>
          </div>

          <p className="text-xs text-muted-foreground/60 font-semibold text-center md:text-right">
            © {new Date().getFullYear()} RecallOS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
