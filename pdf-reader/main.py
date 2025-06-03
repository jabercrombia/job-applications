from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pdfminer.high_level import extract_text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from tempfile import NamedTemporaryFile
from dotenv import load_dotenv
import os
from supabase import create_client, Client
import uuid

# Load .env from root folder (adjust path if needed)
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(file_bytes):
    with NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(file_bytes)
        tmp.flush()
        text = extract_text(tmp.name)
    return text

@app.post("/scan")
async def scan_pdf(
    pdf: UploadFile = File(...),
    firstName: str = Form(...),
    lastName: str = Form(...),
    email: str = Form(""),
    phone: str = Form(""),
    linkedIn: str = Form(""),
    website: str = Form(""),
    jobTitle: str = Form(""),
    jobDescription: str = Form(""),
):
    try:
        contents = await pdf.read()
        resume_text = extract_text_from_pdf(contents)

        vectorizer = TfidfVectorizer().fit_transform([resume_text, jobDescription])
        score = cosine_similarity(vectorizer[0:1], vectorizer[1:2])[0][0]
        match_score = round(score * 100, 2)
        # Upload PDF to Supabase Storage with unique filename
        unique_filename = f"{uuid.uuid4()}_{pdf.filename}"
        file_path = f"resumes/{unique_filename}"
        upload_response = supabase.storage.from_("resume-uploads").upload(file_path, contents)
        print("Upload response:", upload_response)  # Log full response to see its attributes

        # Now, check error attribute existence safely
        if hasattr(upload_response, "error") and upload_response.error is not None:
            return JSONResponse(content={"error": f"Failed to upload PDF: {upload_response.error}"}, status_code=500)

        # Or if .data or something else is used:
        if hasattr(upload_response, "data") and upload_response.data is None:
            return JSONResponse(content={"error": "Failed to upload PDF (no data returned)"}, status_code=500)


        # Insert metadata + score into Supabase table
        data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "linkedIn": linkedIn,
            "website": website,
            "pdf_path": file_path,
            "match_score": match_score
        }
        insert_response = supabase.table("resume_users").insert(data).execute()

        print("Supabase insert response:", insert_response)

        if getattr(insert_response, "data", None) and len(insert_response.data) > 0:
            # Success
            pass
        else:
            # Try to extract error message if any
            err = getattr(insert_response, "error", None)
            if err:
                return JSONResponse(content={"error": err}, status_code=400)
            else:
                return JSONResponse(content={"error": "Unknown insert error"}, status_code=400)

        return {"match_score": match_score}

    except Exception as e:
        print(f"❌ Error at line 56 or nearby: {e}")
        return JSONResponse(content={"error": "Failed to scan"}, status_code=500)
