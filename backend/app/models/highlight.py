from sqlalchemy import Column, Integer, Text, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Highlight(Base):
    __tablename__ = "highlights"

    id = Column(Integer, primary_key=True)

    page = Column(Integer)

    selected_text = Column(Text)

    color = Column(String)

    document_id = Column(Integer, ForeignKey("documents.id"))

    document = relationship("Document", back_populates="highlights")