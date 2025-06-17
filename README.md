
# Interactive Job Description Submission Portal
![homepage](/public/screenshot/homepage.png)
A simple form-based application built with **Next.js (App Router)**, **Supabase**, and a Python microservice that scans resumes and matches them against a job description using TF-IDF and cosine similarity. Users upload a PDF and fill in personal info. The data is saved in Supabase PostgreSQL, and PDFs are stored in Supabase Storage.

---

## 🚀 Features

- 📄 PDF file upload
- 👤 Collects first name, last name, email, phone, LinkedIn, and website
- 💾 Stores files in Supabase Storage
- 🗃️ Saves metadata to a `resume_users` table
- 🧠 Python backend with resume/job description matching
- 🌗 Responsive dark mode support

---

## 🛠️ Technologies

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

## 🧰 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/supabase-upload-app.git
cd supabase-upload-app
```

---

### 2. Frontend Setup (Next.js)

#### Install dependencies

```bash
npm install
# or
yarn
```

#### Setup `.env.local`

Create a `.env.local` file in the root of your project with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

> ✅ `SUPABASE_SERVICE_ROLE_KEY` is **server-side only** — use it only inside API routes or server actions.

#### Configure Supabase

1. Create a bucket: `resume-uploads`
2. Create a table: `resume_users` with fields:
   - `id` (uuid, primary key, default: `uuid_generate_v4()`)
   - `firstName` (text)
   - `lastName` (text)
   - `email` (text)
   - `phone` (text)
   - `linkedIn` (text)
   - `website` (text)
   - `pdf_path` (text)
   - `match_score` (float4)

3. Enable Row Level Security and add an `INSERT` policy:

```sql
create policy "Allow insert for authenticated"
on public.resume_users
for insert
with check (auth.role() = 'authenticated');
```

Or bypass RLS using the **Service Role Key** in server routes (recommended for admin-level inserts).

#### Run the frontend

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 3. Python Resume Scanner Setup

#### Navigate to the Python service

```bash
cd pdf-reader
```

#### Create a virtual environment and install dependencies

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

#### Create a `.env` file

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JOB_DESCRIPTION=Your target job description for matching
```

#### Run the FastAPI server

```bash
uvicorn main:app --reload
```

This will start your server at [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 📁 File Structure

```bash
├── app/
│   └── api/
│       └── submit-user/
│           └── route.ts         # API handler for submitting metadata
├── components/
│   └── NewUser.tsx              # Form component
├── users/
│   └── page.tsx                 # User Table
├── lib/
│   ├── supabase.ts              # Client for client-side usage
│   └── supabase-admin.ts        # Admin client with service role
├── pdf-reader/                  # Python microservice
│   ├── main.py                  # FastAPI entry point
│   ├── requirements.txt         # Python dependencies
│   └── .env                     # Environment variables
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
![homepage](/public/screenshot/listings.png)
This page displays a list of all job posts. Each listing includes key details like title, category, and submission date. You can view or edit any job post directly from this page.

## Create Job Entry
![entry](/public/screenshot/entry.png)
 Fill out the required fields such as job title, category, description, and expiration date. Once submitted, the job entry will be saved to the database and automatically appear in the main listings table, where it can be viewed, edited, or deleted as needed.
---

## 📄 License

MIT License.