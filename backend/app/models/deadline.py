from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Deadline(Base):
    __tablename__ = "deadlines"

    id = Column(Integer, primary_key=True)

    title = Column(String, nullable=False)

    deadline = Column(Date)

    type = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="deadlines")
