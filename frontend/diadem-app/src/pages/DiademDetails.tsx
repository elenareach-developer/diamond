import { useState } from "react";
import { useParams } from "react-router-dom";
import { tiaras as diadems } from "../data/diadems";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  TextField,
  Button,
  Box
} from "@mui/material";

export function DiademDetails() {
  const { id } = useParams();
  const diadem = diadems.find((d) => d.id === id);

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!diadem) return <div>Not found</div>;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    const botMsg = { role: "assistant", text: data.text };
    setMessages((prev) => [...prev, botMsg]);

    setLoading(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card
        sx={{
          maxWidth: 800,
          margin: "0 auto",
          background: "linear-gradient(135deg, #4a0072, #880e4f)",
          color: "white",
          border: "2px solid gold",
          boxShadow: "0 0 20px gold",
          borderRadius: 4
        }}
      >
        <CardMedia
          component="img"
          height="260"
          image={diadem.image}
          alt={diadem.name}
        />

        <CardContent>
          {/* ===== INFO ===== */}
          <Typography variant="h4" sx={{ color: "#ffd700" }}>
            {diadem.name}
          </Typography>

          <Typography sx={{ mt: 1, color: "#ffccbc" }}>
            {diadem.origin} • {diadem.created}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            {diadem.description}
          </Typography>

          <Typography sx={{ mt: 2, color: "#ffe082" }}>
            💎 {diadem.stones.join(", ")}
          </Typography>

          <Typography sx={{ mt: 2, color: "#00e676", fontSize: 20 }}>
            {diadem.value}
          </Typography>

          {/* ===== CHAT SECTION ===== */}
          <Box
            sx={{
              mt: 4,
              padding: 2,
              background: "rgba(0,0,0,0.3)",
              borderRadius: 3,
              border: "1px solid gold"
            }}
          >
            <Typography sx={{ mb: 1, color: "#ffd700" }}>
              💬 Дама Лата — проводник диадемы
            </Typography>

            <Box sx={{ maxHeight: 200, overflowY: "auto", mb: 2 }}>
              {messages.map((m, i) => (
                <Box
                  key={i}
                  sx={{
                    textAlign: m.role === "user" ? "right" : "left",
                    mb: 1
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-block",
                      padding: "8px 12px",
                      borderRadius: 2,
                      background:
                        m.role === "user" ? "#d1e7ff" : "rgba(255,255,255,0.15)",
                      color: m.role === "user" ? "#000" : "#fff"
                    }}
                  >
                    {m.text}
                  </Box>
                </Box>
              ))}

              {loading && (
                <Typography sx={{ color: "#ffe082" }}>
                  Дама Лата печатает...
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Спроси о диадеме..."
                size="small"
                fullWidth
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "gold" }
                  }
                }}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <Button
                variant="contained"
                onClick={sendMessage}
                sx={{
                  backgroundColor: "#ffd700",
                  color: "#000",
                  fontWeight: "bold"
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}