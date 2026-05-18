/**
 * Beautiful UI/UX Formatting Utilities for RecallOS
 * Provides emotionally intuitive labels, calm styles, and premium emoji categories.
 */

export function formatPriority(priority: string): string {
  switch (priority) {
    case 'CRITICAL':
    case 'HIGH':
      return '🔥 Watch Soon'
    case 'MEDIUM':
      return '✨ Worth Watching'
    case 'LOW':
      return '📌 Saved For Later'
    default:
      return '📌 Saved For Later'
  }
}

export function getPriorityStyle(priority: string): string {
  switch (priority) {
    case 'CRITICAL':
    case 'HIGH':
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
    case 'MEDIUM':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    case 'LOW':
      return 'bg-muted text-muted-foreground border-border'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}

export function formatCategoryName(name: string): string {
  const lower = name.toLowerCase()

  if (lower.includes('artificial intelligence') || lower === 'ai' || lower.includes('ai-tech')) {
    return '🤖 AI & Innovation'
  }
  if (lower.includes('engineering') || lower.includes('tech') || lower.includes('coding')) {
    return '💻 Coding & Tech'
  }
  if (lower.includes('business') || lower.includes('career') || lower.includes('entrepreneurship')) {
    return '💼 Career & Business'
  }
  if (lower.includes('music') || lower.includes('lofi')) {
    return '🎵 Music & Chill'
  }
  if (lower.includes('entertainment') || lower.includes('fun')) {
    return '🎭 Fun & Entertainment'
  }
  if (lower.includes('travel') || lower.includes('adventure')) {
    return '✈️ Travel & Adventures'
  }
  if (lower.includes('education') || lower.includes('learning')) {
    return '📚 Learning'
  }
  if (lower.includes('productivity') || lower.includes('time')) {
    return '⚡ Productivity & Habits'
  }
  if (lower.includes('knowledge') || lower.includes('mindset') || lower.includes('essay')) {
    return '🧠 Mindset & Knowledge'
  }
  if (lower.includes('podcast') || lower.includes('interviews')) {
    return '🎙️ Podcasts & Talk'
  }
  if (lower.includes('finance') || lower.includes('investing')) {
    return '💰 Wealth & Finance'
  }
  if (lower.includes('design') || lower.includes('ui')) {
    return '🎨 Creative & Design'
  }
  if (lower.includes('news') || lower.includes('journalism')) {
    return '📰 World News'
  }
  if (lower.includes('fitness') || lower.includes('nutrition')) {
    return '🔋 Health & Vitality'
  }
  if (lower.includes('lifestyle') || lower.includes('vlogs')) {
    return '🪴 Calm Lifestyle'
  }
  if (lower.includes('gaming') || lower.includes('esports')) {
    return '🎮 Gaming Corner'
  }
  if (lower === 'uncategorized' || lower.includes('needs organizing') || lower.includes('organize')) {
    return '🗂 Needs Organizing'
  }

  // Fallback to title casing + dynamic emoji
  return `✨ ${name}`
}

export function getCategoryColorStyle(name: string): string {
  const lower = name.toLowerCase()

  if (lower.includes('artificial intelligence') || lower === 'ai' || lower.includes('ai-tech')) {
    return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
  }
  if (lower.includes('engineering') || lower.includes('tech') || lower.includes('coding')) {
    return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20'
  }
  if (lower.includes('business') || lower.includes('career') || lower.includes('entrepreneurship')) {
    return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
  }
  if (lower.includes('music') || lower.includes('lofi')) {
    return 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20'
  }
  if (lower.includes('entertainment') || lower.includes('fun')) {
    return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
  }
  if (lower.includes('travel') || lower.includes('adventure')) {
    return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
  }
  if (lower.includes('education') || lower.includes('learning')) {
    return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20'
  }
  if (lower.includes('productivity') || lower.includes('time')) {
    return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
  }
  if (lower.includes('knowledge') || lower.includes('mindset') || lower.includes('essay')) {
    return 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20'
  }
  if (lower.includes('podcast') || lower.includes('interviews')) {
    return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
  }
  if (lower.includes('finance') || lower.includes('investing')) {
    return 'bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20'
  }
  if (lower.includes('design') || lower.includes('ui')) {
    return 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20'
  }
  if (lower.includes('news') || lower.includes('journalism')) {
    return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
  }
  if (lower.includes('fitness') || lower.includes('nutrition')) {
    return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
  }
  if (lower.includes('lifestyle') || lower.includes('vlogs')) {
    return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
  }
  if (lower.includes('gaming') || lower.includes('esports')) {
    return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
  }
  return 'bg-muted text-muted-foreground border-border'
}

export function formatWatchState(status: string): string {
  switch (status) {
    case 'SAVED':
    case 'UNWATCHED':
      return '📌 Saved for Later'
    case 'STARTED':
      return '👀 Just Started'
    case 'IN_PROGRESS':
      return '⏳ Continue Watching'
    case 'COMPLETED':
      return '✨ Completed'
    case 'ARCHIVED':
      return '📦 Archived'
    default:
      return '📌 Saved for Later'
  }
}

export function getWatchStateStyle(status: string): string {
  switch (status) {
    case 'SAVED':
    case 'UNWATCHED':
      return 'bg-surface hover:bg-surface-hover text-muted-foreground border-border'
    case 'STARTED':
      return 'bg-primary/10 text-primary border-primary/20'
    case 'IN_PROGRESS':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    case 'COMPLETED':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    case 'ARCHIVED':
      return 'bg-muted text-muted-foreground border-border'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}
