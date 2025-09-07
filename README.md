## Overview

This app generates legal documents (Last Will & Testament and Power of Attorney) from simple forms. Users fill 10 required fields, preview a watermarked PDF in a modal, then complete a dummy payment to download the final, watermark‑free PDF.

### End‑to‑End Flow

1. Choose a document type from the fixed glass sidebar: `Will` or `Power of Attorney`.
2. Fill out 10 required fields (inline validation guides correctness).
3. Click `Generate Preview`: frontend calls `POST /generate-pdf` and shows a watermarked, non‑downloadable preview inline (PDF.js).
4. Click `Make Payment`: frontend calls `POST /final-pdf` and triggers download of the final PDF (no watermark).
5. Draft answers are saved to `localStorage` and reloaded on refresh. Draft is cleared after final download.

## Prerequisites

- Node.js 18+ (Vite/React)
- Python 3.10+ (FastAPI backend)
- Python packages from `backend/requirements.txt` (includes `reportlab` for PDF generation)
- macOS/Linux: ReportLab uses system libraries for fonts/images; in Docker these are preinstalled. On host machines you usually do not need extra steps on macOS; on Linux ensure `freetype`, `libjpeg`, `zlib` are present if building from source.

## Run Locally (no Docker)

Open two terminals at the repository root.

### Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check: http://localhost:8000/health

### Frontend (Vite + React)

```bash
cd frontend
npm install
# Optional: set API base (defaults to http://localhost:8000)
echo "VITE_API_BASE=http://localhost:8000" > .env
npm run dev
```

Open the app: http://localhost:5173

## How PDF Templating Works

The backend builds PDFs with `reportlab` from simple text templates containing `{{placeholder}}` tokens. When the frontend submits the form:

- `POST /generate-pdf` receives `{ doc_type: 'WILL'|'POA', data: { ...fields } }`.
- The backend chooses the appropriate template by `doc_type` and replaces tokens using values from `data`.
- For previews, a large diagonal `PREVIEW – Not for Download` watermark is drawn onto the PDF canvas.
- The preview endpoint returns Base64 so the frontend can render inline. The final endpoint streams the PDF for download without watermark.

# Legal Docs Generator (Will & Power of Attorney)

A full-stack app to collect user inputs for legal documents and generate PDFs from templates. Users can preview a watermarked PDF and only download the final version after a dummy payment.

## Tech Stack

- Frontend: React + Vite, Tailwind CSS, React Router, react-hook-form, Axios
- Backend: FastAPI, Pydantic, reportlab

## Project Structure

```
legal-docs-app/
├── frontend/       # React app
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── api/
│       └── App.jsx
├── backend/        # FastAPI app
│   └── app/
│       ├── main.py
│       ├── pdf_utils.py
│       └── models.py
└── README.md
```

## Running Locally

### Prerequisites
- Node.js 18+
- Python 3.10+

### 1) Backend

```bash
# In a terminal
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r backend/requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000 --app-dir backend
```

API:
- POST http://127.0.0.1:8000/generate-pdf
- POST http://127.0.0.1:8000/final-pdf

### 2) Frontend

```bash
# In another terminal
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

## Flow

1. Use the sidebar to choose `Will` or `Power of Attorney`.
2. Fill out 10 required fields; inline validation prevents submit until all filled.
3. Click `Generate Preview` to call `/generate-pdf` and show a watermarked preview in a modal. Preview is non-downloadable (controls hidden, right-click disabled, overlay blocks interactions). Watermark is applied in the PDF itself.
4. Click `Pay (Dummy)` to call `/final-pdf` and trigger a browser download of the final PDF without watermark.

## PDF Templates & Data Binding

PDFs are generated with reportlab from text templates that use `{{placeholder}}` tokens.
- Will template uses fields like `full_name`, `address`, `dob`, `execution_date`, `beneficiaries`, `executor`, `provisions`, etc.
- PoA template uses fields like `principal_name`, `principal_address`, `attorney_name`, `attorney_address`, `scope`, `effective_date`, `additional_terms`, etc.

At runtime, placeholders are replaced with user-submitted values and rendered into a PDF page with a title. For preview requests, a large diagonal watermark `PREVIEW – Not for Download` is drawn on the page.

## Dependencies

- Node.js (Frontend): React, react-router-dom, react-hook-form, Axios, Tailwind CSS, Vite
- Python (Backend): FastAPI, Uvicorn, Pydantic, reportlab

## Notes

- CORS is configured to allow Vite dev server on port 5173.
- If you want to persist drafts, you can store form values in `localStorage` in the form pages.
- For Dockerization, add a multi-service `docker-compose.yml` with separate frontend and backend services (optional).

## Docker Setup

This repository includes a production-ready Docker setup for both the FastAPI backend and the Vite/React frontend.

### What’s included

- Backend image built from `backend/Dockerfile` (FastAPI + Uvicorn).
- Frontend image built from `frontend/Dockerfile` (Vite build → served by Nginx).
- `docker-compose.yml` to orchestrate both services.

### Default ports

- Backend API: `http://localhost:8000`
- Frontend (Nginx): `http://localhost:8080`

### API base URL (frontend)

The frontend reads its API base from `VITE_API_BASE` during build time.

- Local dev (Vite): add to `frontend/.env`

```bash
VITE_API_BASE=http://localhost:8000
```

- Docker build (compose already passes this):

```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
    args:
      - VITE_API_BASE=http://localhost:8000
```

### Build & Run

From the project root (`legal-doc/`):

```bash
docker compose build
docker compose up
```

Open the app at `http://localhost:8080`.

Check backend health at `http://localhost:8000/health`.

### CORS

The backend allows origins for local dev (5173) and Docker runtime (8080). See `backend/app/main.py`.

### Troubleshooting

- If you encounter image pull errors (DNS/no such host) when pulling base images:
  - Restart Docker Desktop, or set Docker Engine DNS to `8.8.8.8` and Apply & Restart.
  - Try pulling the image directly: `docker pull python:3.11-slim-bookworm`.
  - Retry `docker compose up --build`.
- If the frontend can’t reach the backend in Docker, confirm `VITE_API_BASE` is `http://localhost:8000` at build time and that the backend container is healthy.

### Optional: .dockerignore

Add these files to reduce image size:

- `backend/.dockerignore`

```
.venv
__pycache__/
*.pyc
.git
```

- `frontend/.dockerignore`

```
node_modules/
dist/
.git
```
