from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.folder import (
    FolderCreate,
    FolderResponse,
    FolderUpdate,
)
from app.services.folder_service import (
    create_folder,
    delete_folder,
    get_folder,
    get_folders,
    update_folder,
)

router = APIRouter(
    prefix="/folders",
    tags=["Folders"],
)


@router.post(
    "/",
    response_model=FolderResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a folder",
)
def create(
    folder: FolderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> FolderResponse:
    """
    Create a new folder for the authenticated user.
    """
    return create_folder(
        db=db,
        name=folder.name,
        user_id=current_user.id,
    )


@router.get(
    "/",
    response_model=list[FolderResponse],
    status_code=status.HTTP_200_OK,
    summary="Get all folders",
)
def get_all(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[FolderResponse]:
    """
    Retrieve all folders belonging to the authenticated user.
    """
    return get_folders(
        db=db,
        user_id=current_user.id,
    )


@router.get(
    "/{folder_id}",
    response_model=FolderResponse,
    status_code=status.HTTP_200_OK,
    summary="Get folder by ID",
)
def get_one(
    folder_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> FolderResponse:
    """
    Retrieve a specific folder belonging to the authenticated user.
    """
    return get_folder(
        db=db,
        folder_id=folder_id,
        user_id=current_user.id,
    )


@router.put(
    "/{folder_id}",
    response_model=FolderResponse,
    status_code=status.HTTP_200_OK,
    summary="Update a folder",
)
def update(
    folder_id: int,
    folder: FolderUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> FolderResponse:
    """
    Update a folder belonging to the authenticated user.
    """
    return update_folder(
        db=db,
        folder_id=folder_id,
        name=folder.name,
        user_id=current_user.id,
    )


@router.delete(
    "/{folder_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete a folder",
)
def delete(
    folder_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    """
    Delete a folder belonging to the authenticated user.
    """
    return delete_folder(
        db=db,
        folder_id=folder_id,
        user_id=current_user.id,
    )