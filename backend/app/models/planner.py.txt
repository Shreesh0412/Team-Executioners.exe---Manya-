from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Planner(Base):
    __tablename__ = "planners"

    id = Column(Integer, primary_key=True)

    study_date = Column(Date)

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="planners")

    tasks = relationship("Task", back_populates="planner")