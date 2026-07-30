from datetime import datetime
from datetime import timedelta
from typing import Optional

from jose import jwt

from app.core.config import settings


from datetime import datetime, timedelta, UTC

def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None
):
    to_encode = data.copy()

    expire = datetime.now(UTC) + (
        expires_delta
        or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    to_encode["exp"] = expire

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )