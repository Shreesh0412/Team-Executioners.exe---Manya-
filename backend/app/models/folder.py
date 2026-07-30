from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Folder(Base):
    __tablename__ = "folders"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship(
        "User",
        back_populates="folders"
    )

    documents = relationship(
        "Document",
        back_populates="folder",
        cascade="all, delete-orphan"
    )
