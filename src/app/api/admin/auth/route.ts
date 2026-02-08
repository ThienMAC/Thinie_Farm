import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      // Set cookie using cookies() helper
      const cookieStore = await cookies();
      cookieStore.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });
      
      return NextResponse.json({ 
        success: true,
        message: 'Login successful'
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Delete cookie using cookies() helper
  const cookieStore = await cookies();
  cookieStore.delete('admin-auth');
  
  return NextResponse.json({ 
    success: true,
    message: 'Logged out'
  });
}
