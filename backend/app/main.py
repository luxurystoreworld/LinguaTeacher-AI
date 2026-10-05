import asyncio
import base64
import json
import os

from dotenv import load_dotenv
from backend.app.routes.gemini_ws import router as gemini_ws_router
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from backend.app.gemini_live import GeminiLive
from backend.app.routes.chat import router as chat_router
from backend.app.routes.voice import router as voice_router

app = FastAPI(
    title="LinguaTeacher AI",
    version="1.0.0"
)
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = "models/gemini-2.5-flash-native-audio-latest"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Подключаем папку statics
app.mount(
    "/static",
    StaticFiles(directory="backend/app/static"),
    name="static"
)


# Функция загрузки HTML-страниц
def load_page(page):
    with open(f"backend/app/templates/{page}", "r", encoding="utf-8") as file:
        return HTMLResponse(file.read())


# Главная страница
@app.get("/")
def home():
    return load_page("index.html")


# Немецкий
@app.get("/german")
def german():
    return load_page("german.html")


@app.get("/german/a1")
def german_a1():
    return load_page("a1.html")


@app.get("/german/a1/lesson1")
def lesson1():
    return load_page("lesson1.html")

# Английский
@app.get("/english")
def english():
    return load_page("english.html")


# AI Teacher
@app.get("/ai")
def ai():
    return load_page("ai.html")


# Профиль
@app.get("/profile")
def profile():
    return load_page("profile.html")


# О проекте
@app.get("/about")
def about():
    return load_page("about.html")


# Подключаем API чата
app.include_router(chat_router)
app.include_router(voice_router)
app.include_router(gemini_ws_router)