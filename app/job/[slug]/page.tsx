import { getJobDescriptionEntries } from "@/lib/api";
import TabsWrapper from "../../components/TabsWrapper";

export default async function Page({ params }: { params: { slug: string } }) {
  const entries = await getJobDescriptionEntries(params.slug);

  return <TabsWrapper entries={entries} slug={params.slug} />;
}
