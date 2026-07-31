from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.document import Document
from app.models.flashcard import Flashcard
from app.models.quiz import Quiz
from app.models.quiz_question import QuizQuestion
from app.models.summary import Summary
from app.services import ai_service
from app.services.document_service import get_document
from app.services.pdf_service import load_text


def _get_ready_document(*, db: Session, document_id: int, user_id: int) -> Document:
    """
    Fetch a document owned by the user and ensure text has been extracted,
    since study tools are generated from the extracted text.
    """
    document = get_document(db=db, document_id=document_id, user_id=user_id)

    if not document.extracted:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This document hasn't been text-extracted yet.",
        )

    try:
        text = load_text(document)
    except FileNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Extracted text file is missing for this document.",
        ) from exc

    if not text or not text.strip() or text.strip() == "No extractable text found in this PDF.":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This document has no extractable text to generate study tools from.",
        )

    return document, text


# --------------------------------------------------------------------------- #
# Summary
# --------------------------------------------------------------------------- #

def get_or_create_summary(
    *,
    db: Session,
    document_id: int,
    user_id: int,
    regenerate: bool = False,
) -> Summary:
    document, text = _get_ready_document(db=db, document_id=document_id, user_id=user_id)

    existing = (
        db.query(Summary)
        .filter(Summary.document_id == document.id, Summary.user_id == user_id)
        .first()
    )

    if existing and not regenerate:
        return existing

    content = ai_service.generate_summary(text)

    if existing:
        existing.content = content
        db.commit()
        db.refresh(existing)
        return existing

    summary = Summary(content=content, document_id=document.id, user_id=user_id)
    db.add(summary)
    db.commit()
    db.refresh(summary)
    return summary


def get_summary(*, db: Session, document_id: int, user_id: int) -> Summary:
    document = get_document(db=db, document_id=document_id, user_id=user_id)

    summary = (
        db.query(Summary)
        .filter(Summary.document_id == document.id, Summary.user_id == user_id)
        .first()
    )

    if summary is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No summary has been generated for this document yet.",
        )

    return summary


# --------------------------------------------------------------------------- #
# Flashcards
# --------------------------------------------------------------------------- #

def get_or_create_flashcards(
    *,
    db: Session,
    document_id: int,
    user_id: int,
    count: int = 10,
    regenerate: bool = False,
) -> list[Flashcard]:
    document, text = _get_ready_document(db=db, document_id=document_id, user_id=user_id)

    existing = (
        db.query(Flashcard)
        .filter(Flashcard.document_id == document.id, Flashcard.user_id == user_id)
        .all()
    )

    if existing and not regenerate:
        return existing

    if existing and regenerate:
        for card in existing:
            db.delete(card)
        db.commit()

    generated = ai_service.generate_flashcards(text, count=count)

    cards = [
        Flashcard(
            question=item["question"],
            answer=item["answer"],
            document_id=document.id,
            user_id=user_id,
        )
        for item in generated
    ]

    db.add_all(cards)
    db.commit()

    for card in cards:
        db.refresh(card)

    return cards


def list_flashcards(*, db: Session, document_id: int, user_id: int) -> list[Flashcard]:
    document = get_document(db=db, document_id=document_id, user_id=user_id)

    return (
        db.query(Flashcard)
        .filter(Flashcard.document_id == document.id, Flashcard.user_id == user_id)
        .all()
    )


# --------------------------------------------------------------------------- #
# Quiz
# --------------------------------------------------------------------------- #

def get_or_create_quiz(
    *,
    db: Session,
    document_id: int,
    user_id: int,
    count: int = 5,
    regenerate: bool = False,
) -> Quiz:
    document, text = _get_ready_document(db=db, document_id=document_id, user_id=user_id)

    existing = (
        db.query(Quiz)
        .filter(Quiz.document_id == document.id)
        .first()
    )

    if existing and not regenerate:
        return existing

    if existing and regenerate:
        db.delete(existing)
        db.commit()

    generated = ai_service.generate_quiz(text, count=count)

    quiz = Quiz(title=generated["title"], document_id=document.id)
    db.add(quiz)
    db.flush()  # get quiz.id before adding questions

    for item in generated["questions"]:
        db.add(
            QuizQuestion(
                question=item["question"],
                option_a=item["option_a"],
                option_b=item["option_b"],
                option_c=item["option_c"],
                option_d=item["option_d"],
                correct_answer=item["correct_answer"],
                quiz_id=quiz.id,
            )
        )

    db.commit()
    db.refresh(quiz)
    return quiz


def get_quiz(*, db: Session, document_id: int, user_id: int) -> Quiz:
    document = get_document(db=db, document_id=document_id, user_id=user_id)

    quiz = (
        db.query(Quiz)
        .filter(Quiz.document_id == document.id)
        .first()
    )

    if quiz is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No quiz has been generated for this document yet.",
        )

    return quiz
