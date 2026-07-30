from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
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
    summary="Login using JSON (Frontend)",
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
) -> TokenResponse:
    """
    Login endpoint for frontend/mobile applications.

    Request Body:
    {
        "email": "...",
        "password": "..."
    }
    """
    return login_user(db, user)


@router.post(
    "/token",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="OAuth2 Login (Swagger)",
)
def login_oauth2(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> TokenResponse:
    """
    OAuth2 Password Flow endpoint used by Swagger UI.
    """
    user = UserLogin(
        email=form_data.username,
        password=form_data.password,
    )

    return login_user(db, user)
