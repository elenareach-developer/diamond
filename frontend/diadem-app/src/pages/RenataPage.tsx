import React, { useState, useEffect } from "react";

const fakeDialog = [
  {
    role: "user",
    text: "Где она была в Лондоне?"
  },
  {
    role: "assistant",
    text: "Ты идёшь по её следу… Лондон, Мейфэр. Закрытая коллекция. Но всё начинается не там."
  },
  {
    role: "assistant",
    text: "Перед встречами они собирались в одном месте. Там, где разговоры важнее документов."
  },
  {
    role: "assistant",
    text: "Хочешь, я покажу тебе это место… или расскажу, кто владел диадемой?"
  },
  {
    role: "user",
    text: "Покажи место"
  },
  {
    role: "assistant",
    text: "Sketch London. Ты стоишь там, где решения принимались шёпотом."
  },
  {
    role: "assistant",
    text: "Но это только начало. След ведёт дальше… в Париж."
  }
];

export default function RenatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < fakeDialog.length) {
      const timeout = setTimeout(() => {
        setMessages((prev) => [...prev, fakeDialog[step]]);
        setStep(step + 1);
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [step]);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      
      {/* Левая часть — описание */}
      <div style={{ width: "50%", padding: "40px", background: "#f7f7f7" }}>
        <h1>💎 Путешествие диадемы</h1>
        <p>
          Это не чат-бот.  
          Это интерактивное путешествие.
        </p>

        <p>
          История артефакта, его путь через города и эпохи,  
          реальные точки в Лондоне и Париже —  
          всё это вы не читаете, а проживаете.
        </p>

        <p style={{ marginTop: 20, fontStyle: "italic" }}>
          Внутренний demo-проект
        </p>
      </div>

      {/* Правая часть — чат */}
      <div style={{ width: "50%", padding: "20px", display: "flex", flexDirection: "column" }}>
        
        <div style={{ flex: 1, overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                marginBottom: 10,
                textAlign: m.role === "user" ? "right" : "left"
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: m.role === "user" ? "#d1e7ff" : "#eee"
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Фейковые кнопки */}
        <div style={{ marginTop: 10 }}>
          <button style={{ marginRight: 10 }}>Показать на карте</button>
          <button>Идти дальше</button>
        </div>

      </div>
    </div>
  );
}