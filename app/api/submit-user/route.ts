import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supbase-admin'

export async function POST(req: Request) {
  const { firstName, lastName } = await req.json()

  if (!firstName || !lastName) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('resume_users').insert([{ firstName, lastName, email. phone, website, linkedIn }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
