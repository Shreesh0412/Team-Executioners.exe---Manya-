from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DocumentBase(BaseModel):
    title: str
    subject: str | None = None
    folder_id: int | None = None


class DocumentResponse(DocumentBase):
    id: int
    filename: str
    file_path: str
    uploaded_at: datetime
    user_id: int

    model_config = ConfigDict(from_attributes=True)


class DocumentMove(BaseModel):
    folder_id: int


class DocumentTextResponse(BaseModel):
    text: str