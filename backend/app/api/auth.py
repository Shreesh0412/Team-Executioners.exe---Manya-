from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import verify_password
from app.core.token import create_access_token
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.schemas.token import Token
from app.services.auth_service import register_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    return register_user(db, user)


@router.post(
    "/login",
    response_model=Token,
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):
    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not db_user:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(
        user.password,
        db_user.hashed_password,
    ):
        from fastapi import HTTPException

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        {
            "sub": db_user.email,
            "id": db_user.id,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }