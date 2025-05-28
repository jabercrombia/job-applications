'use client'

import { useEffect, useState } from 'react'
import dateFormat from '../../../lib/dateformat'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";

export default function Home() {
  const params = useParams<{ slug: string }>()
  
  const [entries, setEntries] = useState<Array<{
    id: string;
    title: string;
    description: string;
    expiration: string;
    created_at?: string;
  }>>([]);

  useEffect(() => {
    const fetchEntry = async () => {
      const res = await fetch(`/api/job-entry?key=${params.slug}`);
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
         <Button>Apply</Button>

            </div>
          </div>

          <Markdown>{item.description}</Markdown>
          <p className="text-sm text-gray-500">Expiration: {dateFormat(item.expiration)}</p>
          <Link href={`/job/${item.id}`} className="text-blue-500 hover:underline">View Details</Link>
        </div>
      ))}
    </div>
  );
}
