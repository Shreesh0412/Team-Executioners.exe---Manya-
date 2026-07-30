from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey

from app.core.database import Base


class Assignment(Base):

    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True)

    title = Column(String)

    due_date = Column(Date)

    completed = Column(Boolean, default=False)

    priority = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))