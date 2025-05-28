import { getJobDescriptionEntries } from "@/lib/api";
import TabsWrapper from "@/app/components/TabsWrapper";



interface PageParams {
  slug: string;
}

export default async function Page({ params }: { params: PageParams }) {
  const entries = await getJobDescriptionEntries(params.slug);

  // Ensure entries is an array
  const entriesArray = Array.isArray(entries) ? entries : [];

  // Transform entries to match the expected structure
  const formattedEntries = {
    jobDescriptionCollection: {
      items: entriesArray.map((entry: string, index: number) => ({
        description: entry,
        title: `Title ${index + 1}`,
        _id: index,
      })),
    },
  };

  // Optional: Debug log
  console.log("Entries fetched:", formattedEntries);

  return (
    <div>
      <TabsWrapper entries={formattedEntries} />
    </div>
  );
}
