from sqlalchemy import Column, Integer, DateTime, ForeignKey
from datetime import datetime

from app.core.database import Base


class Pomodoro(Base):
    __tablename__ = "pomodoro_sessions"

    id = Column(Integer, primary_key=True)

    duration = Column(Integer)

    completed = Column(Integer, default=0)

    session_time = Column(DateTime, default=datetime.utcnow)

    user_id = Column(Integer, ForeignKey("users.id"))