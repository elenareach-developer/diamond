// TiaraPage.tsx
import { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { tiaras } from "../data/diadems";
import type { TiaraItem } from "../data/diadems";
import { Tiara } from "../components/Tiaras";
import  { LuxuryMap } from "../components/LuxuryMap";
import { journey } from "../data/diadems";

export const TiaraPage = () => {
  const [selected, setSelected] = useState<TiaraItem>(tiaras[0]);

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      
      {/* Список */}
      <Grid item xs={3}>
        {tiaras.map((t) => (
          <Button
            key={t.id}
            fullWidth
            onClick={() => setSelected(t)}
            sx={{ mb: 1 }}
            variant={selected.id === t.id ? "contained" : "outlined"}
          >
            {t.name}
          </Button>
        ))}
      </Grid>

      {/* Карточка */}
      <Grid item xs={4}>
        <Card sx={{ background: "#1a001f", color: "#fff" }}>
          <CardContent>
            <Typography variant="h5">{selected.name}</Typography>

            <Box sx={{ my: 2 }}>
              <Tiara src={selected.image} />
            </Box>

            <Typography>{selected.description}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Карта */}
      <Grid item xs={5} sx={{ height: 700 }}>
        <div>
            <LuxuryMap points={journey} onSelect={setSelected} />

            
        </div>
      </Grid>

    </Grid>
  );
};