import { createServerClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  const isAdmin = session?.user?.email && adminEmails.includes(session.user.email);

  // If the user is an admin and tries to access login or signup, redirect to admin page
  if (isAdmin && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // If the user is not an admin and tries to access an admin route, redirect to login
  if (!isAdmin && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login?message=Unauthorized access', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/signup'],
}
