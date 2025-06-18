"use client";

import { useEffect, useState } from "react";
import ListingTable from "@/app/components/table/ListingTable";
import Link from "next/link";
import Loader from "./components/ux/loader";

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  const [entries, setEntries] = useState<Array<{
    id: string;
    title: string;
    category: string;
    expiration: string;
    created_at?: string;
    job_posting_key?: string;
  }>>([]);

    useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await fetch('/api/job-entries');
        const data = await res.json();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching job entries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, []);




  const categoryCounts: { [key: string]: number } = {};

  entries.forEach((elem) => {
    if (categoryCounts[elem.category]){
      categoryCounts[elem.category] = categoryCounts[elem.category]+=1 ;
    } 
    else {
      categoryCounts[elem.category] = 1;
    }
  });

  return (
    <div className="container mx-auto px-4">
      <div className="text-center">
        <h1>Find Your Dream Job Today</h1>
        <p>Search job listings and find the perfect match for your career goals.</p>
      </div>
      { isLoading ? ( <Loader size={32} className="h-40" />) : (

        <div className="flex flex-wrap w-full">
          <div className="w-full md:w-1/6">
            <h2>Categories</h2>
            {Object.entries(categoryCounts).map(([category,count],index)=>(
              <div key={index}><Link href={`#${category}`} className="capitalize">{category} ({count})</Link></div>
            ))}
          </div>
          <div className="w-full md:w-5/6 ">
            <h2 className="text-xl pb-4">Postings</h2>
            <ListingTable data={entries}/>
          </div>
        </div>
      ) }

    </div>
  );
}
