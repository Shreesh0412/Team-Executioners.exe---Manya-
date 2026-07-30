from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(Integer, primary_key=True)

    start_time = Column(DateTime, default=datetime.utcnow)

    end_time = Column(DateTime)

    total_minutes = Column(Integer)

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="study_sessions")
