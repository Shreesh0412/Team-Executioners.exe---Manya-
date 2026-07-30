from sqlalchemy import Column, Float, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.core.database import Base


class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True)

    completion = Column(Float, default=0.0)

    study_hours = Column(Float, default=0.0)

    streak = Column(Integer, default=0)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False,
    )

    owner = relationship(
        "User",
        back_populates="progress",
    )