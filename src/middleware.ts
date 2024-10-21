import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const isAuthenticated = checkAuth(request) // Implement this function based on your auth strategy
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth/login') || request.nextUrl.pathname.startsWith('/auth/register') || request.nextUrl.pathname.startsWith('/auth/verify-otp')

    if (!isAuthenticated && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

function checkAuth(request: NextRequest): boolean {
    // Implement your authentication check here
    // For example, check for a session token in cookies
    const token = request.cookies.get('refresh-token')
    console.log(token, 'token')
    return !!token
}