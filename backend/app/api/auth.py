from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse,
    TokenResponse,
)
from app.services.auth_service import (
    register_user,
    login_user,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
) -> UserResponse:
    """
    Register a new user.

    - Creates a new account.
    - Hashes the password before saving.
    - Raises an error if the email already exists.
    """

    return register_user(db, user)


@router.post(
    "/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Authenticate user",

)
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
) -> TokenResponse:
    """
    Authenticate a user.

    Returns:
    - JWT access token
    - Token type
    - Logged-in user information
    """
    return login_user(db, user)

