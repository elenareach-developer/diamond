from pydantic import BaseModel


class QuestionRequest(BaseModel):
    question: str

class CharacterRequest(BaseModel):
    description: str