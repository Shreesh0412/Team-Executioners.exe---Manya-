from pydantic import BaseModel, ConfigDict


class SummaryResponse(BaseModel):
    id: int
    document_id: int
    content: str

    model_config = ConfigDict(from_attributes=True)


class FlashcardResponse(BaseModel):
    id: int
    document_id: int
    question: str
    answer: str

    model_config = ConfigDict(from_attributes=True)


class FlashcardListResponse(BaseModel):
    document_id: int
    flashcards: list[FlashcardResponse]


class QuizQuestionResponse(BaseModel):
    id: int
    question: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str

    model_config = ConfigDict(from_attributes=True)


class QuizResponse(BaseModel):
    id: int
    document_id: int
    title: str
    questions: list[QuizQuestionResponse]

    model_config = ConfigDict(from_attributes=True)


class GenerateRequest(BaseModel):
    """Optional knobs for generation. All fields are optional with sane defaults."""

    count: int | None = None
    regenerate: bool = False
