import { getJobDescriptionEntries } from "@/lib/api";
import TabsWrapper from "../../components/TabsWrapper"; // Adjust if path differs

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const entries = await getJobDescriptionEntries(params.slug);

  return (
    <div>
      <TabsWrapper entries={entries} slug={params.slug} />
    </div>
  );
}
