import { Box, Button } from "@mui/material";
import { TQuestion } from "../types/roomType";

export const Question = ({
  question,
  index,
  countDown,
  isGameInprogress,
  isUserFinished,
  onAnswer,
}: {
  question: TQuestion;
  index: number;
  countDown: number;
  isGameInprogress: boolean;
  isUserFinished: boolean;
  onAnswer: (answer: string) => void;
}) => {
  return (
    <Box key={question.id} paddingInline={4}>
      <Box
        sx={{
          borderRadius: 4,
          border: "1px solid rgba(0,0,0,0.4)",
          boxShadow: "4px",
          padding: "16px 8px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {countDown > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "50%",
              border: "1px solid black",
              backgroundColor: "white",
              padding: 1,
              width: "20px",
            }}
          >
            {countDown}
          </Box>
        )}
        Question {index + 1}: {question.question}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 1 }}>
        {question.allAnswer?.map((answer) => (
          <Button
            variant="text"
            sx={{
              width: "calc(50% - 4px)",
              margin: 0,
              textAlign: "center",
              borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.4)",
              color: "black",
            }}
            disabled={!isGameInprogress || isUserFinished}
            key={answer}
            onClick={() => onAnswer(answer)}
          >
            {answer}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
