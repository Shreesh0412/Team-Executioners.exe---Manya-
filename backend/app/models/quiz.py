from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Quiz(Base):

    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True)

    title = Column(String)

    document_id = Column(Integer, ForeignKey("documents.id"))

    questions = relationship(
    "QuizQuestion",
    back_populates="quiz",
    cascade="all, delete-orphan"
)
