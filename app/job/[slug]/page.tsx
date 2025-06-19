// ✅ File: app/job/[slug]/page.tsx

import { getJobDataByPostingKey } from '@/lib/jobs';
import JobClient from './JobClient';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const job = await getJobDataByPostingKey(params.slug);

  return {
    title: `${job.title} – Job Portal`,
    description: `Apply for ${job.title} in the ${job.category} category.`,
  };
}

export default function JobPage() {
  return <JobClient />;
}
