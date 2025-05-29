'use client';

import { useEffect, useState, useTransition } from 'react';
import { updateJob } from '@/app/actions/updateJob';
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDateYMD } from '@/lib/dateformat';
import { Textarea } from "@/components/ui/textarea";
import "@/styles/components/form.scss";

export default function FormPage() {
  const [id, setID] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expiration, setExpiration] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const params = useParams<{ slug: string }>();


  useEffect(() => {
    const fetchEntry = async () => {
      const res = await fetch(`/api/job-entry?key=${params.slug}&includeExpired=true`);
      const data = await res.json();
      setDescription(data.description);
      setTitle(data.title);
      setExpiration(data.expiration);
      setID(data.id);
    }

    fetchEntry();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await updateJob({ id, title, description, expiration });
        setMessage('Entry created successfully!');
        setTitle('');
        setDescription('');
        setExpiration('');
        setID('');
      } catch (error: unknown) {
        if (error instanceof Error) {
          setMessage(`Error: ${error.message}`);
        } else {
          setMessage('An unknown error occurred.');
        }
      }
    });
  };


  return (
    <div className="container mx-auto p-6">
      <h1>Edit Job Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <Input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <Textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            className="w-full border rounded p-2 h-60"
          />
          <p className='text-sm pt-2'>Use markdown formatting for job description.</p>
        </div>
        <div>
          <label className="block font-semibold">Expiration</label>
          <Input
            type="date"
            value={formatDateYMD(expiration)}
            onChange={e => setExpiration(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
