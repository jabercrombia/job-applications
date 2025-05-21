import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supbase-admin'

// Enable edge-compatible streaming for multipart
export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const website = formData.get('website') as string
    const linkedIn = formData.get('linkedIn') as string
    const pdfFile = formData.get('pdf') as File

    if (!firstName || !lastName || !pdfFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Upload PDF to Supabase Storage (example)
    const arrayBuffer = await pdfFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const filePath = `resumes/${Date.now()}_${pdfFile.name}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from('resume-uploads')
      .upload(filePath, buffer, {
        contentType: pdfFile.type,
        upsert: true,
      })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Save user metadata + PDF path
    const { error: dbError } = await supabaseAdmin
      .from('resume_users')
      .insert([
        {
          firstName,
          lastName,
          email,
          phone,
          website,
          linkedIn,
          pdf_path: filePath,
        },
      ])

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
