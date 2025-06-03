
'use server';

import { supabaseAdmin } from '@/lib/supbase-admin';

export async function createJob({ title, description, expiration, category }: { title: string, description: string, expiration: string, category: string }) {
  const { error } = await supabaseAdmin.from('job_entries').insert([
    { title, description, expiration, category }
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
