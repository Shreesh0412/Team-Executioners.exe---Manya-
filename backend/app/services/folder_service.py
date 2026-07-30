from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.folder import Folder


def create_folder(
    db: Session,
    name: str,
    user_id: int,
):

    existing = (
        db.query(Folder)
        .filter(
            Folder.user_id == user_id,
            Folder.name == name,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Folder already exists."
        )

    folder = Folder(
        name=name,
        user_id=user_id,
    )

    db.add(folder)
    db.commit()
    db.refresh(folder)

    return folder


def get_folders(
    db: Session,
    user_id: int,
):

    return (
        db.query(Folder)
        .filter(
            Folder.user_id == user_id
        )
        .all()
    )


def get_folder(
    db: Session,
    folder_id: int,
    user_id: int,
):

    folder = (
        db.query(Folder)
        .filter(
            Folder.id == folder_id,
            Folder.user_id == user_id,
        )
        .first()
    )

    if not folder:
        raise HTTPException(
            status_code=404,
            detail="Folder not found."
        )

    return folder


def update_folder(
    db: Session,
    folder_id: int,
    name: str,
    user_id: int,
):

    folder = get_folder(
        db,
        folder_id,
        user_id,
    )

    folder.name = name

    db.commit()
    db.refresh(folder)

    return folder


def delete_folder(
    db: Session,
    folder_id: int,
    user_id: int,
):

    folder = get_folder(
        db,
        folder_id,
        user_id,
    )

    db.delete(folder)
    db.commit()

    return {
        "message": "Folder deleted successfully."
    }
