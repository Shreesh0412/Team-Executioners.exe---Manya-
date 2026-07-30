from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class DocumentBase(BaseModel):
    title: str
    subject: Optional[str] = None
    folder_id: Optional[int] = None


class DocumentResponse(DocumentBase):
    id: int
    filename: str
    file_path: str
    last_page: int
    uploaded_at: datetime
    user_id: int

    model_config = ConfigDict(from_attributes=True)
