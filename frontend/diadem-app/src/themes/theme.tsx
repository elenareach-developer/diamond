// =========================
// 🎨 GYPSY STYLE THEME (Bright & Decorative)
// =========================
// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#ff1744" }, // ярко-красный
    secondary: { main: "#ff9100" }, // оранжевый
    background: { default: "#1a001f" }, // темный контраст
  },
  typography: {
    fontFamily: "'Cinzel Decorative', 'Papyrus', cursive",
  },
});