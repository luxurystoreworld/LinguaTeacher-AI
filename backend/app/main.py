import os

from dotenv import load_dotenv

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware

from backend.app.database import Base, engine

from backend.app.routes.voice import router as voice_router
from backend.app.routes.gemini_ws import router as gemini_ws_router
from backend.app.routes.auth import router as auth_router
from backend.app.routes.chat import router as chat_router

# ===========================
# Load .env
# ===========================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = "models/gemini-2.5-flash-native-audio-latest"

# ===========================
# Create FastAPI
# ===========================

app = FastAPI(
    title="LinguaTeacher AI",
    version="1.0.0",
)

# ===========================
# Session
# ===========================

app.add_middleware(
    SessionMiddleware,
    secret_key="LinguaTeacherAI2026SuperSecretKey"
)

# ===========================
# Database
# ===========================

Base.metadata.create_all(bind=engine)

# ===========================
# CORS
# ===========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===========================
# Static files
# ===========================

app.mount(
    "/static",
    StaticFiles(directory="backend/app/static"),
    name="static",
)

# ===========================
# HTML Loader
# ===========================

def load_page(page: str):
    with open(
        f"backend/app/templates/{page}",
        "r",
        encoding="utf-8",
    ) as file:
        return file.read()

# ===========================
# Home
# ===========================

@app.get("/")
def home(request: Request):

    html = load_page("index.html")

    username = request.session.get("user")

    if username:
        html = html.replace("{{USER}}", username)
    else:
        html = html.replace("{{USER}}", "")

    return HTMLResponse(html)

# ===========================
# Pages
# ===========================

@app.get("/login")
def login_page():
    return HTMLResponse(load_page("login.html"))


@app.get("/register")
def register_page():
    return HTMLResponse(load_page("register.html"))


@app.get("/forgot-password")
def forgot_password():
    return HTMLResponse(load_page("forgot_password.html"))


@app.get("/ai")
def ai():
    return HTMLResponse(load_page("ai.html"))


@app.get("/about")
def about():
    return HTMLResponse(load_page("about.html"))


@app.get("/profile")
def profile():
    return HTMLResponse(load_page("profile.html"))


@app.get("/english")
def english():
    return HTMLResponse(load_page("english.html"))


@app.get("/german")
def german():
    return HTMLResponse(load_page("german.html"))


@app.get("/german/a1")
def german_a1():
    return HTMLResponse(load_page("a1.html"))


@app.get("/german/a1/lesson1")
def lesson1():
    return HTMLResponse(load_page("lesson1.html"))

# ===========================
# Routers
# ===========================

app.include_router(auth_router)
app.include_router(voice_router)
app.include_router(gemini_ws_router)
app.include_router(chat_router)