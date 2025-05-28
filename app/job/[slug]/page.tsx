import { getJobDescriptionEntries } from "@/lib/api";
import TabsWrapper from "@/app/components/TabsWrapper";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const entries = await getJobDescriptionEntries(params.slug);

  // Optional: Debug log
  console.log("Entries fetched:", entries);

  return (
    <div>
      <TabsWrapper entries={entries} slug={params.slug} />
    </div>
  );
}
