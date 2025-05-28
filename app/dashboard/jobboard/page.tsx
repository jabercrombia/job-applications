'use client';

import { useState, useTransition } from 'react';
import { createJob } from '@/app/actions/createJob';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "@/styles/components/form.scss";

export default function FormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expiration, setExpiration] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await createJob({ title, description, expiration });
        setMessage('Entry created successfully!');
        setTitle('');
        setDescription('');
        setExpiration('');
      } catch (error: any) {
        setMessage(`Error: ${error.message}`);
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Job Entry</h1>
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
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Expiration</label>
          <Input
            type="date"
            value={expiration}
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
