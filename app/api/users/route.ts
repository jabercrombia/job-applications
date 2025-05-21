import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supbase-admin'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('resume_users')
    .select('*')
    .order('created_at', { ascending: false }) // optional sorting

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
