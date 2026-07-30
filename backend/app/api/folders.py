from typing import List

from fastapi import APIRouter, Depends
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
)
def create(
    folder: FolderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return create_folder(
        db,
        folder.name,
        current_user.id,
    )


@router.get(
    "/",
    response_model=List[FolderResponse],
)
def get_all(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_folders(
        db,
        current_user.id,
    )


@router.get(
    "/{folder_id}",
    response_model=FolderResponse,
)
def get_one(
    folder_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_folder(
        db,
        folder_id,
        current_user.id,
    )


@router.put(
    "/{folder_id}",
    response_model=FolderResponse,
)
def update(
    folder_id: int,
    folder: FolderUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return update_folder(
        db,
        folder_id,
        folder.name,
        current_user.id,
    )


@router.delete("/{folder_id}")
def delete(
    folder_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return delete_folder(
        db,
        folder_id,
        current_user.id,
    )
