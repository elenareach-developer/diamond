from mistralai import Mistral
import numpy as np

API_KEY = "your_key"

client = Mistral(api_key=API_KEY)

def get_embedding(text: str):
    
    response = client.embeddings.create(
        model="mistral-embed",
        inputs=[text]
    )

    return np.array(response.data[0].embedding)


text = "Bonjour, comment allez-vous?"

embedding = get_embedding(text)

print(embedding.shape)


def route_query(query: str) -> str:

    prompt = f"""
    You are a router for a knowledge system.

    Choose ONE category:
    - royal
    - emerald

    Question: {query}

    Return only one word.
    """

    response = client.chat.complete(
        model="mistral-small-latest",
        messages=[
            {
                "role": "system",
                "content": "You are a classification router. Return only one word."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    result = response.choices[0].message.content.strip().lower()

    # защита от лишнего текста
    if "royal" in result:
        return "royal"

    if "emerald" in result:
        return "emerald"

    return "royal"