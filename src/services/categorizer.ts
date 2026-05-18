export interface CategoryRule {
  name: string
  slug: string
  color: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  keywords: string[]
  ytCategoryIds?: string[]
}

export const CATEGORIES: Record<string, CategoryRule> = {
  ai_tech: {
    name: 'Artificial Intelligence',
    slug: 'ai-tech',
    color: 'bg-violet-500',
    priority: 'CRITICAL',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural', 'llm', 'chatgpt', 'openai', 'gemini', 'anthropic', 'claude', 'copilot', 'midjourney', 'gpu', 'nvidia', 'huggingface', 'rag', 'agentic', 'langchain']
  },
  engineering: {
    name: 'Engineering',
    slug: 'engineering',
    color: 'bg-blue-500',
    priority: 'HIGH',
    keywords: ['react', 'next.js', 'nextjs', 'typescript', 'javascript', 'python', 'coding', 'programming', 'developer', 'frontend', 'backend', 'fullstack', 'docker', 'kubernetes', 'git', 'api', 'database', 'sql', 'postgres', 'rust', 'golang', 'software engineer', 'devops', 'linux', 'terminal', 'vscode', 'architect', 'refactoring', 'clean code', 'algorithms', 'data structures', 'compiler', 'debugging']
  },
  education: {
    name: 'Education',
    slug: 'education',
    color: 'bg-emerald-600',
    priority: 'MEDIUM',
    keywords: ['tutorial', 'course', 'lecture', 'learn', 'study', 'explained', 'how to', 'bootcamp', 'crash course', 'physics', 'math', 'science', 'history', 'philosophy', 'school', 'college', 'academic'],
    ytCategoryIds: ['27']
  },
  productivity: {
    name: 'Productivity',
    slug: 'productivity',
    color: 'bg-emerald-500',
    priority: 'MEDIUM',
    keywords: ['productivity', 'habits', 'time management', 'notion', 'obsidian', 'second brain', 'workflow', 'morning routine', 'deep work', 'focus', 'efficiency', 'organization', 'discipline', 'focusing', 'planning']
  },
  business: {
    name: 'Business',
    slug: 'business',
    color: 'bg-indigo-500',
    priority: 'HIGH',
    keywords: ['startup', 'founder', 'saas', 'business model', 'venture capital', 'yc', 'y combinator', 'bootstrapped', 'acquisition', 'revenue', 'ceo', 'scale', 'monetization', 'economics', 'company', 'corporate', 'work', 'dihari', 'interns', 'intern']
  },
  entrepreneurship: {
    name: 'Entrepreneurship',
    slug: 'entrepreneurship',
    color: 'bg-teal-600',
    priority: 'HIGH',
    keywords: ['entrepreneur', 'pitching', 'side hustle', 'solopreneur', 'micro-saas', 'indie hacker', 'business idea', 'passive income', 'hustling', 'scaling business']
  },
  finance: {
    name: 'Finance',
    slug: 'finance',
    color: 'bg-amber-500',
    priority: 'HIGH',
    keywords: ['finance', 'investing', 'stock', 'crypto', 'bitcoin', 'ethereum', 'money', 'wealth', 'budget', 'trading', 'portfolio', 'dividend', 'inflation', 'real estate']
  },
  marketing: {
    name: 'Marketing',
    slug: 'marketing',
    color: 'bg-pink-500',
    priority: 'MEDIUM',
    keywords: ['marketing', 'seo', 'growth hacking', 'ads', 'branding', 'copywriting', 'social media', 'funnel', 'conversion', 'audience', 'analytics', 'growth']
  },
  podcasts: {
    name: 'Podcasts',
    slug: 'podcasts',
    color: 'bg-rose-500',
    priority: 'MEDIUM',
    keywords: ['podcast', 'interview', 'talk show', 'ep ', 'episode', 'conversation', 'guest', 'full show', 'dialogue', 'fireside chat', 'interviewing']
  },
  entertainment: {
    name: 'Entertainment',
    slug: 'entertainment',
    color: 'bg-red-500',
    priority: 'LOW',
    keywords: ['funny', 'comedy', 'meme', 'reaction', 'challenge', 'prank', 'roast', 'parody', 'skit', 'fail', 'show', 'mrbeast', 'drama', 'gossip', 'survive', 'laugh', 'joke', 'roasting', 'reactions', 'karma', 'instant karma'],
    ytCategoryIds: ['23', '24']
  },
  gaming: {
    name: 'Gaming',
    slug: 'gaming',
    color: 'bg-sky-500',
    priority: 'LOW',
    keywords: ['gaming', 'gameplay', 'walkthrough', 'lets play', 'stream', 'twitch', 'ps5', 'xbox', 'nintendo', 'minecraft', 'fortnite', 'cyberpunk', 'esports', 'gamer', 'cod', 'cs2'],
    ytCategoryIds: ['20']
  },
  music: {
    name: 'Music',
    slug: 'music',
    color: 'bg-fuchsia-500',
    priority: 'LOW',
    keywords: ['music', 'song', 'audio', 'lyric', 'playlist', 'album', 'cover', 'live performance', 'instrumental', 'lofi', 'chill', 'remix', 'beats', 'track', 'bgm', 'soundtrack', 'acoustic', 'symphony'],
    ytCategoryIds: ['10']
  },
  travel: {
    name: 'Travel',
    slug: 'travel',
    color: 'bg-yellow-500',
    priority: 'LOW',
    keywords: ['travel', 'adventure', 'explore', 'vacation', 'trip', 'flight', 'backpacking', 'wanderlust', 'hotel', 'destination', 'mountains', 'ride', 'tour', 'journey'],
    ytCategoryIds: ['15']
  },
  lifestyle: {
    name: 'Lifestyle',
    slug: 'lifestyle',
    color: 'bg-lime-500',
    priority: 'LOW',
    keywords: ['lifestyle', 'vlog', 'routine', 'home', 'apartment', 'minimalism', 'food', 'cooking', 'recipe', 'unboxing', 'haul', 'organizing', 'beauty', 'fashion']
  },
  fitness: {
    name: 'Fitness',
    slug: 'fitness',
    color: 'bg-orange-500',
    priority: 'LOW',
    keywords: ['fitness', 'workout', 'gym', 'health', 'nutrition', 'exercise', 'diet', 'bodybuilding', 'yoga', 'cardio', 'stretching', 'longevity', 'training']
  },
  news: {
    name: 'News',
    slug: 'news',
    color: 'bg-slate-500',
    priority: 'MEDIUM',
    keywords: ['news', 'breaking', 'report', 'politics', 'current events', 'journalism', 'world news', 'daily briefing', 'update', 'geopolitical'],
    ytCategoryIds: ['25']
  },
  knowledge: {
    name: 'Knowledge',
    slug: 'knowledge',
    color: 'bg-teal-500',
    priority: 'MEDIUM',
    keywords: ['documentary', 'essay', 'analysis', 'deep dive', 'investigation', 'mindset', 'psychology', 'curiosity', 'intellectual', 'biography', 'book review', 'insights', 'summary', 'lessons learned', 'history doc', 'science doc']
  },
  uncategorized: {
    name: 'Uncategorized',
    slug: 'uncategorized',
    color: 'bg-zinc-500',
    priority: 'MEDIUM',
    keywords: []
  }
}

