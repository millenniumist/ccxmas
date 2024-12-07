import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key') 

export async function middleware(request) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const authToken = request.cookies.get('admin-token')
  // console.log(isAdminRoute,isLoginPage,authToken)
  if (isAdminRoute && !isLoginPage) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await jwtVerify(authToken.value, JWT_SECRET)
      return NextResponse.next()
    } catch (error) {
      request.cookies.delete('admin-token')
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
