import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supbase-admin';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const includeExpired = url.searchParams.get('includeExpired') === 'true';

  const now = new Date().toISOString();

  let query = supabaseAdmin
    .from('categories')
    .select('category_name')
    .order('category_name', { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
