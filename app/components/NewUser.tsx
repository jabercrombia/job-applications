'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import '../../styles/components/form.scss';

export default function UploadPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedIn: '',
    website: '',
  })
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

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })
    if (pdfFile) {
      data.append('pdf', pdfFile)
    }



    const res = await fetch('/api/submit-user', {
      method: 'POST',
      body: data,     // <--- use data, not formData
      // @ts-expect-error duplex required for Node.js fetch with streaming body
      duplex: 'half',
    })
    
    

    let result = {}
    try {
      const text = await res.text()
      result = text ? JSON.parse(text) : {}
    } catch {
      result = { error: 'Invalid server response' }
    }

    if (res.ok) {
      setMessage('User saved!')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedIn: '',
        website: '',
      })
      setPdfFile(null)
    } else {
      setMessage(`Error: ${result['error'] || 'Unknown error'}`)
    }

    setLoading(false)
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6">
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
    </div>
  )
}
