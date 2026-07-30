from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt

from app.core.database import get_db
from app.core.security import hash_password, verify_password
from app.core.token import create_access_token
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.core.config import settings

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": db_user.email,
            "id": db_user.id
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
