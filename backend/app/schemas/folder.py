from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class FolderBase(BaseModel):
    name: str


class FolderCreate(FolderBase):
    pass


class FolderUpdate(BaseModel):
    name: str


class FolderResponse(FolderBase):
    id: int
    user_id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }
