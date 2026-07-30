from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from app.core.database import Base


class Folder(Base):
    __tablename__ = "folders"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "name",
            name="uq_user_folder_name",
        ),
    )

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(100),
        nullable=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        nullable=False,
    )

    owner = relationship(
        "User",
        back_populates="folders",
    )

    documents = relationship(
        "Document",
        back_populates="folder",
        cascade="all, delete-orphan",
    )
