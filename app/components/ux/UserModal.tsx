"use client";
import React from "react";
import { formatUTCToMMDDYY } from "@/lib/dateformat";
import Link from "next/link";

type User = {
  category: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  linkedIn?: string;
  website?: string;
  match_score: number;
  pdf_path?: string;
  created_at: string;
};

export default function UserModal({
  user,
  onClose,
}: {
  user: User;
  onClose: () => void;
}) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Applicant Info</h2>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>LinkedIn:</strong> <a href={user.linkedIn} target="_blank" rel="noopener noreferrer">{user.linkedIn}</a></p>
        <p><strong>Website:</strong> <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
        <p><strong>Match Score:</strong> {user.match_score}</p>
        <p><strong>Submitted:</strong> {formatUTCToMMDDYY(user.created_at)}</p>
        <p>
          {user.pdf_path && (
            <Link href={`/api/download-resume?path=${user.pdf_path}`} target="_blank">
              View Resume
            </Link>
          )}
        </p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
