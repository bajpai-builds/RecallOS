import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUserCategories } from '@/lib/queries'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const categories = await getUserCategories(user.id)
    return NextResponse.json({ categories })
  } catch (error: any) {
    console.error("Categories API Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
