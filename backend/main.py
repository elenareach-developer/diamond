
from http.client import HTTPException
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from data.documents_data import emerald_docs, royal_docs 



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



from google import genai

API_KEY = "AIzaSyBYVvq-CIj9bNm-3Z3OHkBt1al4fretkYs"

client = genai.Client(api_key=API_KEY)


#LLM transletor 
def translate_query(query: str) -> str:
    prompt = f"""
       Все документы написамны в стиле дамочи и на русском языке
       переведи на русский язык в этом стиле

        {query}

        верни качественный перевод и язык на котором был написан
        """

    res = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
    )

    return (res.text or "").strip().lower()


#LLM routeter
def route_query(query: str) -> str:
    prompt = f"""
        You are a router for a knowledge system.

        Choose ONE category:
        - royal
        - emerald

        Question: {query}

        Return only one word.
        """

    res = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
       
    )

    return (res.text or "").strip().lower()


# Перевод в вектор и сементик
from typing import List, Dict, Any, Tuple
import numpy as np

def get_embedding(text: str):
    res = client.models.embed_content(
         model="gemini-embedding-001",
         contents=text
    )
    return np.array(res.embeddings[0].values)


royal_embeddings = [
    get_embedding(doc["text"])
    for doc in royal_docs
]

emerald_embeddings = [
    get_embedding(doc["text"])
    for doc in emerald_docs
]


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """
    Compute cosine similarity between two vectors.
    """
    a = np.array(a)
    b = np.array(b)

    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-10)


def search(
    query: str,
    documents: List[Dict[str, Any]],
    doc_embeddings: List[np.ndarray],
    get_embedding,
    top_k: int = 2
) -> List[Tuple[float, Dict[str, Any]]]:
    """
    Semantic search using cosine similarity.
    """

    # 1. embedding для запроса
    query_embedding = np.array(get_embedding(query))

    # 2. считаем similarity
    scores = []

    for doc, doc_emb in zip(documents, doc_embeddings):
        score = cosine_similarity(query_embedding, doc_emb)
        scores.append((score, doc))

    # 3. сортировка по убыванию
    scores.sort(key=lambda x: x[0], reverse=True)

    # 4. top-k
    return scores[:top_k]




@app.post("/smartResponse")
def smartResponse(req: ChatRequest):

    question = req.message
    royal_embeddings
  

    route = route_query(question)
    # 0 translate querry in russian
    query_translate = translate_query(question)
    if route == "royal":
        docs = royal_docs
        embeddings = royal_embeddings
    else:
        docs = emerald_docs
        embeddings = emerald_embeddings

    results = search(query_translate, docs, embeddings, get_embedding, top_k=3)

    context = "\n\n".join([doc["text"] for _, doc in results])

    prompt = f"""
        Context:
        {context}

        Question:
        {question}

        Rules:
        - Detect language of the question
        - Answer in the same language
        - Use ONLY context
        - If missing → say you don't know
        """

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
    )

    return {
        "route": route,
        "context": context,
        "answer": response.text
    }
    
#What is a diadem?
#Why did queens wear diadems?
#What powers does the magical diadem have?
#What is the Ravenclaw diadem?