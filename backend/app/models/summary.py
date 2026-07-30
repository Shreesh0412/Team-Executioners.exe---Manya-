from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Summary(Base):
    __tablename__ = "summaries"

    id = Column(Integer, primary_key=True)

    content = Column(Text)

    document_id = Column(Integer, ForeignKey("documents.id"))

    user_id = Column(Integer, ForeignKey("users.id"))