'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UploadPage(data:{ jobDescription: string; jobTitle: string, jobCategory: string }) {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedIn: '',
    website: '',
    jobDescription: data.jobDescription,
    title: data.jobTitle,
    category: data.jobCategory,
  })

  console.log('formData', formData);
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdfFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const formPayload = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value)
    })
    if (pdfFile) {
      formPayload.append('pdf', pdfFile)
    }

    console.log('formPayload', formPayload);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PDF_SCAN_URL}/scan`, {
        method: 'POST',
        body: formPayload,
      })
  
      const data = await res.json()
  
      if (res.ok) {
        setMessage(`Thank you`)
      } else {
        setMessage(`Error: ${data.error || 'Failed to scan'}`)
      }
    } catch (err) {
      console.error(err)
      setMessage('Unexpected error')
    }

    setLoading(false)
  }

  return (

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} type="email" />
        <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange}  />
        <Input name="linkedIn" placeholder="LinkedIn" value={formData.linkedIn} onChange={handleChange} />
        <Input name="website" placeholder="Website/Portfolio" value={formData.website} onChange={handleChange} />
        <Input type="file" accept="application/pdf" onChange={handleFileChange} required />
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Submit'}
        </Button>
        {message && <p>{message}</p>}
      </form>
  )
}
