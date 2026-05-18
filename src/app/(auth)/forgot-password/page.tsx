"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, MailCheck } from "lucide-react"
import { RecallOSLogo } from "@/components/ui/logo"
import { sendPasswordResetEmail } from "@/actions/auth"
import Link from "next/link"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Handle password recovery request submission
  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.warning("Please specify your email address first.")
      return
    }

    try {
      setIsLoading(true)
      toast.loading("Sending secure recovery instructions...", { id: "recovery-toast" })

      // Call our secure server action
      const result = await sendPasswordResetEmail(email.trim())

      if (result.error) {
        console.warn(`[Recovery UX] Reset rejected: ${result.error}`)
        toast.error(result.error, { id: "recovery-toast" })
      } else {
        setIsSuccess(true)
        toast.success("Recovery authorization sent! Please check your email inbox. ✉️", { id: "recovery-toast", duration: 5500 })
      }
    } catch (err: any) {
      console.error("[Recovery UX] Severe password reset runtime crash:", err)
      toast.error(err.message || "An unexpected error blocked your recovery request.", { id: "recovery-toast" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 relative overflow-hidden select-none">
      {/* Sleek background design details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md z-10 border-zinc-900/60 bg-zinc-900/40 backdrop-blur-xl text-zinc-100 shadow-[0_0_50px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-400">
        
        {isSuccess ? (
          <div className="p-8 space-y-6 text-center animate-in fade-in slide-in-from-bottom-3 duration-400">
            <div className="flex justify-center">
              <div className="p-4.5 rounded-full bg-indigo-950/20 border border-indigo-900/30 text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.05)]">
                <MailCheck className="w-12 h-12 animate-bounce" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold tracking-tight text-zinc-150">Reset link sent!</h3>
              <p className="text-zinc-450 text-xs font-semibold leading-relaxed">
                If an account matches <span className="text-indigo-400 font-bold">{email}</span>, a secure recovery email has been sent. 
                Follow the link inside to set up a brand new workspace authorization.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-900/60">
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center w-full px-4.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-extrabold shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                Back to Sign in
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePasswordRecovery}>
            <CardHeader className="space-y-1.5 text-center pt-8 pb-6 border-b border-zinc-900/40 bg-zinc-900/10">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                  <RecallOSLogo className="w-7 h-7" animate={true} />
                </div>
              </div>
              <CardTitle className="text-2xl font-extrabold tracking-tight text-zinc-100 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Recover Password
              </CardTitle>
              <CardDescription className="text-zinc-400 text-xs font-semibold">
                Provide your email address to receive password reset authorization
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 p-6 md:p-8">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-zinc-300">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-zinc-950/40 border-zinc-900/85 focus-visible:ring-indigo-500 text-zinc-100 placeholder:text-zinc-650 h-10 px-3.5 rounded-xl text-xs font-semibold transition-all focus:border-zinc-850"
                  required
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 px-6 md:px-8 pb-8 pt-2">
              <Button 
                type="submit"
                className="w-full bg-zinc-100 text-zinc-950 hover:bg-zinc-200 h-10 rounded-xl text-xs font-extrabold shadow-sm active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>

              <Link 
                href="/login" 
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-300 pt-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign in
              </Link>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}
