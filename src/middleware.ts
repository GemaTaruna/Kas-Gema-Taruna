import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const isSupabaseConfigured =
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project.supabase.co') &&
    supabaseAnonKey.length > 20 &&
    supabaseAnonKey !== 'your-anon-key-here'

  let user = null

  if (isSupabaseConfigured) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      })
      const { data } = await supabase.auth.getUser()
      user = data.user
    } catch {
      // Fallback to cookie session if network/Supabase fails
    }
  }

  const demoRole = request.cookies.get('kgt_session_role')?.value
  const isAuthenticated = Boolean(user || demoRole)

  // Redirect unauthenticated users to login
  if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from login
  if (isAuthenticated && request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    if (demoRole === 'anggota') {
      url.pathname = '/transparansi'
    } else {
      url.pathname = '/dashboard'
    }
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
