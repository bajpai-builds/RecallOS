<div align="center">

<img src="public/branding/logo.svg" alt="RecallOS Logo" width="64" height="64" />

# RecallOS

### *Remember what matters.*

A personal content companion that organizes your saved YouTube library and quietly surfaces the videos you actually wanted to learn from—before they get buried forever.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_&_DB-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

<br />

</div>

## The Problem

We've all done it.

You're browsing YouTube and run across something genuinely useful: a deep-dive lecture on database architecture, a documentary on design history, or a tutorial on a library you've been wanting to try. 

You click **Save to Watch Later** (or hit Like).

And then you never watch it again.

Over the months, that playlist quietly swells into hundreds of videos. It stops being a queue and becomes a digital graveyard—full of interesting ideas you once cared about, buried under the weight of everything you've added since.

This isn't a lack of discipline. It's a **design problem**. 

Platforms are engineered for the infinite scroll. They want you to consume whatever is new, noisy, and next. Your Watch Later list was built for quick bookmarks, not for recall. It offers no easy way to categorize what you've saved, no memory of where you left off, and no deliberate way to bring back the concepts you actually wanted to learn.

The things we want to remember get drowned out by the feed.

## The Solution

**RecallOS** is a space built for intentional learning. 

It connects to your library, keeps track of your progress, groups your saved videos into clean, automated categories, and periodically surfaces older, high-value content. 

It acts as a lightweight companion that quietly remembers for you, transforming your passive pile of bookmarks into an active, organized catalog of things you actually want to watch.

## Key Features

### Silent YouTube Sync
RecallOS connects to your account via Google OAuth and syncs your library in the background. As you save or like videos on the go, they automatically populate your dashboard without you needing to do a thing.

### Automated Categorization
A multi-signal classification engine analyzes video titles, descriptions, channel tags, and category metadata to group videos into clean collections (like *Engineering*, *Design*, *Science*, or *Media*). No tedious manual tagging required.

### Granular Watch Progress
Track your exact lifecycle states: `Saved`, `In Progress`, `Completed`, or `Archived`. The interface remembers exactly where you paused and how many times you've opened a video, creating a reliable trail of your active interests.

### Spaced Resurfacing
A decay-based resurfacing system regularly highlights older, high-value videos that you haven't opened in a while, keeping your best discoveries fresh in your mind.

### Unified Dashboard
A simple, readable dashboard displaying your active categories, priority watchlists, ongoing items, and resurfacing suggestions. It feels less like a video player and more like a structured personal reference space.

### Light & Dark Modes
A responsive dual-mode system featuring a dark palette and a readable, high-contrast light mode, built to keep reading comfortable at any hour.

### Flexible Technical Architecture
The classification and resurfacing engines are modularly decoupled. They are fully prepared for vector search extensions, semantic LLM pipelines, and direct transcription engines as the project grows.

## Product Philosophy

> *"We don't suffer from a lack of information. We suffer from forgotten information."*

We live in an age of abundant knowledge. The bottleneck is no longer access to great ideas—it is our ability to retain and return to them. 

Most tools try to solve this with strict, manual organization. They ask you to maintain databases, folders, and tags. But that just turns the problem of too much content into the problem of too much admin work.

RecallOS believes a tool should work for you, not the other way around. 

By automating the organization and gently resurfacing past saves, it turns a passive habit into an intentional practice. Every video you once chose to save represents a spark of curiosity. RecallOS simply honors that curiosity by keeping it within reach.

## Screenshots

| Dashboard | Collections |
|-----------|------------|
| ![Dashboard](public/screenshots/dashboard.png) | ![Categories](public/screenshots/categories.png) |

| Resurfacing | Onboarding |
|-------------|------------|
| ![Resurfacing](public/screenshots/resurfacing.png) | ![Onboarding](public/screenshots/onboarding.png) |

*(Note: Real screenshots coming soon—run the server locally to explore the UI)*

## Tech Stack

* **Framework:** Next.js 16 (App Router, Server Components)
* **Language:** TypeScript 5 (Strict Mode)
* **Styling:** Tailwind CSS v4 + native CSS properties
* **UI & Interactions:** shadcn/ui + Framer Motion
* **Database & Auth:** Supabase Auth + Prisma ORM on PostgreSQL
* **Integration:** YouTube Data API v3

## Architecture Overview

* **OAuth & Silent Token Renewal:** Authenticates via Google OAuth through Supabase Auth, requesting standard `youtube.readonly` scopes. It captures and stores both access and refresh tokens. When an access token expires, a background service uses the refresh token to silently swap it, keeping sync active. If the user revokes permissions, a custom error bubbles up to show a clean re-connection prompt.
* **Sync & Metadata Pipeline:** Fetches saved playlists dynamically, extracts descriptions, channel details, and category tags, and upserts them into PostgreSQL with strict deduplication using Prisma.
* **Classification Logic:** A scoring service matches text patterns, channel catalogs, and official API category signals to automatically assign each video a specific category, attaching a traceability log for transparency.
* **Resurfacing & State Engine:** Tracks granular metrics (`startedAt`, `lastOpenedAt`, `openCount`, `progress`) to maintain accurate continue-watching cards and calculate decay scores for the dashboard's resurfacing recommendations.

## Why This Project Matters

Most software portfolios demonstrate that a developer can write basic CRUD code. RecallOS was built to tackle a genuine human problem: digital cognitive overload.

Building this application required resolving several practical engineering challenges:

1. **Context-Aware Classification:** Balancing speed and accuracy to categorize messy web data without requiring heavy, expensive processing on every API page pull.
2. **Resilient Third-Party Sync:** Handling rate limits, token expirations, token revocation states, and silent recovery loops gracefully without letting background jobs silently crash.
3. **Behavioral UX Design:** Building an interface that encourages focus rather than endless consumption, utilizing spaced cues and clean layout hierarchy to help users follow through on their learning intentions.

It is a functional utility designed to make daily internet use a little more thoughtful and focused.

## Getting Started

### Prerequisites
- Node.js 18 or newer
- An active Supabase project
- A Google Cloud Console project with the YouTube Data API v3 enabled

### 1. Clone & Install
```bash
git clone https://github.com/your-username/recallos.git
cd recallos
npm install
```

### 2. Configure Environment
Create a `.env.local` file in the root directory:
```env
# Supabase & PostgreSQL Connection
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# YouTube Read-Only Key
YOUTUBE_API_KEY=your-youtube-api-key
```

### 3. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the app running locally.

## Future Plans

- **Browser Extension:** Clip and save articles, papers, or videos directly from any website.
- **Semantic Embeddings:** Use vector embeddings to search and discover saved content by its meaning and concepts rather than just keyword matches.
- **AI-Powered Synthesizer:** Generate quick, readable text outlines of synced videos so you can scan the core points before watching.
- **Spaced Repetition Prompts:** Send subtle reminders based on your forgetting curves for highly technical reference material.
- **Unified Feed Integration:** Support saving articles, newsletters, and podcasts alongside video libraries.

## Contributing

If you have ideas for features, feel free to open an issue to chat about it. For bug fixes and cleanups, pull requests are always welcome! 

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "feat: add some improvement"`)
4. Push the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is open-source and licensed under the [MIT License](LICENSE).

---

<div align="center">

### *"You saved those videos for a reason."*

RecallOS is a quiet space to remember what once sparked your curiosity, letting you return to your best discoveries when you have the time to appreciate them.

**Made for depth. Built to last.**

</div>
