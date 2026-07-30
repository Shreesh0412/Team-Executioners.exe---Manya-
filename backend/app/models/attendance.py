from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from app.core.database import Base


class Attendance(Base):

    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True)

    subject = Column(String)

    date = Column(String)

    attended = Column(Boolean)

    user_id = Column(Integer, ForeignKey("users.id"))