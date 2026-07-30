from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)

from sqlalchemy.orm import relationship

from app.core.database import Base


class Document(Base):

    __tablename__ = "documents"

    id = Column(Integer, primary_key=True)

    title = Column(String, nullable=False)

    filename = Column(String, nullable=False)

    file_path = Column(String, nullable=False)

    subject = Column(String)

    file_size = Column(Integer)

    mime_type = Column(String)

    extracted = Column(Boolean, default=False)

    text_path = Column(String)

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    folder_id = Column(
        Integer,
        ForeignKey("folders.id"),
        nullable=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
    )

    folder = relationship(
        "Folder",
        back_populates="documents",
    )

    owner = relationship(
        "User",
        back_populates="documents",
    )