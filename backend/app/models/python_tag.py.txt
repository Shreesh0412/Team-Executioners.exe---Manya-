from sqlalchemy import Column, Integer, String, ForeignKey

from app.core.database import Base


class DocumentTag(Base):

    __tablename__ = "document_tags"

    id = Column(Integer, primary_key=True)

    tag = Column(String)

    document_id = Column(Integer, ForeignKey("documents.id"))