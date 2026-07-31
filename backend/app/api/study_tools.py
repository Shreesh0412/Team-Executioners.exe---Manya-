from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.ai import (
    FlashcardListResponse,
    FlashcardResponse,
    GenerateRequest,
    QuizResponse,
    SummaryResponse,
)
from app.services.study_tools_service import (
    get_or_create_flashcards,
    get_or_create_quiz,
    get_or_create_summary,
    get_quiz,
    get_summary,
    list_flashcards,
)

router = APIRouter(
    prefix="/documents/{document_id}",
    tags=["Study Tools"],
)


# --------------------------------------------------------------------------- #
# Summary
# --------------------------------------------------------------------------- #

@router.get(
    "/summary",
    response_model=SummaryResponse,
    status_code=status.HTTP_200_OK,
    summary="Get existing summary",
)
def read_summary(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> SummaryResponse:
    return get_summary(db=db, document_id=document_id, user_id=current_user.id)


@router.post(
    "/summary",
    response_model=SummaryResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate (or fetch cached) AI summary",
)
def create_summary(
    document_id: int,
    payload: GenerateRequest | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> SummaryResponse:
    regenerate = bool(payload and payload.regenerate)
    return get_or_create_summary(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
        regenerate=regenerate,
    )


# --------------------------------------------------------------------------- #
# Flashcards
# --------------------------------------------------------------------------- #

@router.get(
    "/flashcards",
    response_model=FlashcardListResponse,
    status_code=status.HTTP_200_OK,
    summary="Get existing flashcards",
)
def read_flashcards(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> FlashcardListResponse:
    cards = list_flashcards(db=db, document_id=document_id, user_id=current_user.id)
    return FlashcardListResponse(document_id=document_id, flashcards=cards)


@router.post(
    "/flashcards",
    response_model=FlashcardListResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate (or fetch cached) AI flashcards",
)
def create_flashcards(
    document_id: int,
    payload: GenerateRequest | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> FlashcardListResponse:
    count = (payload.count if payload and payload.count else 10)
    regenerate = bool(payload and payload.regenerate)

    cards = get_or_create_flashcards(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
        count=count,
        regenerate=regenerate,
    )
    return FlashcardListResponse(document_id=document_id, flashcards=cards)


# --------------------------------------------------------------------------- #
# Quiz
# --------------------------------------------------------------------------- #

@router.get(
    "/quiz",
    response_model=QuizResponse,
    status_code=status.HTTP_200_OK,
    summary="Get existing quiz",
)
def read_quiz(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> QuizResponse:
    return get_quiz(db=db, document_id=document_id, user_id=current_user.id)


@router.post(
    "/quiz",
    response_model=QuizResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate (or fetch cached) AI quiz",
)
def create_quiz(
    document_id: int,
    payload: GenerateRequest | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> QuizResponse:
    count = (payload.count if payload and payload.count else 5)
    regenerate = bool(payload and payload.regenerate)

    return get_or_create_quiz(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
        count=count,
        regenerate=regenerate,
    )
