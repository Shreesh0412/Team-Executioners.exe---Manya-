from pydantic import BaseModel

from app.schemas.user import LoggedInUser


class Token(BaseModel):
    access_token: str
    token_type: str


class LoginResponse(Token):
    user: LoggedInUser


class TokenData(BaseModel):
    email: str | None = None