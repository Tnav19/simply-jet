import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isChrome = /Chrome/.test(userAgent);

  if (!isChrome) {
    return NextResponse.redirect(new URL('/error', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
