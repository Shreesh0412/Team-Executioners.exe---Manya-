from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password
from app.core.token import create_access_token
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin


def get_user_by_email(db: Session, email: str) -> User | None:
    """
    Retrieve a user by email.
    """
    return db.query(User).filter(User.email == email).first()


def register_user(
    db: Session,
    user: UserCreate,
) -> User:
    """
    Register a new user.

    Raises:
        HTTPException: If the email is already registered.
    """

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
        is_verified=False,
    )

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

    except Exception as exc:
        db.rollback()
        raise exc

    return db_user


def authenticate_user(
    db: Session,
    user: UserLogin,
) -> User:
    """
    Authenticate a user using email and password.

    Raises:
        HTTPException: If the credentials are invalid.
    """

    db_user = get_user_by_email(db, user.email)

    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    if not verify_password(
        user.password,
        db_user.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    return db_user


def login_user(
    db: Session,
    user: UserLogin,
) -> dict[str, object]:
    """
    Authenticate the user and generate an access token.
    """

    db_user = authenticate_user(db, user)

    payload = {
        "sub": db_user.email,
        "user_id": db_user.id,
    }

    access_token = create_access_token(payload)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email,
            "is_verified": db_user.is_verified,
        },
    }
