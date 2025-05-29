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
      const res = await fetch('/api/job-entries');
      const data = await res.json();
      setEntries(data);
    }

    fetchEntry();
  }, []);

  return (
    <div className="container mx-auto">
      {entries.map((item, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <div className='!grid !grid-cols-2 justify-between items-center mb-2'>
            <div>
              <h2 className="text-xl font-bold">{item.title}</h2>
            </div>
            <div>
              <Link href={`/job/${item.job_posting_key}`}><button className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button></Link>
            </div>
          </div>

          <p className="text-sm text-gray-500">Expiration: {new Date(item.expiration).toLocaleDateString()}</p>
          <a href={`/job/${item.id}`} className="text-blue-500 hover:underline">View Details</a>
        </div>
      ))}
    </div>
  );
}
