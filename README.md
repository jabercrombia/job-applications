# Interactive Job Description Submission Portal

A simple form-based application built with **Next.js (App Router)** and **Supabase**, allowing users to upload a PDF along with their first and last name. Data is saved in Supabase PostgreSQL, and PDFs are stored in Supabase Storage.

## 🚀 Features

- 📄 PDF file upload
- 👤 Collects first name, last name, email, phone, LinkedIn, and website
- 💾 Stores files in Supabase Storage
- 🗃️ Saves metadata to a `resume_users` table
- 🌗 Responsive dark mode support

## 🛠️ Technologies

- [Next.js 13+ (App Router)](https://nextjs.org/docs/app)
- [Supabase](https://supabase.com/)
- TypeScript
- SCSS (optional styling)
- Tailwind CSS

## 🧰 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/supabase-upload-app.git
cd supabase-upload-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Setup `.env.local`

Create a `.env.local` file in the root of your project with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

> ✅ `SUPABASE_SERVICE_ROLE_KEY` is **server-side only** — use it only inside API routes or server actions.

### 4. Configure Supabase

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

3. Enable Row Level Security and add an `INSERT` policy:

```sql
-- SQL Example for allowing insert
create policy "Allow insert for authenticated"
on public.resume_users
for insert
with check (auth.role() = 'authenticated');
```

Or bypass RLS using the **Service Role Key** in server routes (recommended for admin-level inserts).

### 5. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 File Structure

```bash
├── app/
│   └── api/
│       └── submit-user/
│           └── route.ts         # API handler for submitting metadata
├── components/
│   └── UploadForm.tsx           # Form component
├── lib/
│   ├── supbase.ts               # Client for client-side usage
│   └── supbase-admin.ts         # Admin client with service role
├── styles/
│   └── form.scss
├── public/
├── .env.local
└── README.md
```

## 🧪 Coming Soon

- Client-side validation
- PDF preview before upload
- Authentication (Supabase Auth)

## 📄 License

MIT License.# job-applications
