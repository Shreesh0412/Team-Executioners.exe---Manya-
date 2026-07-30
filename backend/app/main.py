from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, users, documents
from app.core.database import Base, engine
from app.utils.constants import APP_NAME, API_VERSION
from app.utils.responses import success_response

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=APP_NAME,
    description="AI-powered study planner and organiser backend",
    version=API_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(documents.router)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return success_response(
        message="Welcome to CourseMate Backend 🚀",
        data={"version": API_VERSION},
    )

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "database": "connected",
    }
