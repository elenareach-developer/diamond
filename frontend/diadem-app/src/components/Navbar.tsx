

// =========================
// src/components/Navbar.tsx
// =========================
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #ff1744, #ff9100, #d500f9)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 2 }}
        >
          🔮 Gypsy Diadems
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>List</Button>
      </Toolbar>
    </AppBar>
  );
}
