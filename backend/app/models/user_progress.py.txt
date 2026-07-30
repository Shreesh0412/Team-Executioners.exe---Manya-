from sqlalchemy import Column, Integer, Float, ForeignKey

from app.core.database import Base


class UserProgress(Base):

    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True)

    completion = Column(Float)

    study_hours = Column(Float)

    streak = Column(Integer)

    user_id = Column(Integer, ForeignKey("users.id"))