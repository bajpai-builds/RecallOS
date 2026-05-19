import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecallOS",
  description:
    "AI-powered content memory system for organizing and rediscovering saved YouTube content.",

  applicationName: "RecallOS",
  authors: [{ name: "RecallOS" }],
  metadataBase: new URL("https://recall-os-gamma.vercel.app"),

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  openGraph: {
    title: "RecallOS",
    description:
      "AI-powered content memory system for organizing and rediscovering saved YouTube content.",
    url: "https://recall-os-gamma.vercel.app",
    siteName: "RecallOS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary/30`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
