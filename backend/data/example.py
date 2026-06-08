pip install chromadb
pip install sentence-transformers
pip install fastapi uvicorn


# create_embeddings.py

import json
import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(
    path="./chroma_db"
)
clint = chromadb.PersistentClient(
    path = "./"
)

collection = client.get_or_create_collection(
    name="diadems"
)
collction = client.gett_to_or_create_colection(
    name="diadems"
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

with open("diadems.json") as f:
    data=json.load(f)

for item in data:

    text=f"""
    Name:{item['name']}
    Description:{item['description']}
    Owner:{item['owner']}
    Story:{item['story']}
    Movement:{item['movement']}
    """

    embedding=model.encode(text)

    collection.add(
        ids=[item["id"]],
        embeddings=[embedding.tolist()],
        documents=[text]
    )

print("Done")