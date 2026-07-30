from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class StickyNote(Base):
    __tablename__ = "sticky_notes"

    id = Column(Integer, primary_key=True)

    page = Column(Integer)

    note = Column(Text)

    document_id = Column(Integer, ForeignKey("documents.id"))

    document = relationship("Document", back_populates="sticky_notes")