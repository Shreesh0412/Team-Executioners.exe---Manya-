from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

from app.core.config import settings
from app.core.database import Base

# Import all models so Alembic can detect them
from app.models.ai_conversation import AIConversation
from app.models.annotation import Annotation
from app.models.assignment import Assignment
from app.models.attendance import Attendance
from app.models.bookmark import Bookmark
from app.models.deadline import Deadline
from app.models.document import Document
from app.models.document_tag import DocumentTag
from app.models.flashcard import Flashcard
from app.models.folder import Folder
from app.models.highlight import Highlight
from app.models.notification import Notification
from app.models.planner import Planner
from app.models.pomodoro import Pomodoro
from app.models.quiz import Quiz
from app.models.quiz_question import QuizQuestion
from app.models.sticky_note import StickyNote
from app.models.study_session import StudySession
from app.models.summary import Summary
from app.models.task import Task
from app.models.user import User
from app.models.user_progress import UserProgress

config = context.config

# Use DATABASE_URL from .env
config.set_main_option(
    "sqlalchemy.url",
    settings.DATABASE_URL,
)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Metadata for Alembic autogeneration
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in offline mode."""

    context.configure(
        url=config.get_main_option("sqlalchemy.url"),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
        compare_server_default=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in online mode."""

    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
