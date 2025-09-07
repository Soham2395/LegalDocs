from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from .models import GeneratePdfRequest
from .pdf_utils import build_pdf_from_template
import base64
import io

app = FastAPI(title="Legal Docs API")

# CORS - allow local dev frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/generate-pdf")
def generate_pdf(req: GeneratePdfRequest):
    try:
        pdf_bytes = build_pdf_from_template(req.doc_type, req.data, watermark=True)
        # Return base64 for inline preview
        b64 = base64.b64encode(pdf_bytes).decode("utf-8")
        return {"pdf_base64": b64}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/final-pdf")
def final_pdf(req: GeneratePdfRequest):
    try:
        pdf_bytes = build_pdf_from_template(req.doc_type, req.data, watermark=False)
        buffer = io.BytesIO(pdf_bytes)
        filename = f"{req.doc_type.lower()}-document.pdf"
        headers = {"Content-Disposition": f"attachment; filename={filename}"}
        return StreamingResponse(buffer, media_type="application/pdf", headers=headers)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
