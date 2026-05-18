"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { RecallOSLogo } from "@/components/ui/logo"
import { createClient } from "@/lib/supabase/client"
import { loginWithEmail } from "@/actions/auth"
import Link from "next/link"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Handle traditional credential login
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Simple client validation checks
    if (!email.trim() || !password.trim()) {
      toast.warning("Please provide both your email and password.")
      return
    }

    try {
      setIsLoading(true)
      toast.loading("Authenticating secure profile...", { id: "auth-toast" })

      // Call our secure server-side action
      const result = await loginWithEmail(email.trim(), password)

      if (result.error) {
        console.warn(`[Login UX] Authentication rejected: ${result.error}`)
        toast.error(result.error, { id: "auth-toast" })
      } else {
        toast.success("Welcome back! Loading companion workspace... ✨", { id: "auth-toast" })
        
        // Immediately navigate to client dashboard
        router.push("/")
        router.refresh()
      }
    } catch (err: any) {
      console.error("[Login UX] Severe authentication runtime crash:", err)
      toast.error(err.message || "An unexpected error blocked secure authentication.", { id: "auth-toast" })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle third-party Google OAuth
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      toast.loading("Initiating Google authentication...", { id: "auth-toast" })
      
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
        console.error('[Login UX] Google OAuth request failed:', error)
        toast.error(error.message, { id: "auth-toast" })
      }
    } catch (error: any) {
      console.error('[Login UX] Google login severe crash:', error)
      toast.error(error.message || "Could not link to Google Accounts.", { id: "auth-toast" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 relative overflow-hidden select-none">
      {/* Sleek digital overlay effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md z-10 border-border/60 bg-surface/40 backdrop-blur-xl text-foreground shadow-[0_0_50px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-400">
        <CardHeader className="space-y-1.5 text-center pt-8 pb-6 border-b border-border/40 bg-accent/10">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-2xl bg-surface border border-border shadow-[0_0_20px_rgba(255,255,255,0.02)]">
              <RecallOSLogo className="w-7 h-7" animate={true} />
            </div>
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Welcome back
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs font-semibold">
            Sign in to access your RecallOS memory companion
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleEmailSignIn}>
          <CardContent className="space-y-5 p-6 md:p-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold text-muted-foreground">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-background/40 border-border/85 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground h-10 px-3.5 rounded-xl text-xs font-semibold transition-all focus:border-border"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold text-muted-foreground">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-background/40 border-border/85 focus-visible:ring-primary text-foreground h-10 pl-3.5 pr-10 rounded-xl text-xs font-semibold transition-all focus:border-border"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 px-6 md:px-8 pb-8 pt-2">
            <Button 
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:opacity-90 h-10 rounded-xl text-xs font-extrabold shadow-sm active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            
            <div className="relative w-full py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-wider">
                <span className="bg-background/80 backdrop-blur px-3.5 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              type="button" 
              className="w-full border-border bg-surface/50 text-foreground hover:bg-surface-hover hover:text-foreground h-10 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg role="img" viewBox="0 0 24 24" className="mr-1 h-3.5 w-3.5 fill-current">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Google
            </Button>
            
            <div className="text-center text-xs font-semibold text-muted-foreground pt-2 select-none">
              Don&apos;t have an account?{" "}
              <Link 
                href="/signup" 
                className="text-primary hover:text-primary/80 font-bold transition-colors"
              >
                Create Account
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
