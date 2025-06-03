"use client";

import { useEffect, useState } from "react";
import ListingTable from "@/app/components/table/ListingTable";

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


  const columns = Object.keys(entries);

  console.log(columns);
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h1>Find Your Dream Job Today</h1>
        <p>Search job listings and find the perfect match for your career goals.</p>
      </div>
      <div className="flex w-full">
        <div className="w-1/6">
          <h2>Categories</h2>
          {entries.map((elem,index) => (
            <div key={index}>
            {elem.category}
            </div>
          ))}
        </div>
        <div className="w-5/6">
          <h2>Postings</h2>
          <ListingTable data={entries}/>
        </div>
      </div>
    </div>
  );
}
