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

 folder = relationship(
    "Folder",
    back_populates="documents",
)

owner = relationship(
    "User",
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