from sqlalchemy import Column, Integer, Text, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class QuizQuestion(Base):

    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True)

    question = Column(Text)

    option_a = Column(String)

    option_b = Column(String)

    option_c = Column(String)

    option_d = Column(String)

    correct_answer = Column(String)

    quiz_id = Column(Integer, ForeignKey("quizzes.id"))

    quiz = relationship("Quiz", back_populates="questions")