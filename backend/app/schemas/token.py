from pydantic import BaseModel

from app.schemas.user import UserResponse


class Token(BaseModel):
    access_token: str
    token_type: str


class LoginResponse(Token):
    user: UserResponse


class TokenData(BaseModel):
    email: str | None = None
