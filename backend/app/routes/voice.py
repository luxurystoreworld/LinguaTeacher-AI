
from fastapi import APIRouter

router = APIRouter()


@router.get("/voice/status")
async def voice_status():
    return {
        "status": "ok",
        "provider": "Gemini",
        "message": "Voice API is ready"
    }