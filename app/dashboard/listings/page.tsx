"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [entries, setEntries] = useState<Array<{
    id: string;
    title: string;
    expiration: string;
    created_at?: string;
    job_posting_key?: string;
  }>>([]);

  useEffect(() => {
    const fetchEntry = async () => {
      const res = await fetch('/api/job-entries?includeExpired=true');
      const data = await res.json();
      setEntries(data);
    }

    fetchEntry();
  }, []);

  return (
    <div className="container mx-auto">
      <h1>Listings</h1>
      {entries.map((item, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <div className='flex justify-between items-center mb-2'>
            <div>
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p>{new Date(item.expiration) < new Date() ? 'Expired' : `Expiration: ${new Date(item.expiration).toLocaleDateString()}`}</p>
              <Link href={`/job/${item.job_posting_key}`}>Go to Post</Link>
            </div>
            <div>
              <Link href={`/dashboard/edit-entry/${item.job_posting_key}`}>Edit</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
