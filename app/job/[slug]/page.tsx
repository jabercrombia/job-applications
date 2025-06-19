import { getJobDataByPostingKey } from '@/lib/jobs';
import JobClient from './JobClient';


export const metadata = {
  title: "Job Portal - Apply",
};
// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   const job = await getJobDataByPostingKey(params.slug);

//   return {
//     title: `${job.title} – Job Portal`,
//     description: `Apply for ${job.title} in the ${job.category} category.`,
//     openGraph: {
//       title: `${job.title} – Job Portal`,
//       description: `Apply for ${job.title} in the ${job.category} category.`,
//       images: ['/screenshot/homepage.png'],
//     },
//   };
// }

export default function JobPage() {
  return <JobClient />;
}
