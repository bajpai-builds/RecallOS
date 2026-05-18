"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

function AuthCodeErrorContent() {
  const searchParams = useSearchParams()
  const errorMsg = searchParams.get("error") || "An unknown session authentication error occurred."

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md z-10 border-zinc-900/60 bg-zinc-900/40 backdrop-blur-xl text-zinc-100 shadow-[0_0_50px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-400">
        <CardHeader className="space-y-1.5 text-center pt-8 pb-6 border-b border-zinc-900/40 bg-zinc-900/10">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-900/30 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.02)]">
              <AlertCircle className="w-7 h-7" />
            </div>
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight text-zinc-150">
            Authentication Error
          </CardTitle>
          <CardDescription className="text-zinc-450 text-xs font-semibold">
            We could not securely establish your workspace session
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-6 md:p-8">
          <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-900/80 space-y-1.5">
            <p className="text-[10px] font-black uppercase tracking-wider text-zinc-550">Technical Details</p>
            <p className="text-xs font-bold text-rose-350/90 leading-relaxed font-mono break-words">
              {errorMsg}
            </p>
          </div>

          <p className="text-zinc-500 text-[11px] leading-relaxed font-medium text-center">
            This usually happens due to expired authorization codes, network timeouts, or un-whitelisted credentials. Please try signing in again.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 px-6 md:px-8 pb-8 pt-2">
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center w-full px-4.5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-extrabold shadow-sm active:scale-[0.98] transition-all cursor-pointer gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function AuthCodeErrorPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400 text-xs">
        Loading secure details...
      </div>
    }>
      <AuthCodeErrorContent />
    </Suspense>
  )
}
