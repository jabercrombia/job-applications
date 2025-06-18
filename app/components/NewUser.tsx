"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "./ux/Modal";

export default function UploadPage(data: {
  jobDescription: string;
  jobTitle: string;
  jobCategory: string;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedIn: "",
    website: "",
    jobDescription: data.jobDescription,
    title: data.jobTitle,
    category: data.jobCategory,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedIn: "",
      website: "",
      jobDescription: data.jobDescription,
      title: data.jobTitle,
      category: data.jobCategory,
    });
    setPdfFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    if (pdfFile) {
      formPayload.append("pdf", pdfFile);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PDF_SCAN_URL}/scan`, {
        method: "POST",
        body: formPayload,
      });

      const data = await res.json();

      if (res.ok) {
        setShowModal(true);
      } else {
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <Input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        type="email"
      />
      <Input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <Input
        name="linkedIn"
        placeholder="LinkedIn"
        value={formData.linkedIn}
        onChange={handleChange}
      />
      <Input
        name="website"
        placeholder="Website/Portfolio"
        value={formData.website}
        onChange={handleChange}
      />
      <Input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Submit"}
      </Button>
    </form>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-2">Submission Successful</h2>
        <p>Thank you for submitting your resume. We’ll be in touch!</p>
        <Button onClick={() => setShowModal(false)} className="mt-4">
          Close
        </Button>
      </Modal>
    </>
  );
}
