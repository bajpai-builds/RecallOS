"use server"

import prisma from "@/lib/db"
import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

/**
 * Log in a user with Email and Password
 * Automatically syncs the user profile with the local PostgreSQL database
 */
export async function loginWithEmail(email: string, password: string) {
  try {
    console.log(`[Auth Action] Attempting email login for: ${email}`)
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.warn(`[Auth Action] Login failed for ${email}: ${error.message}`)
      return { error: error.message }
    }

    if (data.user) {
      console.log(`[Auth Action] Login successful for ${email}. Syncing with Prisma DB.`)
      // Sync User profile in local DB
      await prisma.user.upsert({
        where: { id: data.user.id },
        update: { email: data.user.email! },
        create: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || null
        }
      })
    }

    return { success: true }
  } catch (err: any) {
    console.error(`[Auth Action] Login system crash:`, err)
    return { error: err.message || "An unexpected system error occurred during login." }
  }
}

/**
 * Register a new user with Email, Password, and Full Name
 * Instantly initializes their profile in PostgreSQL upon creation
 */
export async function signUpWithEmail(email: string, password: string, name: string) {
  try {
    console.log(`[Auth Action] Attempting signup for: ${email}`)
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })

    if (error) {
      console.warn(`[Auth Action] Signup failed for ${email}: ${error.message}`)
      return { error: error.message }
    }

    if (data.user) {
      console.log(`[Auth Action] Signup successful. Syncing profile in local Prisma DB.`)
      // Ensure we immediately create a profile in PostgreSQL
      await prisma.user.upsert({
        where: { id: data.user.id },
        update: { name },
        create: {
          id: data.user.id,
          email: data.user.email!,
          name
        }
      })
    }

    // Check if session exists (auto-login enabled) or if they need email confirmation
    const emailConfirmationRequired = !data.session
    return { success: true, emailConfirmationRequired }
  } catch (err: any) {
    console.error(`[Auth Action] Signup system crash:`, err)
    return { error: err.message || "An unexpected system error occurred during registration." }
  }
}

/**
 * Sign out the current user session
 */
export async function signOutUser() {
  try {
    console.log("[Auth Action] Processing signout request")
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.warn(`[Auth Action] Supabase signout error: ${error.message}`)
      return { error: error.message }
    }

    return { success: true }
  } catch (err: any) {
    console.error(`[Auth Action] Signout system crash:`, err)
    return { error: err.message || "An unexpected system error occurred during logout." }
  }
}

/**
 * Send password reset recovery link
 */
export async function sendPasswordResetEmail(email: string) {
  try {
    console.log(`[Auth Action] Triggering password recovery for: ${email}`)
    const supabase = await createClient()
    const originHeaders = await headers()
    const origin = originHeaders.get("origin") || "http://localhost:3000"

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/settings`
    })

    if (error) {
      console.warn(`[Auth Action] Reset password request failed for ${email}: ${error.message}`)
      return { error: error.message }
    }

    return { success: true }
  } catch (err: any) {
    console.error(`[Auth Action] Password reset system crash:`, err)
    return { error: err.message || "An unexpected system error occurred during password recovery." }
  }
}
