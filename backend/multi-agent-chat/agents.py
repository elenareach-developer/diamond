import os
from groq import Groq

from dotenv import load_dotenv


load_dotenv()



from prompts import (
    PROFESSOR_PROMPT,
    STUDENT_PROMPT,
    COMMON_PERSON_PROMPT,
    COMMENT_PROMPT
)

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL = "openai/gpt-oss-120b"


def ask_llm(prompt: str):

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def professor(customer_question):
    return ask_llm(
        PROFESSOR_PROMPT.format(
            question=customer_question
        )
    )


def student(customer_question):
    return ask_llm(
        STUDENT_PROMPT.format(
            question=customer_question
        )
    )


def common_person(customer_question):
    return ask_llm(
        COMMON_PERSON_PROMPT.format(
            question=customer_question
        )
    )


def comment(role, own_answer, other_answer):

    return ask_llm(
        COMMENT_PROMPT.format(
            role=role,
            own_answer=own_answer,
            other_answer=other_answer
        )
    )