from sqlalchemy import Column, Integer, String, ForeignKey

from sqlalchemy.orm import relationship

from app.core.database import Base


class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True)

    page = Column(Integer)

    title = Column(String)

    document_id = Column(Integer, ForeignKey("documents.id"))

    document = relationship("Document", back_populates="bookmarks")