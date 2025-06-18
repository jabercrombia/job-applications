# Interactive Job Description Submission Portal

![homepage](/public/screenshot/homepage.png)

A form-based application built with **Next.js (App Router)**, **Supabase**, and a **Python microservice** that scans resumes and matches them against a job description using TF-IDF and cosine similarity. Users upload a PDF and fill in their personal information. The data is stored in Supabase PostgreSQL, and PDFs are saved in Supabase Storage.

## >>Documentation<<

Documentation for this repo can be found [here](https://project-docs-amber.vercel.app/docs/job-submission-portal).


---

## Features

- PDF file upload
- Collects first name, last name, email, phone number, LinkedIn, and website
- Stores resumes in Supabase Storage
- Saves metadata in the `resume_users` table
- Python backend performs job description matching
- Responsive layout with dark mode support

---

## Technologies

- [Next.js 13+ (App Router)](https://nextjs.org/docs/app)
- [Supabase](https://supabase.com/)
- TypeScript
- Tailwind CSS
- Python 3.9+
- [FastAPI](https://fastapi.tiangolo.com/)
- [pdfminer.six](https://github.com/pdfminer/pdfminer.six)
- [scikit-learn](https://scikit-learn.org/)
- Supabase Python client

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/supabase-upload-app.git
cd supabase-upload-app
```

---

### 2. Frontend Setup (Next.js)

#### Install Dependencies

```bash
npm install
```

#### Environment Configuration

Create a `.env.local` file at the root of the project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

> Note: `SUPABASE_SERVICE_ROLE_KEY` should only be used in server routes or server actions.

#### Configure Supabase

1. Create a storage bucket named: `resume-uploads`
2. Create a table called: `resume_users` with the following fields:
   - `id` (uuid, primary key, default: `uuid_generate_v4()`)
   - `firstName` (text)
   - `lastName` (text)
   - `email` (text)
   - `phone` (text)
   - `linkedIn` (text)
   - `website` (text)
   - `pdf_path` (text)
   - `match_score` (float4)

3. Enable Row Level Security (RLS) and apply an insert policy:

```sql
create policy "Allow insert for authenticated"
on public.resume_users
for insert
with check (auth.role() = 'authenticated');
```

Alternatively, you can use the **Service Role Key** to bypass RLS in server-side scripts.

#### Run the Frontend

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

### 3. Python Resume Scanner Setup

#### Navigate to the Python Service Directory

```bash
cd pdf-reader
```

#### Setup Virtual Environment and Dependencies

```bash
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

#### Example `requirements.txt`

```txt
fastapi
uvicorn
python-dotenv
pdfminer.six
scikit-learn
supabase
```

#### Add Environment Variables

Create a `.env` file in the `pdf-reader` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JOB_DESCRIPTION=Your target job description for matching
```

#### Run the FastAPI Server

```bash
uvicorn main:app --reload
```

The server will start at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## File Structure

```bash
├── app/
│   └── api/
│       └── submit-user/
│           └── route.ts
├── components/
│   └── NewUser.tsx
├── users/
│   └── page.tsx
├── lib/
│   ├── supabase.ts
│   └── supabase-admin.ts
├── pdf-reader/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
├── public/
├── styles/
│   └── _variables.scss
│   └── components/
│       └── form.scss
│       └── table.scss
├── .env.local
└── README.md
```

---

## Listings Page

![listings](/public/screenshot/listings.png)

Displays all job posts with details such as title, category, and submission date. You can view or edit each job post directly from this page.

---

## Create Job Entry

![entry](/public/screenshot/entry.png)

Add new job listings by filling out required fields such as title, category, description, and expiration date. Submitted jobs are stored in the database and immediately appear in the listings table.

---

## Applications Dashboard

![application](/public/screenshot/application.png)

Shows a list of all submitted job applications. Each entry includes candidate information (name, email, LinkedIn), resume file path, match score, and submission timestamp. The dashboard also allows sorting, filtering, and accessing related job posts.

---
