import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supbase-admin'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const key = url.searchParams.get('key')

  const { data, error } = await supabaseAdmin
    .from('job_entries')
    .select('title, description, expiration, created_at, expiration')
    .eq('job_posting_key', key)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
