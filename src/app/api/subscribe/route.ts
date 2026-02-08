import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, notification_method, interested_in } = body;

    // At least one contact method is required
    if (!email && !phone) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing contact information',
          details: 'Please provide at least email or phone number' 
        },
        { status: 400 }
      );
    }

    // Email validation (if provided)
    if (email) {
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

    // Check if already subscribed
    if (email) {
      const { data: existingEmail } = await supabase
        .from('subscribers')
        .select('id, status')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (existingEmail) {
        if (existingEmail.status === 'active') {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Already subscribed',
              details: 'This email is already subscribed' 
            },
            { status: 409 }
          );
        }
      }
    }

    if (phone) {
      const { data: existingPhone } = await supabase
        .from('subscribers')
        .select('id, status')
        .eq('phone', phone.trim())
        .single();

      if (existingPhone) {
        if (existingPhone.status === 'active') {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Already subscribed',
              details: 'This phone number is already subscribed' 
            },
            { status: 409 }
          );
        }
      }
    }

    // Insert into database
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        {
          name: name ? name.trim() : null,
          email: email ? email.trim().toLowerCase() : null,
          phone: phone ? phone.trim() : null,
          notification_method: notification_method || 'email',
          interested_in: interested_in || null,
          status: 'active',
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      
      // Handle unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Already subscribed',
            details: 'This email or phone is already in our list' 
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to subscribe',
          details: error.message 
        },
        { status: 500 }
      );
    }

    // Send welcome email (non-blocking)
    if (email) {
      sendWelcomeEmail(email.trim()).catch(err => {
        console.error('Welcome email failed:', err);
        // Don't fail the API call if email fails
      });
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Subscribed successfully!',
        data: {
          id: data.id,
          subscribed_at: data.subscribed_at
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Subscribe API error:', error);
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

// GET method to retrieve subscribers (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';
    const limit = parseInt(searchParams.get('limit') || '100');

    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('status', status)
      .order('subscribed_at', { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to fetch subscribers',
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
    console.error('Subscribe GET API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// DELETE method to unsubscribe
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    if (!email && !phone) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing identifier',
          details: 'Please provide email or phone to unsubscribe' 
        },
        { status: 400 }
      );
    }

    let query = supabase
      .from('subscribers')
      .update({ 
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      });

    if (email) {
      query = query.eq('email', email.toLowerCase());
    } else if (phone) {
      query = query.eq('phone', phone);
    }

    const { data, error } = await query.select().single();

    if (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to unsubscribe',
          details: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Unsubscribed successfully',
        data: {
          id: data.id,
          unsubscribed_at: data.unsubscribed_at
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unsubscribe API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
