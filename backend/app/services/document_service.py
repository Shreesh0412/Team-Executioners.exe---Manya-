import os
import shutil
from uuid import uuid4

from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session

from app.models.document import Document
from app.services.pdf_service import extract_text

UPLOAD_DIR = "uploads/documents"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def upload_document(
    db: Session,
    file: UploadFile,
    title: str,
    subject: str | None,
    folder_id: int | None,
    user_id: int,
):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed.",
        )

    unique_filename = f"{uuid4().hex}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

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

    db.add(document)
    db.commit()
    db.refresh(document)
    text_path = extract_text(document)

document.text_path = text_path

document.extracted = True

db.commit()

db.refresh(document)

    return document


def get_documents(db: Session, user_id: int):
    return (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .all()
    )


def get_document(db: Session, document_id: int, user_id: int):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == user_id,
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    return document


def delete_document(db: Session, document_id: int, user_id: int):
    document = get_document(db, document_id, user_id)

    if os.path.exists(document.file_path):
        os.remove(document.file_path)

    db.delete(document)
    db.commit()

    return {"message": "Document deleted successfully."}

def move_document(
    db: Session,
    document_id: int,
    folder_id: int,
    user_id: int,
):

    document = get_document(
        db,
        document_id,
        user_id,
    )

    document.folder_id = folder_id

    db.commit()

    db.refresh(document)

    return document

def recent_documents(
    db: Session,
    user_id: int,
):

    return (
        db.query(Document)
        .filter(
            Document.user_id == user_id
        )
        .order_by(
            Document.uploaded_at.desc()
        )
        .limit(10)
        .all()
    )