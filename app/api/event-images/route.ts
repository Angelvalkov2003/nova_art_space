import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '../../lib/supabase';
import { getSupabaseServerClient } from '../../lib/auth';

// GET - Fetch all event images or filter by category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabase
      .from('event_images')
      .select('*');

    if (category) {
      query = query.eq('category', category);
    }

    query = query.order('category', { ascending: true })
      .order('position', { ascending: true });

    const { data, error } = await query;

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

// POST - Create new event image
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
    const { image_url, category, position } = body;

    if (!image_url || !category) {
      return NextResponse.json(
        { error: 'Image URL and category are required' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['koncert', 'kokteil', 'seminar', 'produkt'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: koncert, kokteil, seminar, produkt' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured. Please set SUPABASE_SERVICE_ROLE_KEY in .env.local' },
        { status: 500 }
      );
    }

    // Insert event image using admin client (bypasses RLS)
    const { data: eventImage, error: eventImageError } = await supabaseAdmin
      .from('event_images')
      .insert({
        image_url,
        category,
        position: position || 0,
      })
      .select()
      .single();

    if (eventImageError) {
      return NextResponse.json(
        { error: eventImageError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: eventImage });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

