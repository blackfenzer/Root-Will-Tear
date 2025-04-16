// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function middleware(request: NextRequest) {
  // Proxy API requests to backend
  if (request.nextUrl.pathname.startsWith('/api')) {
    const allCookies = request.cookies.getAll();
    console.log('this is cookie', allCookies);

    // Create a new headers object
    const headers = new Headers(request.headers);

    // Set cookies properly in the header
    // We need to use a single Cookie header with all cookies joined by semicolons
    if (allCookies.length > 0) {
      const cookieString = allCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ');
      headers.set('Cookie', cookieString);
    }

    // Create the URL to rewrite to
    const url = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      BACKEND_URL
    );

    // Create and return the response with the headers
    const tmp = NextResponse.rewrite(url, {
      request: {
        headers
      }
    });
    console.log(tmp);
    return tmp;
  }
}

export const config = {
  matcher: '/api/:path*'
};
