// =========================
// src/pages/DiademDetails.tsx (ORNATE CARD)
// =========================
import { useState } from "react";
import { tiaras} from "../data/diadems";
import type { TiaraItem } from "../data/diadems";
import { Tiara } from "../components/Tiaras";

// =========================
// src/pages/DiademDetails.tsx (ORNATE CARD)
// =========================
import { useParams } from "react-router-dom";
import { tiaras as diadems } from "../data/diadems";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container
} from "@mui/material";

export function DiademDetails() {
  const { id } = useParams();
  const diadem = diadems.find((d) => d.id === id);

  if (!diadem) return <div>Not found</div>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card
        sx={{
          maxWidth: 650,
          margin: "0 auto",
          background: "linear-gradient(135deg, #4a0072, #880e4f)",
          color: "white",
          border: "2px solid gold",
          boxShadow: "0 0 20px gold",
        }}
      >
        <CardMedia
          component="img"
          height="260"
          image={diadem.image}
          alt={diadem.name}
        />

        <CardContent>
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
        </CardContent>
      </Card>
    </Container>
  );
}