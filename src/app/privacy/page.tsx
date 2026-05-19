import Link from "next/link"
import { RecallOSLogo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Shield, Eye, Database, Share2, Lock, UserCheck, Mail } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | RecallOS",
  description: "Learn how RecallOS handles your personal information, YouTube data, and authentication details.",
}

export default function PrivacyPage() {
  const lastUpdated = "May 19, 2026"

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content: (
        <>
          <p>
            RecallOS collects only the minimum amount of information necessary to help you catalog, index, and rediscover your saved learning materials.
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-muted-foreground">
            <li>
              <strong>Google Account Authentication:</strong> Basic email address and profile identity to verify your account.
            </li>
            <li>
              <strong>YouTube Watch Later:</strong> Liked videos, play history sync, and playlist items you choose to import.
            </li>
            <li>
              <strong>Basic Profile Details:</strong> Your name and avatar URL to personalize the companion dashboard.
            </li>
            <li>
              <strong>User Preferences:</strong> Custom tags, priority rankings, category categorization flags, and layout settings.
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: Database,
      title: "2. How Data Is Used",
      content: (
        <>
          <p>
            The data we sync is utilized exclusively to provide your custom intelligent cataloging features. RecallOS uses this information to:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-muted-foreground">
            <li>Organize and index saved video resources.</li>
            <li>Power the smart periodic resurfacing algorithm.</li>
            <li>Improve discovery paths through automated categorizations.</li>
            <li>Ensure cross-device sync and general dashboard functionality.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Share2,
      title: "3. Data Sharing",
      content: (
        <>
          <p className="font-semibold text-foreground">
            RecallOS does not sell your personal information.
          </p>
          <p className="mt-2 text-muted-foreground">
            We do not share your private user data with third parties except where strictly required for core platform functionality (such as interacting securely with the Google API and database engines).
          </p>
        </>
      ),
    },
    {
      icon: Lock,
      title: "4. Authentication & Security",
      content: (
        <>
          <p>
            Security is built into the architecture of RecallOS. Your tokens and credentials are encrypted and stored safely:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-muted-foreground">
            <li>
              <strong>Google OAuth:</strong> Secure token handshakes directly with Google servers. We never see or store your raw password.
            </li>
            <li>
              <strong>Supabase:</strong> Robust, production-grade secure authentication state and data handling layer.
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: UserCheck,
      title: "5. User Control",
      content: (
        <>
          <p>
            You remain in complete control of your digital library. At any time, you can:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-muted-foreground">
            <li>Disconnect your Google/YouTube integration in the settings dashboard.</li>
            <li>Cease using the RecallOS companion platform completely.</li>
            <li>Request permanent removal of your account, synced history, and metadata.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Mail,
      title: "6. Contact Us",
      content: (
        <>
          <p>
            If you have questions about this Privacy Policy, your sync files, or data removal requests, feel free to reach out to us:
          </p>
          <div className="mt-3">
            <a
              href="mailto:support@recallos.app"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4"
            >
              support@recallos.app
            </a>
          </div>
        </>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Sticky Premium Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto h-16 px-6 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <RecallOSLogo showText className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-surface border border-transparent hover:border-border/50"
            >
              Back to App
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 md:py-16 space-y-12">
        <div className="space-y-3.5 border-b border-border/60 pb-8">
          <div className="inline-flex p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/15 text-indigo-500 dark:text-indigo-400">
            <Shield className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground font-medium text-sm">
            How RecallOS handles your information.
          </p>
          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-black pt-2 select-none">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Structured Legal Cards */}
        <div className="space-y-8">
          {sections.map((section, idx) => {
            const Icon = section.icon
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border/40 bg-card p-6 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-xl bg-accent/30 p-2.5 border border-border/40 text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-colors shrink-0">
                    <Icon className="w-4.5 h-4.5 stroke-[1.8]" />
                  </div>
                  <div className="space-y-2.5 flex-1">
                    <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </h2>
                    <div className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Simple Footer Note */}
        <div className="pt-8 border-t border-border/40 text-center select-none">
          <p className="text-xs text-muted-foreground/60 font-semibold">
            © {new Date().getFullYear()} RecallOS. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-2 text-[11px] font-bold text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-foreground hover:underline underline-offset-4">
              Terms of Service
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
