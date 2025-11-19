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

  if (!session || !session.user.email || !adminEmails.includes(session.user.email)) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login?message=Unauthorized access', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
