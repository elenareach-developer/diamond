import React, { useState, useRef } from "react";

export default function RenataPage1() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<any>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    const botMessage = { role: "assistant", text: data.answer };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);

    if (data.focus_point && mapRef.current) {
      mapRef.current.flyTo({
        center: [data.focus_point.lng, data.focus_point.lat],
        zoom: 14
      });
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>

      {/* CHAT */}
      <div style={{ width: "100%", maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column" }}>

        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
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

          {loading && <p>Дама Лата печатает...</p>}
        </div>

        {/* INPUT */}
        <div style={{ display: "flex", padding: 10, borderTop: "1px solid #ccc" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Спроси про диадему..."
            style={{ flex: 1, padding: 10 }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} style={{ marginLeft: 10 }}>
            Отправить
          </button>
        </div>

      </div>
    </div>
  );
}