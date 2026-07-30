from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.core.security import hash_password, verify_password
from app.core.token import create_access_token


def get_user_by_email(db: Session, email: str) -> User | None:
    """
    Fetch a user by email.
    """
    return db.query(User).filter(User.email == email).first()


def register_user(db: Session, user: UserCreate) -> User:
    """
    Register a new user.
    """

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
        is_verified=False
    )

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

    except Exception:
        db.rollback()
        raise

    return db_user


def authenticate_user(db: Session, user: UserLogin) -> User:
    """
    Verify email and password.
    """

    db_user = get_user_by_email(db, user.email)

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return db_user


def login_user(db: Session, user: UserLogin) -> dict:
    """
    Authenticate user and generate JWT token.
    """

    db_user = authenticate_user(db, user)

    access_token = create_access_token(
        {
            "sub": db_user.email,
            "user_id": db_user.id
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email,
            "is_verified": db_user.is_verified
        }
    }