from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password
from app.core.token import create_access_token
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.utils.validators import is_strong_password


def get_user_by_email(
    db: Session,
    email: str,
) -> User | None:
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
        HTTPException: If the email is already registered or the password is weak.
    """
    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    if not is_strong_password(user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Password must be at least 8 characters long and contain "
                "an uppercase letter, a lowercase letter, a number, and a special character."
            ),
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

    except Exception:
        db.rollback()
        raise

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

    if db_user is None or not verify_password(
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

    access_token = create_access_token(
        user_id=db_user.id,
        email=db_user.email,
    )

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
