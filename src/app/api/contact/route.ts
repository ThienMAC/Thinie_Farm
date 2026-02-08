import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, subject } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          details: 'Name, email, and message are required' 
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Phone validation (if provided)
    if (phone) {
      const phoneRegex = /^[0-9]{10,11}$/;
      const cleanPhone = phone.replace(/\s+/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid phone format',
            details: 'Phone must be 10-11 digits' 
          },
          { status: 400 }
        );
      }
    }

    // Message length validation
    if (message.length < 10) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Message too short',
          details: 'Message must be at least 10 characters' 
        },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : null,
          message: message.trim(),
          subject: subject ? subject.trim() : null,
          status: 'new',
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to save message',
          details: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!',
        data: {
          id: data.id,
          created_at: data.created_at
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET method to retrieve messages (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'new';
    const limit = parseInt(searchParams.get('limit') || '50');

    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to fetch messages',
          details: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data,
        count: data.length 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact GET API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
