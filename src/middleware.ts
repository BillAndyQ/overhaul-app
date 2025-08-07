// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './utils/auth';
import { generateToken } from './utils/auth';
import { generateProtectedRoutes } from './utils/endpoints';
import { PATH_FRONT } from './utils/endpoints';

interface TokenPayload {
  userId: string;
  username: string;
  role: string;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const dinamycPaths = generateProtectedRoutes(PATH_FRONT)

 /// Definir rutas protegidas y los roles permitidos
  const protectedRoutes = {
    '/': ['gerente', 'admin', 'contador', 'inspector'],
    '/dashboard': ['admin', 'contador', 'inspector'],
    ...dinamycPaths
  };

  console.log();
  

  // Verificar si la ruta está protegida
  const matchedRoute = Object.keys(protectedRoutes).find((route) => pathname.startsWith(route));
  if (matchedRoute) {
    const token = request.cookies.get('token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!token) {
      if (!refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const payload = await verifyToken(refreshToken);
      if (!payload) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Generar nuevo access token
      const typedPayload: TokenPayload = {
        userId: String(payload.userId),
        username: String(payload.username),
        role: String(payload.role),
      };

      // Generar nuevo access token
      const newAccessToken = await generateToken({
        userId: typedPayload.userId,
        username: typedPayload.username,
        role: typedPayload.role,
      });

      const response = NextResponse.next();
      response.cookies.set('token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/',
        sameSite: 'strict',
      });

      // Verificar rol
      if (!protectedRoutes[matchedRoute].includes(payload.role)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user', JSON.stringify(payload));
      return response;
    }

    const payload = await verifyToken(token);
    if (!payload) {
      if (!refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const refreshPayload = await verifyToken(refreshToken);
      if (!refreshPayload) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const typedPayload: TokenPayload = {
        userId: String(payload.userId),
        username: String(payload.username),
        role: String(payload.role),
      };

      // Generar nuevo access token
      const newAccessToken = await generateToken({
        userId: typedPayload.userId,
        username: typedPayload.username,
        role: typedPayload.role,
      });

      const response = NextResponse.next();
      response.cookies.set('token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/',
        sameSite: 'strict',
      });

      // Verificar rol
      if (!protectedRoutes[matchedRoute].includes(refreshPayload.role)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user', JSON.stringify(refreshPayload));
      return response;
    }

    // Verificar rol
    if (!protectedRoutes[matchedRoute].includes(payload.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user', JSON.stringify(payload));
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/ot-personas/:path*',
    '/ot-equipos/:path*',
    '/facturas/:path*',
    '/compras/:path*',
    '/empresas/:path*',
    '/cursos/:path*',
    '/users/:path*',
    '/api/:path*',
  ],
};
