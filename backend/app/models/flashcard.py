from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Flashcard(Base):
    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True)

    question = Column(Text, nullable=False)

    answer = Column(Text, nullable=False)

    document_id = Column(Integer, ForeignKey("documents.id"))

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="flashcards")
