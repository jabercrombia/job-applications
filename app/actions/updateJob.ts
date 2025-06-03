
'use server';

import { supabaseAdmin } from '@/lib/supbase-admin';

export async function updateJob({ id, title, description, expiration, category }: { id: string, title: string, description: string, expiration: string; category: string }) {
  const { error } = await supabaseAdmin.from('job_entries')
  .update([{ 
    title, 
    description, 
    expiration,
    category,
  }])
  .eq('id',id);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
