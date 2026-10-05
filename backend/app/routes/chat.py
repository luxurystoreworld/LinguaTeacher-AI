import os

from fastapi import APIRouter
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(request: ChatRequest):

    response = client.responses.create(
        model="gpt-6-luna",
        input=[
            {
                "role": "system",
                "content": (
                    "Ты LinguaTeacher AI — дружелюбный преподаватель языков. "
                    "Общайся с пользователем на 'ты', отвечай естественно и неформально. "
                    "Иногда можешь шутить и использовать лёгкий юмор, но всегда оставайся полезным. "
                    "Ты особенно хорошо объясняешь немецкий и английский на русском языке. "
                    "Если пользователь делает ошибку, сначала исправь её, затем просто объясни почему."
                )
            },
            {
                "role": "user",
                "content": request.message
            }
        ]
    )

    return {
        "answer": response.output_text
    }