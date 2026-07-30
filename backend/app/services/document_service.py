import os
import shutil
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.document import Document
from app.services.pdf_service import extract_text


os.makedirs(settings.UPLOAD_DIR, exist_ok=True)


def upload_document(
    *,
    db: Session,
    file: UploadFile,
    title: str,
    subject: str | None,
    folder_id: int | None,
    user_id: int,
) -> Document:
    """
    Upload a PDF document, save it to disk, extract its text,
    and store its metadata in the database.
    """
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed.",
        )

    unique_filename = f"{uuid4().hex}_{file.filename}"
    file_path = os.path.join(settings.UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    document = Document(
        title=title,
        filename=unique_filename,
        file_path=file_path,
        subject=subject,
        folder_id=folder_id,
        user_id=user_id,
    )

    try:
        db.add(document)
        db.commit()
        db.refresh(document)

        text_path = extract_text(document)

        document.text_path = text_path
        document.extracted = True

        db.commit()
        db.refresh(document)

    except Exception:
        db.rollback()

        if os.path.exists(file_path):
            os.remove(file_path)

        raise

    return document


def get_documents(
    *,
    db: Session,
    user_id: int,
) -> list[Document]:
    """
    Retrieve all documents belonging to a user.
    """
    return (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .all()
    )


def get_document(
    *,
    db: Session,
    document_id: int,
    user_id: int,
) -> Document:
    """
    Retrieve a single document belonging to a user.
    """
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == user_id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    return document


def delete_document(
    *,
    db: Session,
    document_id: int,
    user_id: int,
) -> dict[str, str]:
    """
    Delete a document and its associated PDF file.
    """
    document = get_document(
        db=db,
        document_id=document_id,
        user_id=user_id,
    )

    if os.path.exists(document.file_path):
        os.remove(document.file_path)

    if document.text_path and os.path.exists(document.text_path):
        os.remove(document.text_path)

    db.delete(document)
    db.commit()

    return {"message": "Document deleted successfully."}


def move_document(
    *,
    db: Session,
    document_id: int,
    folder_id: int,
    user_id: int,
) -> Document:
    """
    Move a document to another folder.
    """
    document = get_document(
        db=db,
        document_id=document_id,
        user_id=user_id,
    )

    document.folder_id = folder_id

    db.commit()
    db.refresh(document)

    return document


def recent_documents(
    *,
    db: Session,
    user_id: int,
) -> list[Document]:
    """
    Retrieve the 10 most recently uploaded documents for a user.
    """
    return (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .order_by(Document.uploaded_at.desc())
        .limit(10)
        .all()
    )
