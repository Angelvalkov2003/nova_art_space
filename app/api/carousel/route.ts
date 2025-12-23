import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '../../lib/supabase';
import { getSupabaseServerClient } from '../../lib/auth';

// GET - Fetch all carousel slides
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('carousel_slides')
      .select('*')
      .order('position', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new carousel slide
export async function POST(request: NextRequest) {
  try {
    const supabaseAuth = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { image_url, link_url, position } = body;

    if (!image_url || !link_url) {
      return NextResponse.json(
        { error: 'Image URL and link URL are required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured. Please set SUPABASE_SERVICE_ROLE_KEY in .env.local' },
        { status: 500 }
      );
    }

    // Insert carousel slide using admin client (bypasses RLS)
    const { data: slide, error: slideError } = await supabaseAdmin
      .from('carousel_slides')
      .insert({
        image_url,
        link_url,
        position: position || 0,
      })
      .select()
      .single();

    if (slideError) {
      return NextResponse.json(
        { error: slideError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

