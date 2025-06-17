'use client'

import { useEffect, useState } from 'react'
import dateFormat from '@/lib/dateformat';
import Link from 'next/link'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import '../../../styles/components/table.scss';

const categories = ['first name', 'last name', 'email', 'phone', 'linkedIn', 'website', 'resume', 'match score', 'submitted at'];

export default function Home() {
  const [users, setUsers] = useState<Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    linkedIn: string;
    website: string;
    pdf_path: string;
    match_score: number;
    created_at: string;
  }>>([]);

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'firstName',
    direction: 'desc',
  });

  const handleSort = (column: string) => {
    setSortConfig((prev) => ({
      key: column,
      direction: prev.key === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  console.log(users)
  

  const sortedUsers = [...users].sort((a, b) => {
    const { key, direction } = sortConfig;
    const aVal = a[key as keyof typeof a] ?? '';
    const bVal = b[key as keyof typeof b] ?? '';
  
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
  
    return 0;
  });

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
      <h1>Applications</h1>
      <TableContainer className='border-solid border-1 border-gray-300'>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead className='uppercase'>
          <TableRow>
            {categories.map((category) => (
              <TableCell
                key={category}
                sortDirection={sortConfig.key === category ? sortConfig.direction : false}
              >
                <TableSortLabel
                  active={sortConfig.key === category}
                  direction={sortConfig.key === category ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort(category)}
                >
                  {category}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
          </TableHead>
          <TableBody>
        
          {sortedUsers.map((
            user: {
              id:string, 
              firstName: string, 
              lastName: string, 
              email: string,
              phone: string,
              linkedIn: string,
              website: string,
              pdf_path: string,
              match_score: number,
              created_at: string,
            }) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell><Link href={``}>{user.email}</Link></TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.linkedIn && <Link href={user.linkedIn}>LinkedIn</Link>}</TableCell>
              <TableCell>{user.website && <Link href={user.website}>Website</Link>}</TableCell>
              <TableCell>{user.pdf_path && <Link href={`/api/download-resume?path=${user.pdf_path}`}>Download</Link>}</TableCell>
              <TableCell>{user.match_score}</TableCell>
              <TableCell>{dateFormat(user.created_at)}</TableCell>
            </TableRow>
          ))}
    
          </TableBody>
        </Table>
    </TableContainer>
      
    </div>
  )
}
