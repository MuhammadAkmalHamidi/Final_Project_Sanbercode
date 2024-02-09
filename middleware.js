import { NextResponse } from "next/server"

export function middleware(req) {
    const {pathname} = req.nextUrl
    const Cookies = !!req.cookies.get('token')
    const isLoginPage = pathname.startsWith('/login')
    const isRegisterPage = pathname.startsWith('/register')
    const isResetPassword = pathname.startsWith('/forgot-password')

    if (!Cookies) {
        if (!isLoginPage && !isRegisterPage && !isResetPassword) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    } else {
        
        if (isLoginPage || isRegisterPage || isResetPassword) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
}
export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)"
}