import { getAuthenticatedUser, getCategoryBySlug, getUserVideos } from "@/lib/queries"
import { VideoCard } from "@/components/videos/video-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Folder, ArrowUpDown, Filter, Sparkles } from "lucide-react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { normalizeCategorySlug } from "@/lib/normalize"
import { formatCategoryName, formatPriority } from "@/lib/ux-formatter"

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ 
  status?: string 
  priority?: string 
  sortBy?: string 
}>

const CATEGORY_META: Record<string, { desc: string; signals: string }> = {
  'ai-tech': {
    desc: 'Artificial Intelligence, machine learning models, LLMs, neural networks, and groundbreaking updates.',
    signals: 'Features neural networks, LLM insights, AI research, and smart product updates.'
  },
  'engineering': {
    desc: 'Production-grade software development tutorials, fullstack frameworks, coding exercises, and architectures.',
    signals: 'Features computer science deep dives, framework tutorials, and codebase engineering principles.'
  },
  'business': {
    desc: 'Startup strategies, VC insights, SaaS guides, monetization techniques, and founder conversations.',
    signals: 'Features startup guides, entrepreneurship diaries, VC breakdowns, and SaaS case studies.'
  },
  'finance': {
    desc: 'Macroeconomics, market portfolios, digital currencies, personal wealth, and investing guides.',
    signals: 'Features personal wealth management guides, stock market updates, and macroeconomics.'
  },
  'productivity': {
    desc: 'Deep work frameworks, time habits, digital organization, second-brain strategies, and digital routines.',
    signals: 'Features deep work tips, digital journaling templates, and life organization habits.'
  },
  'marketing': {
    desc: 'Search optimization, marketing guidelines, target audiences, paid ads, and brand voice frameworks.',
    signals: 'Features marketing case studies, conversion funnels, and copywriting masterclasses.'
  },
  'design': {
    desc: 'UI/UX designs, Figma systems, visual hierarchies, page typography, and elegant animation spells.',
    signals: 'Features user interface guidelines, interactive animations, and creative layouts.'
  },
  'education': {
    desc: 'Scholastic videos explaining physics, mathematics, chemistry, history, and human philosophy.',
    signals: 'Features scientific lectures, school chemistry setups, and logic explainers.'
  },
  'knowledge': {
    desc: 'Analytical essays, visual documentaries, book summaries, mindset updates, and deep histories.',
    signals: 'Features book summaries, investigative deep dives, and general mindset shifts.'
  },
  'podcasts': {
    desc: 'Uncut dialogues, long interviews, fireside panel discussions, and educational talk shows.',
    signals: 'Features complete podcast episodes, long founder interviews, and roundtables.'
  },
  'news': {
    desc: 'Current political journalism, world updates, daily news analysis, and briefings.',
    signals: 'Features world affairs reports, political analysis, and daily events.'
  },
  'fitness': {
    desc: 'Gym exercises, cardio workouts, longevity diets, and muscle growth strategies.',
    signals: 'Features workout logs, dietary routines, and health longevity guides.'
  },
  'lifestyle': {
    desc: 'Calm minimalism guides, travel plans, day-in-the-life routines, and morning schedules.',
    signals: 'Features minimalist daily journals, travel logs, and kitchen routines.'
  },
  'travel': {
    desc: 'Global destination guidelines, backpacking trips, hotel audits, and travel guides.',
    signals: 'Features travel vlogs, road trip itineraries, and explore logs.'
  },
  'gaming': {
    desc: 'Gaming walkthroughs, highlights, matches, and retro reviews.',
    signals: 'Features gaming clips, tournament updates, and gameplay walkthroughs.'
  },
  'music': {
    desc: 'Background lofi beats, ambient soundscapes, acoustic covers, and peaceful sound lists.',
    signals: 'Features instrumental backing tracks, lofi tracks, and calm soundscapes.'
  },
  'entertainment': {
    desc: 'Comedy skits, humorous highlights, reaction lists, challenges, and fun clips.',
    signals: 'Features funny challenges, short comedic plays, and light entertainment.'
  },
  'uncategorized': {
    desc: 'Videos waiting for your sorting or dynamic organization.',
    signals: 'Saved here when the companion library requires your final touch.'
  }
}


