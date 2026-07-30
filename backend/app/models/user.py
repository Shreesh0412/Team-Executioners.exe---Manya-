from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(150), unique=True, nullable=False)

    hashed_password = Column(String, nullable=False)

    is_verified = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    folders = relationship(
        "Folder",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    documents = relationship(
        "Document",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    planners = relationship(
        "Planner",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    assignments = relationship(
        "Assignment",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    attendance = relationship(
        "Attendance",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    deadlines = relationship(
        "Deadline",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    notifications = relationship(
        "Notification",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    study_sessions = relationship(
        "StudySession",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    pomodoro_sessions = relationship(
        "Pomodoro",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    summaries = relationship(
        "Summary",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    flashcards = relationship(
        "Flashcard",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    progress = relationship(
        "UserProgress",
        back_populates="owner",
        uselist=False,
        cascade="all, delete-orphan"
    )

    ai_conversations = relationship(
        "AIConversation",
        back_populates="owner",
        cascade="all, delete-orphan"
    )