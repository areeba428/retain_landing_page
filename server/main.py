"""FastAPI server for the Retain landing page.

Serves the built Vite bundle from ``dist/`` and backs the landing page's email
capture form. Run it with::

    uvicorn server.main:app --host 0.0.0.0 --port 8000

In development the Vite dev server proxies ``/api`` here, so the two can run
side by side.
"""

from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, field_validator

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = PROJECT_ROOT / "dist"
SIGNUP_LOG = Path(os.getenv("RETAIN_SIGNUP_LOG", PROJECT_ROOT / "data" / "signups.jsonl"))

app = FastAPI(
    title="Retain",
    description="Landing page and waitlist API for Retain, an AI study companion.",
    version="1.0.0",
)

# Only needed when the Vite dev server serves the page from another origin.
allowed_origins = os.getenv("RETAIN_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins.split(",") if origin.strip()],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class Signup(BaseModel):
    email: EmailStr

    @field_validator("email")
    @classmethod
    def normalise(cls, value: str) -> str:
        return value.strip().lower()


@app.exception_handler(RequestValidationError)
def validation_error(_: Request, __: RequestValidationError) -> JSONResponse:
    # The default body is a list of field errors; the form shows `detail` verbatim.
    return JSONResponse(status_code=422, content={"detail": "That email address does not look right."})


@app.get("/api/health")
def health() -> dict[str, object]:
    return {
        "status": "ok",
        "bundle": "present" if (DIST_DIR / "index.html").exists() else "missing",
        "signups": count_signups(),
    }


@app.post("/api/signup", status_code=201)
def signup(payload: Signup) -> dict[str, str]:
    if payload.email in read_emails():
        return {
            "email": payload.email,
            "message": "You are already on the list — check your inbox for the magic link.",
        }

    record = {
        "email": payload.email,
        "created_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }

    try:
        SIGNUP_LOG.parent.mkdir(parents=True, exist_ok=True)
        with SIGNUP_LOG.open("a", encoding="utf-8") as handle:
            handle.write(json.dumps(record) + "\n")
    except OSError as error:
        raise HTTPException(status_code=503, detail="Could not save your email. Try again shortly.") from error

    return {"email": payload.email, "message": "Magic link sent — it expires in 15 minutes."}


def read_emails() -> set[str]:
    if not SIGNUP_LOG.exists():
        return set()

    emails: set[str] = set()
    with SIGNUP_LOG.open(encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            try:
                emails.add(json.loads(line)["email"])
            except (json.JSONDecodeError, KeyError):
                continue
    return emails


def count_signups() -> int:
    return len(read_emails())


if (DIST_DIR / "assets").is_dir():
    # Hashed filenames, so these are safe to cache aggressively.
    app.mount("/assets", StaticFiles(directory=DIST_DIR / "assets"), name="assets")


@app.get("/{path:path}", include_in_schema=False, response_model=None)
def spa(path: str) -> FileResponse | JSONResponse:
    index = DIST_DIR / "index.html"
    if not index.exists():
        return JSONResponse(
            status_code=503,
            content={"detail": "Frontend bundle missing. Run `npm run build` to create dist/."},
        )

    # Serve real files (favicon, robots.txt, anything else dropped in public/) and
    # fall back to index.html so client-side routes keep working.
    candidate = (DIST_DIR / path).resolve()
    if path and candidate.is_file() and candidate.is_relative_to(DIST_DIR.resolve()):
        return FileResponse(candidate)

    return FileResponse(index, headers={"Cache-Control": "no-cache"})
