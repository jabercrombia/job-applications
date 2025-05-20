'use client'

import { useState } from 'react'

export default function UploadPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [website, setWebsite] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedIn: '',
    website: '',
  });
  
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/submit-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName }),
    })

    const result = await res.json()

    if (res.ok) {
      setMessage('User saved!')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setLinkedIn('')
    } else {
      setMessage(`Error: ${result.error}`)
    }

    setLoading(false)
  }

  return (
    <>
      <div className='w-1/2'>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label>First Name</label>
          <input
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            name="email"
            type="text"
            value={formData.email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Phone</label>
          <input
            name="phone"
            type="text"
            value={formData.phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label>LinkedIn</label>
          <input
            name="linkedIn"
            type="text"
            value={formData.linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            required
          />
          <label>Website/Porfolio</label>
          <input
            name="website"
            type="text"
            value={formData.website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Submit'}
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </>
  )
}