export default async function CategoryPage({ 
  params, 
  searchParams 
}: { 
  params: Params
  searchParams: SearchParams 
}) {
  const { slug } = await params
  const { status, priority, sortBy } = await searchParams
  const user = await getAuthenticatedUser()

  const normalizedSlug = normalizeCategorySlug(slug)
  const category = await getCategoryBySlug(user.id, normalizedSlug)

  if (!category) {
    console.log(`[Category Route Error] Category not found in database for slug: "${slug}" (normalized: "${normalizedSlug}")`)
    notFound()
  }

  // Fetch all videos matching category
  let videos = await getUserVideos(user.id, { 
    categorySlug: normalizedSlug,
    status: status || undefined,
    priority: priority || undefined
  })

  // Apply sorting
  if (sortBy === 'oldest') {
    videos = [...videos].reverse()
  } else if (sortBy === 'priority') {
    const priorityWeight = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }
    videos = [...videos].sort((a, b) => {
      const wA = priorityWeight[a.priority as keyof typeof priorityWeight] || 0
      const wB = priorityWeight[b.priority as keyof typeof priorityWeight] || 0
      return wB - wA
    })
  }

  const meta = CATEGORY_META[normalizedSlug] || {
    desc: 'A dynamically configured category grouping your synced content library.',
    signals: 'Analyzed and organized using metadata weightings and confidence thresholds.'
  }

  // Determine Custom Visual Mood gradients per Category
  let moodBannerClass = "glass-card"
  if (normalizedSlug === 'ai-tech') {
    moodBannerClass = "border border-blue-500/15 dark:bg-gradient-to-r dark:from-blue-950/20 dark:via-zinc-900/30 dark:to-zinc-900/20 bg-gradient-to-r from-blue-50/40 via-blue-100/20 to-surface shadow-[0_0_40px_rgba(59,130,246,0.03)]"
  } else if (normalizedSlug === 'engineering') {
    moodBannerClass = "border border-emerald-500/15 dark:bg-gradient-to-r dark:from-emerald-950/20 dark:via-zinc-900/30 dark:to-zinc-900/20 bg-gradient-to-r from-emerald-50/40 via-emerald-100/20 to-surface shadow-[0_0_40px_rgba(16,185,129,0.03)]"
  } else if (normalizedSlug === 'music') {
    moodBannerClass = "border border-purple-500/15 dark:bg-gradient-to-r dark:from-purple-950/20 dark:via-zinc-900/30 dark:to-zinc-900/20 bg-gradient-to-r from-purple-50/40 via-purple-100/20 to-surface shadow-[0_0_40px_rgba(139,92,246,0.03)]"
  } else if (normalizedSlug === 'travel') {
    moodBannerClass = "border border-amber-500/15 dark:bg-gradient-to-r dark:from-amber-950/20 dark:via-zinc-900/30 dark:to-zinc-900/20 bg-gradient-to-r from-amber-50/40 via-amber-100/20 to-surface shadow-[0_0_40px_rgba(245,158,11,0.03)]"
  } else if (normalizedSlug === 'productivity') {
    moodBannerClass = "border border-indigo-500/15 dark:bg-gradient-to-r dark:from-indigo-950/20 dark:via-zinc-900/30 dark:to-zinc-900/20 bg-gradient-to-r from-indigo-50/40 via-indigo-100/20 to-surface shadow-[0_0_40px_rgba(99,102,241,0.03)]"
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Category Hero Banner */}
      <div className={`relative rounded-2xl overflow-hidden p-6 md:p-8 shadow-sm ${moodBannerClass}`}>
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none">
          <Folder className="w-48 h-48 text-foreground" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3 select-none">
              <span className={`inline-block w-3.5 h-3.5 rounded-full ${category.color} ring-2 ring-background`} />
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">{formatCategoryName(category.name)}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-semibold">
              {meta.desc}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1 shrink-0 bg-muted/40 border border-border/80 px-4.5 py-3 rounded-xl select-none">
            <div className="text-2xl font-black text-indigo-500 dark:text-indigo-400 leading-none">
              {category._count.videos}
            </div>
            <div className="text-[9px] text-muted-foreground/80 uppercase tracking-widest font-black mt-1">
              Total Videos
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Friendly Info Box */}
      <div className="flex items-start gap-3.5 p-4.5 rounded-2xl border border-border bg-surface text-muted-foreground text-xs leading-relaxed max-w-4xl shadow-sm">
        <div className="p-1 rounded-lg bg-muted border border-border text-indigo-500 dark:text-indigo-400 shrink-0 shadow-inner">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
        <div className="space-y-1">
          <span className="font-bold text-foreground flex items-center gap-1.5 text-xs select-none">
            Smart Collection
          </span>
          <p className="font-semibold text-muted-foreground leading-relaxed">
            {meta.signals} If a video is in the wrong place, you can move it using the menu. Manual moves will lock it into its new collection.
          </p>
        </div>
      </div>

      {/* Controls: Filter & Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-border/60">
        <div className="flex items-center gap-2 flex-wrap text-xs font-bold select-none">
          <Filter className="w-4 h-4 text-muted-foreground/80 mr-1" />
          <Link 
            href={`/category/${slug}`}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer border ${!status && !priority ? 'bg-foreground border-foreground text-background' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            All
          </Link>
          <Link 
            href={`/category/${slug}?status=UNWATCHED`}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer border ${status === 'UNWATCHED' ? 'bg-foreground border-foreground text-background' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            👀 Still To Watch
          </Link>
          <Link 
            href={`/category/${slug}?status=COMPLETED`}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer border ${status === 'COMPLETED' ? 'bg-foreground border-foreground text-background' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            ✅ Finished Watching
          </Link>
          <Link 
            href={`/category/${slug}?priority=HIGH`}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer border ${priority === 'HIGH' || priority === 'CRITICAL' ? 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400' : 'border-transparent text-muted-foreground hover:text-rose-550 dark:hover:text-rose-400'}`}
          >
            🔥 Watch Soon
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold justify-end select-none">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground/80" />
          <span className="text-muted-foreground mr-1">Sort:</span>
          <Link 
            href={`/category/${slug}?sortBy=newest${status ? `&status=${status}` : ''}${priority ? `&priority=${priority}` : ''}`}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${!sortBy || sortBy === 'newest' ? 'text-indigo-650 dark:text-indigo-400 font-bold bg-indigo-500/10' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Newest
          </Link>
          <span className="text-border">|</span>
          <Link 
            href={`/category/${slug}?sortBy=priority${status ? `&status=${status}` : ''}${priority ? `&priority=${priority}` : ''}`}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${sortBy === 'priority' ? 'text-indigo-650 dark:text-indigo-400 font-bold bg-indigo-500/10' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Priority
          </Link>
        </div>
      </div>

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <EmptyState
          icon={Folder}
          title="No videos in this collection ✨"
          description="Try adjusting your filters above or saving new videos to see them appear here."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}


