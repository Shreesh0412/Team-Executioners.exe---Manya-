from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Annotation(Base):
    __tablename__ = "annotations"

    id = Column(Integer, primary_key=True)

    page = Column(Integer)

    content = Column(Text)

    document_id = Column(Integer, ForeignKey("documents.id"))

    document = relationship("Document", back_populates="annotations")