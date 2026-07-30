from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    filename = Column(String)

    file_path = Column(String)

    subject = Column(String)

    last_page = Column(Integer, default=1)

    uploaded_at = Column(DateTime, default=datetime.utcnow)

    user_id = Column(Integer, ForeignKey("users.id"))

    folder_id = Column(Integer, ForeignKey("folders.id"))

    owner = relationship("User", back_populates="documents")

    folder = relationship("Folder", back_populates="documents")

    bookmarks = relationship("Bookmark", back_populates="document")

    highlights = relationship("Highlight", back_populates="document")

    annotations = relationship("Annotation", back_populates="document")

    sticky_notes = relationship("StickyNote", back_populates="document")