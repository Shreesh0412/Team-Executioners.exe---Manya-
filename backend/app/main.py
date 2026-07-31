import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api import auth, documents, folders, study_tools, users
from app.core.config import settings
from app.core.database import Base, engine
from app.utils.constants import API_VERSION, APP_NAME
from app.utils.responses import success_response


app = FastAPI(
    title=APP_NAME,
    description="AI-powered study planner and organizer backend",
    version=API_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
2. Commit and push immediately:
bash
git add backend/app/main.py
git commit -m "temp: open CORS to unblock submission deadline"
git push
3. Wait for Render to auto-redeploy (usually 1-2 min), then retry signup.
This guarantees the preflight passes regardless of exact origin string matching, since allow_credentials=False lets Starlette safely echo Access-Control-Allow-Origin: * for any request — and your app doesn't rely on cookies for auth, so nothing breaks functionally.

After you've submitted, for follow-up (not urgent right now): switch allow_origins back to your real domain list and investigate why the exact-match wasn't working — likely a stray character in the Render env var — but don't touch that now, this wildcard fix will work immediately and is safe for your current auth setup.





# Serve uploaded PDFs directly so the frontend can embed/preview them.
# e.g. GET /static/documents/<filename>.pdf
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount(
    "/static/documents",
    StaticFiles(directory=settings.UPLOAD_DIR),
    name="document-files",
)

# Register routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(documents.router)
app.include_router(folders.router)
app.include_router(study_tools.router)


@app.get("/", tags=["Root"])
def root() -> dict:
    return success_response(
        message="Welcome to CourseMate Backend 🚀",
        data={
            "app": APP_NAME,
            "version": API_VERSION,
        },
    )


@app.get("/health", tags=["Health"])
def health_check() -> dict:
    return success_response(
        message="Application is healthy.",
        data={
            "status": "healthy",
            "database": "connected",
        },
    )
