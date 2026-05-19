"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, MailCheck, AlertTriangle } from "lucide-react"
import { RecallOSLogo } from "@/components/ui/logo"
import { createClient } from "@/lib/supabase/client"
import { signUpWithEmail } from "@/actions/auth"
import Link from "next/link"
import { toast } from "sonner"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [emailConfirmNeeded, setEmailConfirmNeeded] = useState(false)
  const [warningMessage, setWarningMessage] = useState("")

  const router = useRouter()
  const supabase = createClient()

  // Handle email registration submission
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setWarningMessage("")

    // 1. Inputs validation check
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.warning("All input fields are required.")
      return
    }

    if (password.length < 6) {
      setWarningMessage("Password must be at least 6 characters long.")
      toast.warning("Password length invalid.")
      return
    }

    if (password !== confirmPassword) {
      setWarningMessage("Passwords do not match.")
      toast.warning("Passwords mismatch.")
      return
    }

    try {
      setIsLoading(true)
      toast.loading("Provisioning your secure space...", { id: "signup-toast" })

      // Call our secure server action
      const result = await signUpWithEmail(email.trim(), password, name.trim())

      if (result.error) {
        console.warn(`[Signup UX] Signup rejected: ${result.error}`)
        toast.error(result.error, { id: "signup-toast" })
      } else {
        setIsSuccess(true)
        if (result.emailConfirmationRequired) {
          setEmailConfirmNeeded(true)
          toast.success("Account created successfully! Check your inbox to verify your email. ✉️", { id: "signup-toast", duration: 6000 })
        } else {
          toast.success("Account created successfully! Entering companion workspace... ✨", { id: "signup-toast" })
          // Automatically navigate
          router.push("/dashboard")
          router.refresh()
        }
      }
    } catch (err: any) {
      console.error("[Signup UX] Severe signup runtime crash:", err)
      toast.error(err.message || "An unexpected error occurred during account creation.", { id: "signup-toast" })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google OAuth
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      toast.loading("Initiating Google sign up...", { id: "signup-toast" })

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'openid email profile https://www.googleapis.com/auth/youtube.readonly',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error('[Signup UX] Google OAuth signup failed:', error)
        toast.error(error.message, { id: "signup-toast" })
      }
    } catch (error: any) {
      console.error('[Signup UX] Google signup severe crash:', error)
      toast.error(error.message || "Could not link to Google Accounts.", { id: "signup-toast" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 relative overflow-hidden select-none">
      {/* Visual background aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md z-10 border-zinc-900/60 bg-zinc-900/40 backdrop-blur-xl text-zinc-100 shadow-[0_0_50px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-400">
        
        {/* SUCCESS EMAIL CONFIRM STATE */}
        {isSuccess && emailConfirmNeeded ? (
          <div className="p-8 space-y-6 text-center animate-in fade-in slide-in-from-bottom-3 duration-400">
            <div className="flex justify-center">
              <div className="p-4.5 rounded-full bg-indigo-950/20 border border-indigo-900/30 text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.05)]">
                <MailCheck className="w-12 h-12 animate-bounce" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold tracking-tight text-zinc-150">Verify your email address</h3>
              <p className="text-zinc-450 text-xs font-semibold leading-relaxed">
                We have sent a secure authorization link to <span className="text-indigo-400 font-bold">{email}</span>. 
                Please click the link in your inbox to verify your profile and enter the companion dashboard.
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
          <form onSubmit={handleEmailSignUp}>
            <CardHeader className="space-y-1.5 text-center pt-8 pb-5 border-b border-zinc-900/40 bg-zinc-900/10">
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                  <RecallOSLogo className="w-7 h-7" animate={true} />
                </div>
              </div>
              <CardTitle className="text-2xl font-extrabold tracking-tight text-zinc-100 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Create Account
              </CardTitle>
              <CardDescription className="text-zinc-400 text-xs font-semibold">
                Set up your profile to start tracking your dynamic RecallOS memory companion
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 p-6 md:p-8">
              
              {/* WARNING BOX */}
              {warningMessage && (
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl border border-rose-500/20 bg-rose-950/10 text-rose-400 text-xs font-bold animate-in slide-in-from-top-2 duration-300">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {warningMessage}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-bold text-zinc-300">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="bg-zinc-950/40 border-zinc-900/85 focus-visible:ring-indigo-500 text-zinc-100 placeholder:text-zinc-650 h-9.5 px-3.5 rounded-xl text-xs font-semibold transition-all focus:border-zinc-850"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold text-zinc-300">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-zinc-950/40 border-zinc-900/85 focus-visible:ring-indigo-500 text-zinc-100 placeholder:text-zinc-650 h-9.5 px-3.5 rounded-xl text-xs font-semibold transition-all focus:border-zinc-850"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-bold text-zinc-300">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="bg-zinc-950/40 border-zinc-900/85 focus-visible:ring-indigo-500 text-zinc-100 h-9.5 pl-3.5 pr-9 rounded-xl text-xs font-semibold transition-all focus:border-zinc-850"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-450 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-bold text-zinc-300">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-zinc-950/40 border-zinc-900/85 focus-visible:ring-indigo-500 text-zinc-100 h-9.5 px-3.5 rounded-xl text-xs font-semibold transition-all focus:border-zinc-850"
                    required
                  />
                </div>
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
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="relative w-full py-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-900/60" />
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-wider">
                  <span className="bg-zinc-950 px-3.5 text-zinc-550">
                    Or register with
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                type="button" 
                className="w-full border-zinc-900 bg-zinc-900/10 text-zinc-300 hover:bg-zinc-900/30 hover:text-zinc-100 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg role="img" viewBox="0 0 24 24" className="mr-1 h-3.5 w-3.5 fill-current">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google
              </Button>

              <div className="text-center text-xs font-semibold text-zinc-500 pt-2 select-none">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-indigo-400 hover:text-indigo-350 font-bold transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}
