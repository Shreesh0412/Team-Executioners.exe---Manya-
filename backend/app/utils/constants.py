"""
Application-wide constants.
"""

from app.core.config import settings


APP_NAME = settings.APP_NAME
API_VERSION = settings.API_VERSION

DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 100

DEFAULT_POMODORO_MINUTES = 25
DEFAULT_BREAK_MINUTES = 5

UPLOAD_DIR = settings.UPLOAD_DIR
EXTRACTED_TEXT_DIR = settings.EXTRACTED_TEXT_DIR
MAX_UPLOAD_SIZE = settings.MAX_UPLOAD_SIZE

ALLOWED_FILE_EXTENSIONS = {
    ".pdf",
}

ALLOWED_CONTENT_TYPES = {
    "application/pdf",
}
