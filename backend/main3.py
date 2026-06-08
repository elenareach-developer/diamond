
from http.client import HTTPException
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # твой React (Vite)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    user_input = req.message.lower()

    # very simple "AI" logic (can replace with OpenAI later)
    if "лондон" in user_input:
        text = "Ты идёшь по её следу… Лондон, Мейфэр. Закрытая коллекция. Но всё начинается не там. Хочешь увидеть место или узнать владельца?"
        point = {"lat": 51.5126, "lng": -0.1410}
    elif "париж" in user_input:
        text = "Париж. Левый берег. Всё начинается с разговора за кофе. Хочешь точку или продолжить путь?"
        point = {"lat": 48.8546, "lng": 2.3339}
    else:
        text = "Интересный вопрос… Ты ближе к разгадке, чем думаешь. Попробуй спросить про Лондон или Париж."
        point = None

    return {
        "text": text,
        "focus_point": point,
        "answer": text
    }



#What is a diadem?
#Why did queens wear diadems?
#What powers does the magical diadem have?
#What is the Ravenclaw diadem?