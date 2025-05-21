'use client'

import { useEffect, useState } from 'react'
import dateFormat from '../../lib/dateformat'
import Link from 'next/link'

export default function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])



  return (
    <div className="container mx-auto">
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>LinkedIn</th>
            <th>Website</th>
            <th>PDF Path</th>
            <th>Created At</th>
          </tr>
        </thead>
        {users.map((
          user: {
            id:string, 
            firstName: string, 
            lastName: string, 
            email: string,
            phone: string,
            linkedIn: string,
            website: string,
            pdf_path: string,
            created_at: string,
          }) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.linkedIn && <Link href={user.linkedIn}>LinkedIn</Link>}</td>
            <td>{user.website && <Link href={user.website}>Website</Link>}</td>
            <td>{user.pdf_path && <Link href={user.pdf_path}>Download</Link>}</td>
            <td>{dateFormat(user.created_at)}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}