// STAGE 2: expanded High-Confidence Channel intelligence database
const TRUSTED_CHANNELS: Record<string, { slug: string; explanation: string }> = {
  // Music channels & labels
  'vevo': { slug: 'music', explanation: 'Matched VEVO Music network channel' },
  'lofi girl': { slug: 'music', explanation: 'Matched high-confidence chill lofi stream: Lofi Girl' },
  'tones & beats': { slug: 'music', explanation: 'Matched high-confidence instrumentals: TONES & BEATS' },
  'trap nation': { slug: 'music', explanation: 'Matched high-confidence music channel: Trap Nation' },
  'ncs': { slug: 'music', explanation: 'Matched high-confidence music channel: NCS (NoCopyrightSounds)' },
  'nocopyrightsounds': { slug: 'music', explanation: 'Matched high-confidence music channel: NoCopyrightSounds' },
  'monstercat': { slug: 'music', explanation: 'Matched electronic music label channel: Monstercat' },
  'spinnin': { slug: 'music', explanation: 'Matched major EDM music label channel: Spinnin Records' },
  'arijit singh': { slug: 'music', explanation: 'Matched trusted singer profile: Arijit Singh' },
  'diljit dosanjh': { slug: 'music', explanation: 'Matched trusted artist profile: Diljit Dosanjh' },
  't-series': { slug: 'music', explanation: 'Matched major music record label channel: T-Series' },
  'forester': { slug: 'music', explanation: 'Matched trusted indie/electronic artist: Forester' },
  'dj ': { slug: 'music', explanation: 'Matched DJ artist channel' },

  // Entertainment / Comedy / Meme channels
  'mrbeast': { slug: 'entertainment', explanation: 'Matched high-confidence entertainment channel: MrBeast' },
  'carryminati': { slug: 'entertainment', explanation: 'Matched high-confidence entertainment/roast channel: CarryMinati' },
  'samay raina': { slug: 'entertainment', explanation: 'Matched high-confidence comedy/gaming channel: Samay Raina' },
  'carryislive': { slug: 'entertainment', explanation: 'Matched comedy/gaming channel: CarryIsLive' },
  'saiman says': { slug: 'entertainment', explanation: 'Matched high-confidence satire channel: Saiman Says' },
  'ashish chanchlani': { slug: 'entertainment', explanation: 'Matched high-confidence comedy channel: Ashish Chanchlani' },
  'bhuvan bam': { slug: 'entertainment', explanation: 'Matched high-confidence comedy creator: Bhuvan Bam' },
  'bb ki vines': { slug: 'entertainment', explanation: 'Matched comedy creator channel: BB Ki Vines' },
  'dude perfect': { slug: 'entertainment', explanation: 'Matched entertainment/challenge channel: Dude Perfect' },
  'sidemen': { slug: 'entertainment', explanation: 'Matched entertainment group channel: Sidemen' },
  'comedy central': { slug: 'entertainment', explanation: 'Matched mainstream comedy brand channel: Comedy Central' },
  'vijay3guy': { slug: 'entertainment', explanation: 'Matched entertainment creator vlog: Vijay3Guy' },

  // Engineering / Development
  'fireship': { slug: 'ai-tech', explanation: 'Matched developer/AI channel: Fireship' },
  'theo - t3.gg': { slug: 'engineering', explanation: 'Matched trusted developer/engineering channel: Theo' },
  'freecodecamp': { slug: 'engineering', explanation: 'Matched engineering course provider: freeCodeCamp' },
  'web dev simplified': { slug: 'engineering', explanation: 'Matched coding instruction channel: Web Dev Simplified' },
  'traversy media': { slug: 'engineering', explanation: 'Matched coding tutorials: Traversy Media' },
  'the net ninja': { slug: 'engineering', explanation: 'Matched developer instructions channel: The Net Ninja' },
  'primeagen': { slug: 'engineering', explanation: 'Matched software engineering insights: The Primeagen' },
  'bytebytego': { slug: 'engineering', explanation: 'Matched system architecture channel: ByteByteGo' },
  'bytemonk': { slug: 'engineering', explanation: 'Matched architecture channel: ByteMonk' },

  // AI & Technology research
  'openai': { slug: 'ai-tech', explanation: 'Matched official AI research team channel: OpenAI' },
  'google deepmind': { slug: 'ai-tech', explanation: 'Matched official AI research laboratory channel: Google DeepMind' },
  'ai explained': { slug: 'ai-tech', explanation: 'Matched high-fidelity AI updates: AI Explained' },
  'two minute papers': { slug: 'ai-tech', explanation: 'Matched academic tech highlights channel: Two Minute Papers' },
  'matt wolfe': { slug: 'ai-tech', explanation: 'Matched AI updates creator channel: Matt Wolfe' },
  
  // Podcasts / Conversations
  'lex fridman': { slug: 'podcasts', explanation: 'Matched high-confidence podcast: Lex Fridman' },
  'huberman lab': { slug: 'podcasts', explanation: 'Matched neurobiology & human performance podcast: Huberman Lab' },
  'ranveer allahbadia': { slug: 'podcasts', explanation: 'Matched major conversation podcast: Ranveer Allahbadia' },
  'beerbiceps': { slug: 'podcasts', explanation: 'Matched major interview podcast channel: BeerBiceps' },
  'raj shamani': { slug: 'podcasts', explanation: 'Matched business and self-growth podcast: Raj Shamani' },
  'joe rogan': { slug: 'podcasts', explanation: 'Matched global talk podcast: Joe Rogan' },

  // Business / SaaS / Entrepreneurship
  'y combinator': { slug: 'business', explanation: 'Matched startup accelerator network: Y Combinator' },
  'ycombinator': { slug: 'business', explanation: 'Matched startup network: YCombinator' },
  'saastr': { slug: 'business', explanation: 'Matched SaaS founders global community channel: SaaStr' },
  'codie sanchez': { slug: 'business', explanation: 'Matched startup & business acquiring channel: Codie Sanchez' },
  'garyvee': { slug: 'business', explanation: 'Matched startup & marketing speaker: GaryVee' },
  'valuetainment': { slug: 'business', explanation: 'Matched business & leadership instruction channel: Valuetainment' },
  
  // Finance
  'graham stephan': { slug: 'finance', explanation: 'Matched personal finance channel: Graham Stephan' },
  'meet kevin': { slug: 'finance', explanation: 'Matched real estate & financial market trader: Meet Kevin' },
  'ali abdaal': { slug: 'productivity', explanation: 'Matched personal productivity author channel: Ali Abdaal' },

  // Travel / Exploration
  'passenger paramvir': { slug: 'travel', explanation: 'Matched globetrotting travel vlog: Passenger Paramvir' },
  'nomadic indian': { slug: 'travel', explanation: 'Matched travel journey vlog channel: Nomadic Indian' },
  'mountain trekker': { slug: 'travel', explanation: 'Matched trek and travel vlog channel: Mountain Trekker' }
}

