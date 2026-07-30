from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
)


class DocumentBase(BaseModel):
    title: str = Field(
        ...,
        min_length=1,
        max_length=255,
        description="Document title.",
    )
    subject: str | None = Field(
        default=None,
        max_length=100,
        description="Subject associated with the document.",
    )
    folder_id: int | None = Field(
        default=None,
        description="Folder ID. Set to null to keep the document in the root.",
    )


class DocumentResponse(DocumentBase):
    id: int
    filename: str
    file_path: str
    file_size: int
    mime_type: str | None
    extracted: bool
    text_path: str | None
    created_at: datetime
    user_id: int

    model_config = ConfigDict(from_attributes=True)


class DocumentMove(BaseModel):
    folder_id: int | None = Field(
        default=None,
        description="Destination folder ID. Use null to move the document to the root.",
    )


class DocumentTextResponse(BaseModel):
    text: str
