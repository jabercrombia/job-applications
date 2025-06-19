import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getJobDataByPostingKey(slug: string) {
  const { data, error } = await supabase
    .from('job_entries')
    .select('id, title, category, description, job_posting_key')
    .eq('job_posting_key', slug)
    .maybeSingle();

  if (error || !data) {
    throw new Error('Job not found');
  }

  return data;
}
