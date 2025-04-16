// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function middleware(request: NextRequest) {
  // Proxy API requests to backend
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.rewrite(new URL(request.nextUrl.pathname, BACKEND_URL));
  }
  return NextResponse.next();
}
