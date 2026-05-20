# Tiara Story RAG ✨

A storytelling RAG system with multiple tiara worlds, semantic search, embeddings, and LLM routing.

The project creates independent story universes around magical tiaras and automatically routes user requests to the correct world.

Current worlds:

- Royal Sphorte Tiara ❤️
- Emerald Dream 🌿

---

## Features

- Multi-world RAG architecture
- Separate embedding space per tiara
- LLM Router
- Cosine similarity semantic search
- FastAPI API
- Dynamic storytelling generation
- Metadata-based retrieval
- Extensible architecture for new tiaras

---

## Project Structure

```text
project/
│
├── app.py
├── router.py
├── search.py
├── embeddings.py
│
├── data/
│   ├── __init__.py
│   └── documents_data.py
│
└── requirements.txt