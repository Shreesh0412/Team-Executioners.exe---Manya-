import os
import shutil
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.models.document import Document

UPLOAD_DIR = "uploads/documents"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def upload_document(
    db: Session,
    file: UploadFile,
    title: str,
    subject: str | None,
    folder_id: int | None,
    user_id: int,
) -> Document:
    """
    Upload a PDF document.
    """

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed.",
        )

    filename = f"{uuid4().hex}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    document = Document(
        title=title,
        filename=filename,
        file_path=file_path,
        subject=subject,
        folder_id=folder_id,
        user_id=user_id,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_documents(
    db: Session,
    user_id: int,
) -> list[Document]:
    """
    Return all documents belonging to a user.
    """

    return (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .all()
    )


def get_document(
    db: Session,
    document_id: int,
    user_id: int,
) -> Document:
    """
    Retrieve a single document.
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
    db: Session,
    document_id: int,
    user_id: int,
) -> dict[str, str]:
    """
    Delete a document.
    """

    document = get_document(
        db,
        document_id,
        user_id,
    )

    if os.path.exists(document.file_path):
        os.remove(document.file_path)

    db.delete(document)
    db.commit()

    return {
        "success": True,
        "message": "Document deleted successfully.",
    }
