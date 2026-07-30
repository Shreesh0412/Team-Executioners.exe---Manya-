from sqlalchemy import Column, Integer, Text, ForeignKey

from app.core.database import Base


class Flashcard(Base):

    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True)

    question = Column(Text)

    answer = Column(Text)

    document_id = Column(Integer, ForeignKey("documents.id"))

    user_id = Column(Integer, ForeignKey("users.id"))