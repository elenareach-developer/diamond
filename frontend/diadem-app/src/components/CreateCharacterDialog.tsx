import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress
} from "@mui/material";

type Props = {
  onCharacterCreated: (character: any) => void;
};

export default function CreateCharacterDialog({
  onCharacterCreated
}: Props) {
  const [open, setOpen] = useState(false);

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const createCharacter = async () => {
    if (!description.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8000/create-character",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            description
          })
        }
      );

      const character = await res.json();

      onCharacterCreated({
        id: crypto.randomUUID(),
        enabled: true,
        ...character
      });

      setDescription("");
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        ✨ Создать героя
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Создание нового героя
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Опишите персонажа"
            placeholder="Мудрая ведьма, объясняющая всё через сказки..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>

          <Button
            variant="contained"
            onClick={createCharacter}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              "Создать"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}