import { NextResponse, type NextRequest } from 'next/server'

const STUDENT_ALLOWED_PATHS = ['/login', '/transparansi', '/portal/ringkasan', '/portal/iuran']

export async function middleware(request: NextRequest) {
  const sessionRole = request.cookies.get('kgt_session_role')?.value
  const pathname = request.nextUrl.pathname

  // Unauthenticated users -> redirect to /login
  if (!sessionRole && !pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Siswa (Read-Only mode) -> restrict only to transparency & student portal routes
  if (sessionRole === 'siswa') {
    const isAllowed = STUDENT_ALLOWED_PATHS.some((p) => pathname.startsWith(p))
    if (!isAllowed) {
      const url = request.nextUrl.clone()
      url.pathname = '/transparansi'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next({ request })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.png|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
