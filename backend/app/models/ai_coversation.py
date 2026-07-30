from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from datetime import datetime

from app.core.database import Base


class AIConversation(Base):

    __tablename__ = "ai_conversations"

    id = Column(Integer, primary_key=True)

    prompt = Column(Text)

    response = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)

    user_id = Column(Integer, ForeignKey("users.id"))