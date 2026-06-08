from fastapi import FastAPI
from concurrent.futures import ThreadPoolExecutor


from agents import (
    professor,
    student,
    common_person,
    comment,
)

from prompts import CHARACTER_CREATOR_PROMPT
from models import QuestionRequest, CharacterRequest

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/chat")
def chat(request: QuestionRequest):

    question = request.question

    with ThreadPoolExecutor() as executor:

        p_future = executor.submit(
            professor,
            question
        )

        s_future = executor.submit(
            student,
            question
        )

        c_future = executor.submit(
            common_person,
            question
        )

        professor_answer = p_future.result()
        student_answer = s_future.result()
        common_answer = c_future.result()

    professor_comments = [
        comment(
            "Профессор",
            professor_answer,
            student_answer
        ),
        comment(
            "Профессор",
            professor_answer,
            common_answer
        )
    ]

    student_comments = [
        comment(
            "Ученик",
            student_answer,
            professor_answer
        ),
        comment(
            "Ученик",
            student_answer,
            common_answer
        )
    ]

    common_comments = [
        comment(
            "Обыватель",
            common_answer,
            professor_answer
        ),
        comment(
            "Обыватель",
            common_answer,
            student_answer
        )
    ]

    return {
    "question": question,

    "professor": {
        "answer": professor_answer,
        "comments": {
            "student": comment(
                "Профессор",
                professor_answer,
                student_answer
            ),
            "common_person": comment(
                "Профессор",
                professor_answer,
                common_answer
            )
        }
    },

    "student": {
        "answer": student_answer,
        "comments": {
            "professor": comment(
                "Ученик",
                student_answer,
                professor_answer
            ),
            "common_person": comment(
                "Ученик",
                student_answer,
                common_answer
            )
        }
    },

    "common_person": {
        "answer": common_answer,
        "comments": {
            "professor": comment(
                "Обыватель",
                common_answer,
                professor_answer
            ),
            "student": comment(
                "Обыватель",
                common_answer,
                student_answer
            )
        }
    }
}


@app.post("/create-character")
def create_character(req: CharacterRequest):

    prompt = CHARACTER_CREATOR_PROMPT.format(
        idea=req.description
    )

    result = ask_llm(prompt)

    return json.loads(result)