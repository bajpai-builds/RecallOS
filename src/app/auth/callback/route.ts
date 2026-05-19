import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  console.log(`[OAuth Callback] Received callback request. Code present: ${!!code}, Target redirect: "${next}"`)

  if (code) {
    try {
      const supabase = await createClient()
      const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('[OAuth Callback] Code-to-session exchange rejected by Supabase:', error.message)
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent(error.message)}`)
      }

      if (session) {
        console.log(`[OAuth Callback] Session established for user: ${session.user.email}. Syncing OAuth credentials.`)
        
        // --- TEMPORARY DEBUGGING ---
        console.log(`[OAuth Callback DEBUG] provider_token exists: ${!!session.provider_token}`)
        console.log(`[OAuth Callback DEBUG] provider_refresh_token exists: ${!!session.provider_refresh_token}`)
        console.log(`[OAuth Callback DEBUG] session.user.app_metadata:`, JSON.stringify(session.user.app_metadata))
        // ---------------------------

        // Upsert User in Prisma to save the OAuth tokens
        await prisma.user.upsert({
          where: { id: session.user.id },
          update: {
            email: session.user.email!,
            providerToken: session.provider_token || null,
            providerRefreshToken: session.provider_refresh_token || null,
            name: session.user.user_metadata?.name || null
          },
          create: {
            id: session.user.id,
            email: session.user.email!,
            providerToken: session.provider_token || null,
            providerRefreshToken: session.provider_refresh_token || null,
            name: session.user.user_metadata?.name || null
          }
        })

        console.log(`[OAuth Callback] Prisma DB profile synced successfully. Redirecting to target dashboard view.`)

        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'
        
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`)
        } else {
          return NextResponse.redirect(`${origin}${next}`)
        }
      }
    } catch (dbErr: any) {
      console.error('[OAuth Callback] Failed to complete database profile sync:', dbErr)
      return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent("Database profile synchronization failure. " + dbErr.message)}`)
    }
  }

  console.warn('[OAuth Callback] Authentication code parameter missing from URL query.')
  return NextResponse.redirect(`${origin}/auth/auth-code-error?error=Missing+authorization+code`)
}
