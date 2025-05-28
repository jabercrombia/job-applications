import { getJobDescriptionEntries } from "@/lib/api";
import TabsWrapper from "../../components/TabsWrapper";
interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PlatformPage({ params }: PageProps) {
  const { slug } = params;
  const entries = await getJobDescriptionEntries(slug);

  return (
    <div className="container mx-auto">
      <TabsWrapper entries={entries} slug={slug} />
    </div>
  );
}
