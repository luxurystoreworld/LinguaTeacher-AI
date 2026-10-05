from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime

from backend.app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)

    password = Column(String, nullable=False)

    level = Column(String, default="A1")

    xp = Column(Integer, default=0)

    streak = Column(Integer, default=0)

    verified = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)