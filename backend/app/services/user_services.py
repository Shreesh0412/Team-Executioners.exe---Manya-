from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User


def get_all_users(db: Session) -> list[User]:
    """
    Retrieve all users.
    """
    return db.query(User).all()


def get_user_by_id(db: Session, user_id: int) -> User:
    """
    Retrieve a user by ID.
    """
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    return user


def delete_user(db: Session, user_id: int) -> dict:
    """
    Delete a user.
    """
    user = get_user_by_id(db, user_id)

    db.delete(user)
    db.commit()

    return {
        "success": True,
        "message": "User deleted successfully.",
    }
