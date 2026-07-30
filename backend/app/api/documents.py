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
from app.schemas.document import DocumentResponse
from app.services.document_service import (
    upload_document,
    get_documents,
    get_document,
    delete_document,
)
from app.schemas.document import DocumentMove
from app.schemas.document import move_document
from app.schemas.document import recent_documents
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
    Upload a PDF document.

    The uploaded file is stored on the server and its metadata is saved
    in the database.
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
    return get_documents(db, current_user.id)



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
    Retrieve a single document belonging to the authenticated user.
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
    Delete a document and remove its file from storage.
    """
    return delete_document(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
    )

@router.put(
    "/{document_id}/move",
    response_model=DocumentResponse,
)
def move(
    document_id: int,
    data: DocumentMove,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return move_document(
        db,
        document_id,
        data.folder_id,
        current_user.id,
    )

@router.get(
    "/recent",
    response_model=list[DocumentResponse],
)
def recent(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return recent_documents(
        db,
        current_user.id,
    )
@router.get("/{document_id}/text")
def document_text(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    document = get_document(
        db,
        document_id,
        current_user.id,
    )

    return {

        "text": load_text(document)

    }
