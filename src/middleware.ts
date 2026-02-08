import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if it's an admin route (but not login)
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin-auth');
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
