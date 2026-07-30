from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.document import (
    DocumentResponse,
    DocumentMove,
    DocumentTextResponse,
)
from app.services.document_service import (
    upload_document,
    get_documents,
    get_document,
    delete_document,
    move_document,
    recent_documents,
)
from app.services.pdf_service import load_text

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post(
    "/upload",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload a PDF document",
)
def upload_pdf(
    title: str = Form(...),
    subject: str | None = Form(None),
    folder_id: int | None = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentResponse:
    """
    Upload a PDF document and store it in the database.
    """
    return upload_document(
        db=db,
        file=file,
        title=title,
        subject=subject,
        folder_id=folder_id,
        user_id=current_user.id,
    )


@router.get(
    "/",
    response_model=list[DocumentResponse],
    status_code=status.HTTP_200_OK,
    summary="List all documents",
)
def list_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[DocumentResponse]:
    """
    Retrieve all documents belonging to the authenticated user.
    """
    return get_documents(
        db=db,
        user_id=current_user.id,
    )


@router.get(
    "/{document_id}",
    response_model=DocumentResponse,
    status_code=status.HTTP_200_OK,
    summary="Get document by ID",
)
def read_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentResponse:
    """
    Retrieve a single document.
    """
    return get_document(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
    )


@router.delete(
    "/{document_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete document",
)
def remove_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    """
    Delete a document.
    """
    return delete_document(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
    )


@router.put(
    "/{document_id}/move",
    response_model=DocumentResponse,
    status_code=status.HTTP_200_OK,
    summary="Move document",
)
def move(
    document_id: int,
    data: DocumentMove,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentResponse:
    """
    Move a document to another folder.
    """
    return move_document(
        db=db,
        document_id=document_id,
        folder_id=data.folder_id,
        user_id=current_user.id,
    )


@router.get(
    "/recent",
    response_model=list[DocumentResponse],
    status_code=status.HTTP_200_OK,
    summary="Recently uploaded documents",
)
def recent(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[DocumentResponse]:
    """
    Return recently uploaded documents.
    """
    return recent_documents(
        db=db,
        user_id=current_user.id,
    )


@router.get(
    "/{document_id}/text",
    response_model=DocumentTextResponse,
    status_code=status.HTTP_200_OK,
    summary="Extracted document text",
)
def document_text(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentTextResponse:
    """
    Return extracted text from a document.
    """
    document = get_document(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
    )

    return DocumentTextResponse(
        text=load_text(document)
    )