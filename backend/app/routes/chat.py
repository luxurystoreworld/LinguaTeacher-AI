from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-3.8-flash")

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat(data: ChatRequest):
    try:
        response = model.generate_content(data.message)

        return {
            "reply": response.text
        }

    except Exception as e:
        return {
            "reply": str(e)
        }