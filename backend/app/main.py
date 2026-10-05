import os

from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from backend.app.database import Base, engine
from backend.app.models.user import User

from backend.app.routes.voice import router as voice_router
from backend.app.routes.gemini_ws import router as gemini_ws_router
from backend.app.routes.auth import router as auth_router

# Загружаем .env
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = "models/gemini-2.5-flash-native-audio-latest"

# Создаем приложение
app = FastAPI(
    title="LinguaTeacher AI",
    version="1.0.0",
)

# Создаем таблицы SQLite
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Статика
app.mount(
    "/static",
    StaticFiles(directory="backend/app/static"),
    name="static",
)


# ---------- HTML ----------

def load_page(page: str):
    with open(
        f"backend/app/templates/{page}",
        "r",
        encoding="utf-8",
    ) as file:
        return HTMLResponse(file.read())


@app.get("/")
def home():
    return load_page("index.html")


@app.get("/german")
def german():
    return load_page("german.html")


@app.get("/german/a1")
def german_a1():
    return load_page("a1.html")


@app.get("/german/a1/lesson1")
def lesson1():
    return load_page("lesson1.html")


@app.get("/english")
def english():
    return load_page("english.html")


@app.get("/ai")
def ai():
    return load_page("ai.html")


@app.get("/profile")
def profile():
    return load_page("profile.html")


@app.get("/about")
def about():
    return load_page("about.html")


# ---------- API ----------

app.include_router(voice_router)
app.include_router(gemini_ws_router)
app.include_router(auth_router)