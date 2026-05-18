import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DynamicHeader } from "@/components/layout/dynamic-header"
import { ReclassifyButton } from "@/components/layout/reclassify-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { OnboardingProvider } from "@/components/onboarding/onboarding-context"
import { OnboardingTour } from "@/components/onboarding/onboarding-tour"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TooltipProvider>
      <OnboardingProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="bg-background text-foreground min-h-screen relative">
            <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border/40 bg-background/60 backdrop-blur-xl px-4 md:px-6 sticky top-0 z-50">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-surface" />
              <div className="w-full flex justify-between items-center gap-4">
                <DynamicHeader />
                <div className="flex items-center gap-2">
                  <ReclassifyButton />
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full transition-all duration-350 ease-out pb-24">
              {children}
            </main>
            <OnboardingTour />
          </SidebarInset>
        </SidebarProvider>
      </OnboardingProvider>
    </TooltipProvider>
  )
}
