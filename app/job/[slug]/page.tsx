// app/job/[slug]/page.tsx

import { getJobDescriptionEntries } from "@/lib/api"
import Markdown from "react-markdown";
import NewUser from "../../components/NewUser";

interface PageProps {
  params: {
    slug: string
  }
}

export default async function PlatformPage({ params }: PageProps) {
  const { slug } = params
  console.log("slug", slug)

  const entries = await getJobDescriptionEntries(slug)
  console.log("entries", entries)

  return (
    <div className="container mx-auto text-center">
        {entries.map((entry) => (
          <div key={entry._id} className="p-4 m-2 border rounded">
            <h2 className="font-semibold">{entry.title}</h2>
            <Markdown>{entry.description}</Markdown>
            <NewUser jobTitle={slug} jobDescription={entry.description}/>
          </div>
        ))}
     
       
       
    </div>
  )
}
