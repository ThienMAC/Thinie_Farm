import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test connection by querying site_stats table
    const { data, error } = await supabase
      .from('site_stats')
      .select('*')
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        hint: 'Make sure you have run the SQL migration in Supabase dashboard'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: '🎉 Supabase connection successful!',
      connected: true,
      dataReceived: !!data,
      recordsCount: data?.length || 0
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      hint: 'Check your .env.local file and make sure Supabase credentials are correct'
    }, { status: 500 });
  }
}
