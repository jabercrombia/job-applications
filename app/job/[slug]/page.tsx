import { getJobDescriptionEntries } from "@/lib/api";
import TabsWrapper from "../../components/TabsWrapper";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const entries = await getJobDescriptionEntries(params.slug);

  return <TabsWrapper entries={entries} slug={params.slug} />;
}
