<div align="center">

<br />

<!-- Logo -->
<img src="public/logo.svg" alt="RecallOS Logo" width="72" height="72" />

<br /><br />

# RecallOS

### *Remember what matters.*

**An AI-powered content memory and resurfacing platform that helps you rediscover the videos that once inspired you — before they're forgotten forever.**

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_&_DB-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

<br />

> *"Most people don't have a knowledge problem. They have a memory problem."*

<br />

</div>

---

## The Problem

We've all been there.

You're watching YouTube and you stumble across something remarkable — a lecture that reframes how you think about your career, a documentary that changes the way you see the world, a tutorial that could genuinely transform how you work.

You click **Save to Watch Later**.

And then you never watch it again.

Your Watch Later playlist quietly swells to 400 videos. Then 600. Then it stops being a list and becomes a graveyard — full of things you once cared about, buried under the weight of everything you've added since.

This is not a discipline problem. It is a **design problem**.

YouTube's Watch Later was built for convenience, not for memory. It saves content but offers no intelligence about what to revisit, no understanding of where you left off, and no mechanism to surface the things that once mattered to you. The algorithm is optimized for new content — not the content you already chose.

So the ideas stay saved. And the inspiration stays forgotten.

---

## The Solution

**RecallOS** is a content memory system built for intentional people.

It connects to your YouTube library, understands what you've saved, intelligently organizes it into meaningful categories, and actively resurfaces the right content at the right time — so you actually finish what you started, and rediscover what you forgot.

Think of it as a **personal AI companion for your saved content**.

Not a bookmark manager. Not a watchlist. A **memory layer** — a living, evolving understanding of your intellectual and creative interests, designed to convert passive saving into active, meaningful rediscovery.

---

## Key Features

<br />

### 🔄 Smart YouTube Sync
RecallOS connects directly to your YouTube account via Google OAuth and automatically syncs your Liked Videos in the background. New content you save appears in your library without any manual effort — silently, reliably, behind the scenes.

<br />

### 🧠 Intelligent Categorization
A custom hybrid categorization engine analyzes video metadata — titles, descriptions, channel names, tags, and YouTube category signals — and automatically sorts your library into meaningful, personalized collections. No manual tagging. No endless organizing. It just knows.

<br />

### ▶️ Continue Watching
RecallOS tracks your watch state intelligently. Videos you've started are remembered and surfaced in a dedicated **Continue Watching** rail, so you can pick up exactly where you left off without hunting through a disorganized list.

<br />

### 🌊 Smart Resurfacing
The resurfacing engine periodically surfaces videos that haven't been viewed in a while, content that matches your evolving interests, and items nearing relevance expiration — the digital equivalent of a friend saying, *"Hey, remember that video you saved six months ago? You should probably watch it."*

<br />

### 💾 Watch State Memory
Every video carries a full lifecycle state: `Saved`, `In Progress`, `Completed`, `Archived`. The platform remembers when you started, when you last opened something, and how many times you've returned to it. Your library has genuine memory.

<br />

### 📊 Personalized Dashboard
A beautiful, data-rich dashboard gives you a real-time view of your content memory — active categories, priority content, recent additions, completion stats, and resurfacing recommendations. It feels less like a media player and more like a personal knowledge dashboard.

<br />

### 🌗 Light & Dark Mode
A premium dual-mode visual system with a thoughtfully crafted dark interface and a high-contrast, fully accessible light mode. Every color, every shadow, every transition has been deliberately designed for extended, comfortable use.

<br />

### 📱 Mobile-Friendly Experience
RecallOS is fully responsive — optimized for touch, designed for mobile screens, and fast on every device. Your content memory travels with you.

<br />

### ⚡ AI-Ready Architecture
The categorization, resurfacing, and watch-state systems are designed with extensibility in mind. The architecture is ready to support semantic embeddings, LLM-powered understanding, and personalized learning intelligence as the product evolves.

---

## Product Philosophy

> *"Modern people don't suffer from lack of information. They suffer from forgotten information."*

We live in an era of infinite content. The internet delivers more learning, inspiration, and creativity than any human mind can process. The bottleneck is no longer access — it's memory.

Most productivity tools try to solve this by adding more structure: more folders, more tags, more systems. They turn the problem of too much content into the problem of too much organization.

RecallOS takes a different approach.

It believes that the job of a great tool is not to demand more from you — it is to quietly remember *for* you. To sit in the background, understand what you care about, and gently surface it back when the moment is right.

The goal is to convert:

**passive saving → intentional rediscovery**

Every video you save represents a version of yourself that found something worth remembering. RecallOS honors that intention. It treats your saved content not as data to be filed, but as a reflection of your curiosity — something worth protecting, preserving, and returning to.

---

## Screenshots

<br />

| Dashboard | Categories |
|-----------|------------|
| ![Dashboard](public/screenshots/dashboard.png) | ![Categories](public/screenshots/categories.png) |

| Resurfacing | Onboarding |
|-------------|------------|
| ![Resurfacing](public/screenshots/resurfacing.png) | ![Onboarding](public/screenshots/onboarding.png) |

> *Screenshots coming soon — run locally to experience the interface.*

---

## Tech Stack

