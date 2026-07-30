from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import relationship

from app.core.database import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True)

    subject = Column(String, nullable=False)

    date = Column(Date)

    attended = Column(Boolean)

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="attendance")
