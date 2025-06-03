import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supbase-admin'

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get('key');
  const includeExpired = url.searchParams.get('includeExpired') === 'true';

  if (!key) {
    return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
  }

  const now = new Date().toISOString();

  let query = supabaseAdmin
    .from('job_entries')
    .select('id, title, description, expiration, category, created_at, job_posting_key')
    .eq('job_posting_key', key);

  if (!includeExpired) {
    // Filter to include only entries where expiration is null or in the future
    query = query.or(`expiration.gt.${now},expiration.is.null`);
  }

  // Since you expect a single entry by key, use .single()
  const { data, error } = await query.single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