<br />

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Server Components) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) (strict mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + CSS custom properties |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Authentication** | [Supabase Auth](https://supabase.com/auth) + Google OAuth 2.0 |
| **Database** | [PostgreSQL](https://www.postgresql.org) via Supabase + [Prisma ORM](https://www.prisma.io) |
| **YouTube Integration** | [YouTube Data API v3](https://developers.google.com/youtube/v3) |
| **Hosting** | [Vercel](https://vercel.com) |

---

## Architecture Overview

### Authentication & OAuth Flow
Users sign in via Google OAuth through Supabase Auth. During sign-in, RecallOS requests `youtube.readonly` scopes alongside profile scopes and captures both the `access_token` and `refresh_token`. Tokens are stored securely in the database alongside the user profile.

### Silent Token Refresh
When access tokens expire (typically after 1 hour), RecallOS automatically refreshes them in the background using the stored refresh token and Google's token exchange endpoint — no user interaction required. If a refresh fails (revoked access, changed permissions), users receive a clear, friendly prompt to reconnect their account.

### YouTube Sync Engine
The sync engine fetches your Liked Videos playlist using paginated calls to the YouTube Data API v3, enriches each video with full metadata (descriptions, tags, channel data, YouTube category IDs), and upserts everything into your personal library with intelligent deduplication.

### Categorization Engine
A custom multi-signal hybrid classifier analyzes each video using title patterns, channel name matching, description keywords, official YouTube category IDs, and curated tag signals. Each classification includes a confidence score and a debug signal trace, allowing the system to improve over time.

### Watch-State Engine
RecallOS tracks `startedAt`, `lastOpenedAt`, `openCount`, `progress`, and `status` for every video. These signals power the **Continue Watching** rail and feed into the resurfacing priority algorithm.

### Resurfacing Logic
The resurfacing engine scores unwatched videos based on time since save, content relevance signals, user engagement history, and category priority weights — and surfaces the highest-value content in the dashboard resurfacing section.

---

## Why This Project Matters

Most portfolio projects demonstrate that a developer can build CRUD applications. RecallOS demonstrates something more ambitious: that software can **understand human behavior** and make thoughtful decisions on behalf of the people who use it.

RecallOS is built at the intersection of four significant disciplines:

**Behavioral Design** — The product is built around the psychological reality that humans are poor at self-initiated retrieval. RecallOS doesn't wait for users to remember — it remembers for them.

**Memory Psychology** — The resurfacing system is inspired by research on spaced repetition and the forgetting curve. Content doesn't just sit in a list — it is actively reintroduced at psychologically meaningful intervals.

**Content Overload Problem** — Information abundance has become one of the defining challenges of the digital age. RecallOS is a genuine attempt to address that problem with a sustainable, elegant product — not a workaround.

**Meaningful Rediscovery** — The goal of RecallOS is not efficiency. It is depth. It aims to help people form lasting relationships with the ideas they encounter, rather than skimming endlessly through an infinite feed.

This is not a side project dressed up as a product. It is a product that happens to be open source.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com)
- A [Supabase](https://supabase.com) project
- A [Google Cloud](https://console.cloud.google.com) project with YouTube Data API v3 enabled

### 1. Clone the repository

```bash
git clone https://github.com/your-username/recallos.git
cd recallos
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then fill in your credentials (see [Environment Variables](#environment-variables) below).

### 4. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your **Project URL** and **anon key** from the project settings
3. Copy the **Service Role Key** from the API settings
4. Add your connection string to `DATABASE_URL`

### 5. Set up Google OAuth

1. Open [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use an existing one)
3. Enable the **YouTube Data API v3**
4. Navigate to **Credentials → Create OAuth 2.0 Client ID**
5. Set the authorized redirect URI to:
   ```
   http://localhost:3000/auth/callback
   ```
   (and your production domain when deploying)
6. Copy your **Client ID** and **Client Secret**
7. In Supabase, navigate to **Authentication → Providers → Google** and enter your credentials

### 6. Initialize the database

```bash
npx prisma generate
npx prisma db push
```

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see RecallOS running locally.

---

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres

# Google OAuth (for YouTube integration)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# YouTube API
YOUTUBE_API_KEY=your-youtube-api-key
```

---

## Roadmap

RecallOS is actively evolving. Here is what is coming next:

<br />

| Status | Feature |
|--------|---------|
| 🔜 **Planned** | **Browser Extension** — Save content from any page, not just YouTube |
| 🔜 **Planned** | **Semantic Embeddings** — AI-powered understanding of video content meaning, not just metadata |
| 🔜 **Planned** | **Spaced Repetition Resurfacing** — Scientifically-timed content reintroduction based on the forgetting curve |
| 🔜 **Planned** | **Article & Newsletter Support** — Extend the memory layer to written content |
| 🔜 **Planned** | **Cross-Platform Memory** — Save content from Twitter, Reddit, and Substack into a unified memory library |
| 🔜 **Planned** | **AI Summarization** — On-demand intelligent summaries of saved videos without watching |
| 🔜 **Planned** | **Personalized Learning Paths** — AI-curated content sequences based on your interests and watch history |
| 🔜 **Planned** | **Collaborative Collections** — Share curated playlists and knowledge libraries with others |
| 🔜 **Planned** | **Mobile App** — Native iOS and Android applications |

---

## Contributing

Contributions are warmly welcome.

If you've found a bug, have a feature idea, or want to improve the codebase — please open an issue to start a conversation. For significant changes, please open an issue first so we can discuss the approach before you invest time writing code.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a pull request
```

Please keep pull requests focused and well-described. Small, purposeful changes are easier to review and merge than large, unfocused ones.

---

## License

This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, and distribute this software. Attribution is appreciated but not required.

---

<div align="center">

<br />

### *"You saved those videos for a reason."*

Every video in your library once caught your attention for a reason. A spark of curiosity. A desire to learn something. An idea you didn't want to lose.

RecallOS exists to honor that intention.

It remembers so you can rediscover — not what the algorithm wants to show you next, but what you once chose, in a quiet moment, to remember.

<br />

**Built with care. Designed for depth. Intended to last.**

<br />

---

*Made with ♥ by someone who lost too many good ideas to a Watch Later playlist.*

</div>
