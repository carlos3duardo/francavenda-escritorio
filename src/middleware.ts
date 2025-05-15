import { NextResponse } from 'next/server';
import type { MiddlewareConfig, NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { differenceInSeconds, fromUnixTime, getUnixTime } from 'date-fns';

const publicRoutes = [
  {
    path: '/senha/esqueci',
    whenAuthenticated: 'next',
  },
  {
    path: '/senha/redefinir',
    whenAuthenticated: 'next',
  },
  {
    path: '/auth/token',
    whenAuthenticated: 'next',
  },
  {
    path: '/adesao/:id',
    whenAuthenticated: 'next',
  },
  {
    path: '/esqueci-minha-senha',
    whenAuthenticated: 'next',
  },
  {
    path: '/redefinir-senha',
    whenAuthenticated: 'next',
  },
  {
    path: '/renovar-senha',
    whenAuthenticated: 'next',
  },
  {
    path: '/order/:id/retry-payment',
    whenAuthenticated: 'next',
  },
  {
    path: '/entrar',
    whenAuthenticated: 'redirect',
  },
] as const;

const SIGNIN_ROUTE = '/entrar';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicRoute = publicRoutes.find((route) => {
    const routeRegex = new RegExp(
      '^' + route.path.replace(/:[^/]+/g, '[^/]+') + '$',
    );
    return routeRegex.test(path);
  });

  const accessToken = request.cookies.get('frv:token');

  if (!accessToken && publicRoute) {
    return NextResponse.next();
  }

  if (!accessToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    if (redirectUrl.pathname !== '/') {
      const redirectAfterLogin = redirectUrl.pathname + redirectUrl.search;

      redirectUrl.search = new URLSearchParams({
        redirectTo: redirectAfterLogin,
      }).toString();
    }

    redirectUrl.pathname = SIGNIN_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (
    accessToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = '/';

    if (request.nextUrl.searchParams.has('invalidToken')) {
      const response = NextResponse.redirect(redirectUrl);

      response.cookies.delete('frv:token');
      response.cookies.delete('frv:refreshToken');

      return response;
    }

    return NextResponse.redirect(redirectUrl);
  }

  if (accessToken && !publicRoute) {
    const decodedToken = jwtDecode(accessToken.value);

    const exp = fromUnixTime(decodedToken.exp || getUnixTime(new Date()));
    const now = fromUnixTime(getUnixTime(new Date()));
    const diff = differenceInSeconds(exp, now);

    if (diff <= 0) {
      console.error('### Error: AccessToken has expired! ###');

      request.cookies.delete('frv:token');
      request.cookies.delete('frv:refreshToken');

      const redirectUrl = request.nextUrl.clone();

      redirectUrl.pathname = SIGNIN_ROUTE;

      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|sitemap.xml|robots.txt).*)',
  ],
};
