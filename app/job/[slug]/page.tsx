import { getJobDescriptionEntries } from "@/lib/api";
import TabsWrapper from "@/app/components/TabsWrapper";



interface PageParams {
  slug: string;
}

export default async function Page({ params }: { params: PageParams }) {
  const entries = await getJobDescriptionEntries(params.slug);

  // Optional: Debug log
  console.log("Entries fetched:", entries);

  return (
    <div>
      <TabsWrapper entries={entries} />
    </div>
  );
}
