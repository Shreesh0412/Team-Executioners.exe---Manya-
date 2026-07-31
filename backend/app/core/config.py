from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # =========================
    # Application
    # =========================
    APP_NAME: str = "CourseMate"
    API_VERSION: str = "v1"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # =========================
    # Database
    # =========================
    DATABASE_URL: str

    # =========================
    # JWT Authentication
    # =========================
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # =========================
    # File Uploads
    # =========================
    UPLOAD_DIR: str = "uploads/documents"
    EXTRACTED_TEXT_DIR: str = "uploads/extracted_text"
    MAX_UPLOAD_SIZE: int = 20 * 1024 * 1024  # 20 MB

    # =========================
    # AI Configuration
    # =========================
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    AI_MODEL: str = "gemini-2.5-flash"

    # =========================
    # CORS
    # =========================
    ALLOWED_ORIGINS: list[str] = Field(
        default_factory=lambda: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
