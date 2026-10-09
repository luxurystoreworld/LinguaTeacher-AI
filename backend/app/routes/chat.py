from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-3.8-flash")

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


@router.post("/chat")
async def chat(data: ChatRequest):

    try:

        prompt = ""

        for msg in data.history:

            if msg.role == "user":
                prompt += f"User: {msg.content}\n"

            elif msg.role == "assistant":
                prompt += f"Assistant: {msg.content}\n"

        prompt += f"User: {data.message}\nAssistant:"

        response = model.generate_content(prompt)

        return {
            "reply": response.text
        }

    except Exception as e:

        return {
            "reply": str(e)
        }