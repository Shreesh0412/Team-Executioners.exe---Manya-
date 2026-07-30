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

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False, index=True)

    filename = Column(String(255), nullable=False)

    file_path = Column(String(500), nullable=False)

    subject = Column(String(100), nullable=True)

    file_size = Column(Integer, nullable=False)

    mime_type = Column(String(100), nullable=True)

    extracted = Column(Boolean, default=False, nullable=False)

    text_path = Column(String(500), nullable=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    folder_id = Column(
        Integer,
        ForeignKey("folders.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        nullable=False,
    )

    owner = relationship(
        "User",
        back_populates="documents",
    )

    folder = relationship(
        "Folder",
        back_populates="documents",
    )

    summaries = relationship(
        "Summary",
        back_populates="document",
        cascade="all, delete-orphan",
    )

    flashcards = relationship(
        "Flashcard",
        back_populates="document",
        cascade="all, delete-orphan",
    )

    bookmarks = relationship(
        "Bookmark",
        back_populates="document",
        cascade="all, delete-orphan",
    )

    highlights = relationship(
        "Highlight",
        back_populates="document",
        cascade="all, delete-orphan",
    )

    annotations = relationship(
        "Annotation",
        back_populates="document",
        cascade="all, delete-orphan",
    )

    sticky_notes = relationship(
        "StickyNote",
        back_populates="document",
        cascade="all, delete-orphan",
    )

    quizzes = relationship(
        "Quiz",
        back_populates="document",
        cascade="all, delete-orphan",
    )

    tags = relationship(
        "DocumentTag",
        back_populates="document",
        cascade="all, delete-orphan",
    )
