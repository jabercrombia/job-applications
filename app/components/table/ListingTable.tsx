import { Button } from "@/components/ui/button";
import Link from "next/link";
import { daysLeftToExpiration } from "@/lib/dateformat";

type JobEntry = {
    title: string;
    expiration: string;
    category: string;
    job_posting_key?: string;
  };
  
  type TableProps = {
    data: JobEntry[];
  };


  export default function Table({ data }: TableProps) {
    return (
      <div>
        {data.map((entry, i) => (
          <div key={i} className="flex justify-between my-4">
            <div>
                <h2 className="py-[0px]">{entry.title}</h2>
                {entry.category && <p className="text-sm">{entry.category}</p>}
            </div>
            <div className="text-right space-y-1">
                <Link href={`/job/${entry.job_posting_key}`}><Button>Apply</Button></Link>
                <p className="text-right text-sm">{daysLeftToExpiration(entry.expiration)}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  