// Stage 1: clean helper
function cleanText(text: string): string {
  if (!text) return ''
  return text
    .toLowerCase()
    .replace(/[^\w\s#.]/g, ' ') // Preserve letters, numbers, spaces, dots
    .replace(/\s+/g, ' ')
    .trim()
}

// Pattern groups with high-confidence points boosts
const PATTERN_BOOSTS = [
  // Music cues
  {
    category: 'music',
    patterns: ['official video', 'official music video', 'official audio', 'lyrics', 'slowed', 'reverb', 'remix', 'acoustic', 'lofi', 'instrumental', 'cover', 'synthesia', 'visualizer', 'prod.', 'beats', 'song', 'symphony', 'chillmusic', 'bassboosted'],
    boost: 4.5,
    name: 'Music pattern cue match'
  },
  // Entertainment cues
  {
    category: 'entertainment',
    patterns: ['instant karma', 'funniest', 'prank', 'challenge', 'roast', 'meme', 'funny moments', 'satisfying', 'reaction', 'comedy', 'skit', 'laugh', 'joke', 'troll', 'trolling', 'worst', 'bro just'],
    boost: 4.5,
    name: 'Entertainment pattern cue match'
  },
  // Travel cues
  {
    category: 'travel',
    patterns: ['vlog', 'trip', 'journey', 'ride', 'tour', 'explore', 'travel guide', 'backpacking', 'road trip', 'caves', 'mumbai', 'rishikesh', 'ellora'],
    boost: 4.5,
    name: 'Travel pattern cue match'
  },
  // Business/Entrepreneurship cues
  {
    category: 'business',
    patterns: ['saas', 'startup', 'pitch deck', 'y combinator', 'how to build a business', 'agency', 'passive income', 'entrepreneur', 'business idea', 'dihari', 'work', 'interns', 'intern', 'company'],
    boost: 4.5,
    name: 'Business pattern cue match'
  },
  // Education cues
  {
    category: 'education',
    patterns: ['tutorial', 'how to', 'introduction to', 'lecture', 'crash course', 'course', 'explained', 'science of', 'basics of', 'physics', 'math'],
    boost: 3.5,
    name: 'Education pattern cue match'
  }
]

export function runHybridCategorizer(video: {
  title: string
  description?: string | null
  channelName: string
  youtubeCategoryId?: string | null
  tags?: string[]
}): {
  categoryName: string
  slug: string
  color: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  confidence: number
  reason: string
  debugSignals: string
} {
  // STAGE 1: Normalization
  const cleanTitle = cleanText(video.title)
  const cleanDesc = cleanText(video.description || '')
  const cleanChannel = video.channelName.toLowerCase().trim()
  const ytCategory = video.youtubeCategoryId || ''
  const cleanTags = (video.tags || []).map(t => cleanText(t))

  const debugLogs: string[] = []
  const matchDetails: Record<string, string[]> = {}

  // Initialize details
  for (const key in CATEGORIES) {
    matchDetails[CATEGORIES[key].slug] = []
  }

  // STAGE 2: High Confidence Channel Mapping
  let baseChannelSlug: string | null = null
  let baseChannelExplanation = ''
  for (const chName in TRUSTED_CHANNELS) {
    if (cleanChannel.includes(chName)) {
      const match = TRUSTED_CHANNELS[chName]
      baseChannelSlug = match.slug
      baseChannelExplanation = match.explanation
      break
    }
  }

  // STAGE 3: Category Weighted Scoring
  const scores: Record<string, number> = {}
  for (const key in CATEGORIES) {
    scores[CATEGORIES[key].slug] = 0
  }

  // A. Keyword matches across title, tags, description
  for (const key in CATEGORIES) {
    const rule = CATEGORIES[key]
    if (rule.slug === 'uncategorized') continue

    for (const kw of rule.keywords) {
      if (cleanTitle.includes(kw)) {
        scores[rule.slug] += 3.0
        matchDetails[rule.slug].push(`Title keyword "${kw}" (+3.0)`)
      }
      if (cleanTags.some(tag => tag.includes(kw) || kw.includes(tag))) {
        scores[rule.slug] += 2.0
        matchDetails[rule.slug].push(`Tag keyword "${kw}" (+2.0)`)
      }
      if (cleanDesc.includes(kw)) {
        scores[rule.slug] += 0.8
        matchDetails[rule.slug].push(`Desc keyword "${kw}" (+0.8)`)
      }
    }
  }

  // B. Pattern-Based Cues Boosting
  for (const item of PATTERN_BOOSTS) {
    for (const pattern of item.patterns) {
      if (cleanTitle.includes(pattern)) {
        scores[item.category] += item.boost
        matchDetails[item.category].push(`Title Pattern "${pattern}" (+${item.boost})`)
      }
      if (cleanDesc.includes(pattern)) {
        scores[item.category] += item.boost * 0.5
        matchDetails[item.category].push(`Desc Pattern "${pattern}" (+${item.boost * 0.5})`)
      }
    }
  }

  // C. High-Confidence Channel Mapping point contribution
  if (baseChannelSlug) {
    scores[baseChannelSlug] += 8.0
    matchDetails[baseChannelSlug].push(`Trusted Channel "${video.channelName}" (+8.0)`)
  }

  // STAGE 4: YouTube Category ID Boost (weight +5.0)
  if (ytCategory) {
    for (const key in CATEGORIES) {
      const rule = CATEGORIES[key]
      if (rule.ytCategoryIds?.includes(ytCategory)) {
        scores[rule.slug] += 5.0
        matchDetails[rule.slug].push(`YouTube Category ID Match (${ytCategory}) (+5.0)`)
      }
    }
  }

  // STAGE 5: Compound Confidence Boosting (Title Pattern + Channel Match)
  if (baseChannelSlug) {
    const hasCategoryPatterns = PATTERN_BOOSTS
      .filter(item => item.category === baseChannelSlug)
      .some(item => item.patterns.some(p => cleanTitle.includes(p)))

    if (hasCategoryPatterns) {
      scores[baseChannelSlug] += 5.0
      matchDetails[baseChannelSlug].push(`Compound Match: Creator + Category Patterns matched! (+5.0)`)
    }
  }

  // STAGE 6: Category Priority Dominance Rules (Prevents False Cues)
  // A. Music dominance (Music cues wipe out AI, Knowledge, Education, Productivity, Business)
  const isMusicStrong = scores['music'] > 3.0 || ytCategory === '10'
  if (isMusicStrong) {
    const suppressCandidates = ['ai-tech', 'engineering', 'knowledge', 'productivity', 'business', 'entrepreneurship']
    for (const slug of suppressCandidates) {
      if (scores[slug] > 0) {
        scores[slug] = 0
        matchDetails[slug] = []
      }
    }
    debugLogs.push('Dominance override: Music signals are dominant. Suppressed educational/business signals.')
  }

  // B. Entertainment dominance (Entertainment cues override Productivity, Business)
  const isEntertainmentStrong = scores['entertainment'] > 3.0 || ['23', '24'].includes(ytCategory)
  if (isEntertainmentStrong && !isMusicStrong) {
    const suppressCandidates = ['productivity', 'business']
    for (const slug of suppressCandidates) {
      if (scores[slug] > 0) {
        scores[slug] = 0
        matchDetails[slug] = []
      }
    }
    debugLogs.push('Dominance override: Entertainment cues are dominant. Suppressed productivity/business signals.')
  }

  // STAGE 7: Best Selection & Multi-Label scoring
  // Rank categories
  const sortedCandidates = Object.keys(scores)
    .filter(slug => slug !== 'uncategorized' && scores[slug] > 0)
    .map(slug => ({
      slug,
      name: CATEGORIES[slug.replace('-', '_')]?.name || slug,
      score: scores[slug]
    }))
    .sort((a, b) => b.score - a.score)

  let bestSlug = 'uncategorized'
  let bestScore = 0

  if (sortedCandidates.length > 0) {
    bestSlug = sortedCandidates[0].slug
    bestScore = sortedCandidates[0].score
  }

  // Calculate normalized confidence score
  // Strong threshold (score >= 8.5) -> confidence >= 0.85
  // Medium threshold (score >= 6.0) -> confidence 0.60 - 0.84
  // Soft threshold (score >= 4.0) -> confidence 0.40 - 0.59
  // Low threshold (score < 4.0) -> Uncategorized (< 0.40)
  let confidence = 0.0
  let confidenceBand = 'uncategorized'

  if (bestScore >= 8.5) {
    confidence = Math.min(1.0, 0.85 + (bestScore - 8.5) * 0.02)
    confidenceBand = 'strong'
  } else if (bestScore >= 6.0) {
    confidence = 0.60 + ((bestScore - 6.0) / 2.5) * 0.24
    confidenceBand = 'medium'
  } else if (bestScore >= 4.0) {
    confidence = 0.40 + ((bestScore - 4.0) / 2.0) * 0.19
    confidenceBand = 'soft'
  } else {
    confidence = Math.max(0.0, (bestScore / 4.0) * 0.39)
    confidenceBand = 'uncategorized'
  }

  // Threshold guardrail
  if (confidence < 0.40 || bestSlug === 'uncategorized') {
    const debugInfo = {
      stage: 'Fallback to Uncategorized',
      channel: video.channelName,
      maxScoreObtained: bestScore,
      bestAttemptedCategory: bestSlug,
      suppressionLogs: debugLogs,
      explanation: 'Classification confidence (score: ' + bestScore + ') did not exceed the required 0.40 soft threshold.',
      topCandidates: sortedCandidates.slice(0, 3)
    }

    return {
      categoryName: CATEGORIES.uncategorized.name,
      slug: CATEGORIES.uncategorized.slug,
      color: CATEGORIES.uncategorized.color,
      priority: CATEGORIES.uncategorized.priority,
      confidence: Number(confidence.toFixed(2)),
      reason: 'Ambiguous signals. Routed to Uncategorized to protect dashboard trust.',
      debugSignals: JSON.stringify(debugInfo, null, 2)
    }
  }

  const category = CATEGORIES[bestSlug.replace('-', '_')] || CATEGORIES.uncategorized
  const matchingReason = matchDetails[bestSlug]?.slice(0, 3).join('; ') || 'Classified via compound confidence boosting.'

  const debugInfo = {
    stage: 'Multi-Signal 2nd Generation Classification Success',
    channel: video.channelName,
    ytCategory,
    score: Number(bestScore.toFixed(2)),
    confidence: Number(confidence.toFixed(2)),
    confidenceBand,
    matchingSignals: matchDetails[bestSlug] || [],
    suppressionLogs: debugLogs,
    topCandidates: sortedCandidates.slice(0, 3)
  }

  return {
    categoryName: category.name,
    slug: category.slug,
    color: category.color,
    priority: category.priority,
    confidence: Number(confidence.toFixed(2)),
    reason: matchingReason,
    debugSignals: JSON.stringify(debugInfo, null, 2)
  }
}
