// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function middleware(request: NextRequest) {
  // Proxy API requests to backend
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Create the URL to rewrite to
    const url = new URL(request.nextUrl.pathname, BACKEND_URL);

    // Preserve query parameters if any
    url.search = request.nextUrl.search;

    // Create a new headers object from the request
    const headers = new Headers(request.headers);

    // Handle cookies explicitly
    const requestCookies = request.cookies.getAll();
    if (requestCookies.length > 0) {
      // Format cookies as a single string with all cookies
      const cookieString = requestCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ');

      // Set the cookie header
      headers.set('cookie', cookieString);
    }

    // Create the rewrite response with our modified headers
    return NextResponse.rewrite(url, {
      request: {
        headers: headers
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*'
};
