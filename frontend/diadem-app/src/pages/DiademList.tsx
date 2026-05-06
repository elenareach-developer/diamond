// =========================
// src/pages/DiademList.tsx (COLORFUL TABLE)
// =========================
import { tiaras } from "../data/diadems";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography
} from "@mui/material";

export default function DiademList() {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ color: "#ff9100", textAlign: "center" }}
      >
        ✨ Magical Diadems ✨
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          background: "linear-gradient(135deg, #2d0036, #4a0072)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {["Name", "Origin", "Year", "Stones", "Value"].map((h) => (
                <TableCell key={h} sx={{ color: "#ffd700", fontWeight: "bold" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tiaras.map((d) => (
              <TableRow
                key={d.id}
                hover
                onClick={() => navigate(`/tiara/${d.id}`)}
                sx={{
                  cursor: "pointer",
                  '&:hover': {
                    background: "rgba(255, 215, 0, 0.2)",
                  },
                }}
              >
                <TableCell sx={{ color: "#fff" }}>{d.name}</TableCell>
                <TableCell sx={{ color: "#ffccbc" }}>{d.origin}</TableCell>
                <TableCell sx={{ color: "#ffccbc" }}>{d.created}</TableCell>
                <TableCell sx={{ color: "#ffe082" }}>{d.stones.join(", ")}</TableCell>
                <TableCell sx={{ color: "#00e676" }}>{d.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
