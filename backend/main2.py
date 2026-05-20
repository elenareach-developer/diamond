
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
        "focus_point": point
    }

API_KEY = "AIzaSyBYVvq-CIj9bNm-3Z3OHkBt1al4fretkYs"

from google import genai

client = genai.Client(api_key=API_KEY)


documents = [
    "A diadem is a jeweled crown worn as a symbol of royalty, wisdom, or divine power.",
    
    "Ancient queens and princesses often wore diadems decorated with gold, pearls, and precious stones.",
    
    "In many legends, the magical diadem grants intelligence, authority, or hidden knowledge to its owner.",
    
    "The Ravenclaw diadem in fantasy literature is known for enhancing the wisdom of the wearer.",
    
    "Royal diadems were used in ceremonies to represent legitimacy, noble blood, and connection to the throne.",
    
    "Some historical diadems were created in Greece, Persia, and Byzantium as symbols of sacred rulership.",
    
    "A diamond diadem can contain emeralds, sapphires, rubies, and intricate silver craftsmanship.",
    
    "Museums preserve royal diadems because they reflect political power, fashion, and cultural traditions."
]

STOP_WORDS = {
    "what", "is", "a", "the", "of",
    "in", "on", "at", "to", "and"
}


@app.post("/smartResponse")
def smartResponse(req: ChatRequest):
    
    question = req.message.lower()
    if client is None:
        raise HTTPException(
            status_code=503,
            detail="Set GOOGLE_API_KEY in the environment or in backend/.env (see .env.example).",
        )

    relevant_docs = []
    q = question.lower().split()
    for doc in documents:
        if any(word in doc.lower() for word in q):
            relevant_docs.append(doc)

    context = "\n".join(relevant_docs)

    prompt = f"""
    Use the context below.

    Context:
    {context}

    Question:
    {question}
    """

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
    )

    answer = getattr(response, "text", None) or ""

    return {
        "question": question,
        "context": context,
        "answer": answer,
    }

    
#What is a diadem?
#Why did queens wear diadems?
#What powers does the magical diadem have?
#What is the Ravenclaw diadem?