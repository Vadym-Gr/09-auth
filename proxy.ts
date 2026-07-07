import { NextRequest, NextResponse } from 'next/server';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

function applySetCookie(response: NextResponse, setCookie?: string | string[]) {
  if (!setCookie) return;

  const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

  cookies.forEach((cookie) => {
    response.headers.append('Set-Cookie', cookie);
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  let isAuthenticated = Boolean(accessToken);
  let setCookieHeader: string | string[] | undefined;

  if (!accessToken && refreshToken) {
    try {
      const cookieHeader = request.cookies.toString();
      const response = await checkSession(cookieHeader);

      isAuthenticated = Boolean(response.data);
      setCookieHeader = response.headers['set-cookie'];
    } catch {
      isAuthenticated = false;
    }
  }

  if (isPrivateRoute && !isAuthenticated) {
    const response = NextResponse.redirect(new URL('/sign-in', request.url));
    applySetCookie(response, setCookieHeader);
    return response;
  }

  if (isPublicRoute && isAuthenticated) {
    const response = NextResponse.redirect(new URL('/', request.url));
    applySetCookie(response, setCookieHeader);
    return response;
  }

  const response = NextResponse.next();
  applySetCookie(response, setCookieHeader);
  return response;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};