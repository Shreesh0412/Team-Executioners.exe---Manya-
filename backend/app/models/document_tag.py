from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class DocumentTag(Base):
    __tablename__ = "document_tags"

    id = Column(Integer, primary_key=True)

    tag = Column(String)

    document_id = Column(Integer, ForeignKey("documents.id"))

    document = relationship(
        "Document",
        back_populates="tags",
    )