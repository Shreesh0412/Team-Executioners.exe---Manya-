from datetime import UTC, datetime, timedelta

from jose import jwt

from app.core.config import settings


def create_access_token(
    *,
    user_id: int,
    email: str,
    expires_delta: timedelta | None = None,
) -> str:
    expire = datetime.now(UTC) + (
        expires_delta
        or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    payload = {
        "user_id": user_id,
        "email": email,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
