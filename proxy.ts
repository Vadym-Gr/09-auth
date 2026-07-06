import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  const hasAuthCookie =
    request.cookies.has('accessToken') || request.cookies.has('refreshToken');

  if (isPrivateRoute && !hasAuthCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicRoute && hasAuthCookie) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};