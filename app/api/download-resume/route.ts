import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supbase-admin'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const filePath = url.searchParams.get('path')

  if (!filePath) {
    return NextResponse.json({ error: 'Missing file path' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .storage
    .from('resume-uploads')
    .download(filePath)

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'File not found' }, { status: 404 })
  }

  const buffer = await data.arrayBuffer()

  return new NextResponse(Buffer.from(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filePath.split('/').pop()}"`,
    },
  })
}
