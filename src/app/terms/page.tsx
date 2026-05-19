import Link from "next/link"
import { RecallOSLogo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileText, Smartphone, ShieldAlert, Sparkles, Scale, Heart, Mail } from "lucide-react"

export const metadata = {
  title: "Terms of Service | RecallOS",
  description: "Read the guidelines and terms of service for using the RecallOS content memory platform.",
}

export default function TermsPage() {
  const lastUpdated = "May 19, 2026"

  const sections = [
    {
      icon: Smartphone,
      title: "1. Use of Service",
      content: (
        <>
          <p>
            RecallOS is designed to help you curate, organize, and remember saved content. By accessing our platform, you agree to:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-muted-foreground">
            <li>Use the service responsibly, ethically, and in accordance with local laws.</li>
            <li>Avoid any attempts to exploit, disrupt, or bypass the platform&apos;s security or API structures.</li>
            <li>Refrain from reverse engineering, scraping, or spamming the sync engines.</li>
          </ul>
        </>
      ),
    },
    {
      icon: ShieldAlert,
      title: "2. Account Usage",
      content: (
        <>
          <p>
            To use RecallOS, you authenticate securely via your Google account:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-muted-foreground">
            <li>You are responsible for all sync requests and watch history updates triggered by your account.</li>
            <li>We do not store your passwords. Account credentials are managed safely via Supabase and Google OAuth.</li>
            <li>Notify us immediately if you suspect any unauthorized access or compromise of your integration credentials.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Sparkles,
      title: "3. Availability & Evolution",
      content: (
        <>
          <p>
            RecallOS is continuously evolving to provide a premium, modern experience.
          </p>
          <p className="mt-2 text-muted-foreground">
            We reserve the right to modify features, adjust smart resurfacing logic, alter categorization models, or temporarily suspend portions of the service as the platform grows.
          </p>
        </>
      ),
    },
    {
      icon: Scale,
      title: "4. Limitations of Liability",
      content: (
        <>
          <p>
            RecallOS acts as a digital companion to organize content. Please note:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-muted-foreground">
            <li>The service is provided &quot;as is&quot; and &quot;as available&quot; without guarantees of uninterrupted operation.</li>
            <li>We are not responsible for API changes on Google/YouTube that may affect synchronization capabilities.</li>
            <li>Users remain entirely responsible for the learning decisions, actions, and projects they choose to pursue based on content surfaced by RecallOS.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Heart,
      title: "5. Intellectual Property",
      content: (
        <>
          <p>
            Respecting ownership is central to our platform:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-muted-foreground">
            <li>
              <strong>Your Content:</strong> You retain complete ownership, copyright, and metadata rights for all video lists, custom category names, and personal logs you import.
            </li>
            <li>
              <strong>RecallOS Materials:</strong> All interface designs, logos, wordmarks, source code, and custom algorithms remain the exclusive property of RecallOS.
            </li>
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
            If you have questions, feedback, or need clarification regarding these Terms of Service, please reach out to our team:
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
            <FileText className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-muted-foreground font-medium text-sm">
            Guidelines for using RecallOS.
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
