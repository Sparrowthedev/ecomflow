import { NextResponse, type NextRequest } from 'next/server'
import { decrypt, encrypt } from './lib/lib';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (session && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard', request.url))
  }

  if (session && !request.nextUrl.pathname.startsWith('/')) {
    return Response.redirect(new URL('/dashboard', request.url))
  }

  if (!session && request.nextUrl.pathname.startsWith('/dashboard' || '/dashboard/payments')) {
    return Response.redirect(new URL('/', request.url))
  }

  if (session) {
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}