import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supbase-admin'

export async function GET() {


  const { data, error } = await supabaseAdmin
    .from('job_entries')
    .select('title, description, expiration, created_at, job_posting_key')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
