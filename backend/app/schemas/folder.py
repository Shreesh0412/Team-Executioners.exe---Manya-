from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
)


class FolderBase(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Folder name.",
    )


class FolderCreate(FolderBase):
    pass


class FolderUpdate(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Updated folder name.",
    )


class FolderResponse(FolderBase):
    id: int
    user_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
