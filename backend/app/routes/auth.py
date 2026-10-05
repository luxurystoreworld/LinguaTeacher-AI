from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User

router = APIRouter()


@router.post("/register")
def register(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):

    existing = db.query(User).filter(User.email == email).first()

    if existing:
        return {
            "success": False,
            "message": "Email already exists."
        }

    user = User(
        username=username,
        email=email,
        password=password,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "success": True,
        "message": "User created successfully."
    }