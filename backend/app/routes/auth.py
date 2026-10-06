from fastapi import APIRouter, Depends, Form
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from backend.app.database import get_db
from backend.app.models.user import User

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# ---------------- REGISTER ----------------

@router.post("/register")
def register(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    confirm_password: str = Form(...),
    db: Session = Depends(get_db),
):

    if password != confirm_password:
        return {
            "success": False,
            "message": "Passwords do not match."
        }

    existing = db.query(User).filter(User.email == email).first()

    if existing:
        return {
            "success": False,
            "message": "Email already exists."
        }

    user = User(
        username=username,
        email=email,
        password=pwd_context.hash(password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return RedirectResponse(
    url="/login",
    status_code=303
)


# ---------------- LOGIN ----------------

@router.post("/login")
def login(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        return {
            "success": False,
            "message": "User not found."
        }

    if not pwd_context.verify(password, user.password):
        return {
            "success": False,
            "message": "Wrong password."
        }

    return {
        "success": True,
        "message": "Login successful.",
        "username": user.username,
        "email": user.email
    }