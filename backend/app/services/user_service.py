from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User


def get_all_users(
    *,
    db: Session,
) -> list[User]:
    """
    Retrieve all users.
    """
    return db.query(User).all()


def get_user_by_id(
    *,
    db: Session,
    user_id: int,
) -> User:
    """
    Retrieve a user by ID.
    """
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    return user


def delete_user(
    *,
    db: Session,
    user_id: int,
    current_user: User,
) -> dict[str, str | bool]:
    """
    Delete a user.

    Only the user themselves can delete their account.
    """
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to delete this user.",
        )

    user = get_user_by_id(
        db=db,
        user_id=user_id,
    )

    try:
        db.delete(user)
        db.commit()

    except Exception:
        db.rollback()
        raise

    return {
        "success": True,
        "message": "User deleted successfully.",
    }
