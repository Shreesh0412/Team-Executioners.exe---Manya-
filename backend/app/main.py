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
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
