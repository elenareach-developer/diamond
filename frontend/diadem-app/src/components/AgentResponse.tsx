import {
    Box,
    Card,
    CardContent,
    Divider,
    Typography
  } from "@mui/material";
  
  type Props = {
    agents: {
      professor: {
        answer: string;
        comments: {
          student: string;
          common_person: string;
        };
      };
      student: {
        answer: string;
        comments: {
          professor: string;
          common_person: string;
        };
      };
      common_person: {
        answer: string;
        comments: {
          professor: string;
          student: string;
        };
      };
    };
  };
  
  export default function AgentResponse({ agents }: Props) {
    return (
      <Box sx={{ mb: 3 }}>
        {/* Профессор */}
        <Card
          sx={{
            mb: 2,
            bgcolor: "#1e1e1e",
            color: "white",
            border: "1px solid gold"
          }}
        >
          <CardContent>
            <Typography variant="h6">
              🎓 Профессор
            </Typography>
  
            <Typography sx={{ mt: 1 }}>
              {agents.professor.answer}
            </Typography>
  
            <Divider sx={{ my: 2 }} />
  
            <Typography variant="body2">
              📚 Ученик:
              {" "}
              {agents.professor.comments.student}
            </Typography>
  
            <Typography variant="body2">
              👨 Обыватель:
              {" "}
              {agents.professor.comments.common_person}
            </Typography>
          </CardContent>
        </Card>
  
        {/* Ученик */}
        <Card
          sx={{
            mb: 2,
            bgcolor: "#263238",
            color: "white"
          }}
        >
          <CardContent>
            <Typography variant="h6">
              📚 Ученик
            </Typography>
  
            <Typography sx={{ mt: 1 }}>
              {agents.student.answer}
            </Typography>
  
            <Divider sx={{ my: 2 }} />
  
            <Typography variant="body2">
              🎓 Профессор:
              {" "}
              {agents.student.comments.professor}
            </Typography>
  
            <Typography variant="body2">
              👨 Обыватель:
              {" "}
              {agents.student.comments.common_person}
            </Typography>
          </CardContent>
        </Card>
  
        {/* Обыватель */}
        <Card
          sx={{
            bgcolor: "#37474f",
            color: "white"
          }}
        >
          <CardContent>
            <Typography variant="h6">
              👨 Обыватель
            </Typography>
  
            <Typography sx={{ mt: 1 }}>
              {agents.common_person.answer}
            </Typography>
  
            <Divider sx={{ my: 2 }} />
  
            <Typography variant="body2">
              🎓 Профессор:
              {" "}
              {agents.common_person.comments.professor}
            </Typography>
  
            <Typography variant="body2">
              📚 Ученик:
              {" "}
              {agents.common_person.comments.student}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }