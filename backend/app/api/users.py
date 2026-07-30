from fastapi import APIRouter, Depends, HTTPException
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.config import settings
from app.models.user import User

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)
from app.core.dependencies import get_current_user

@router.get("/")
def get_all_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    return users


@router.get(
    "/{user_id}",
    response_model=UserResponse
)
def get_user(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(user)
    db.commit()

    return{
    "success": True,
    "message": "User deleted successfully"
}