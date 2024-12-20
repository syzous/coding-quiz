import { Box, Button } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { socket } from "../socket";
import { ERoomStatus } from "../types/room";
import { Question } from "../compontents/Question";
import { useRoomSocket } from "../hooks/useRoomSocket";
import { BarChart } from "@mui/x-charts";

export const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("userName");

  useEffect(() => {
    if (!roomId || !userName) navigate("/");
  }, [navigate, roomId, userName]);

  const {
    roomInfo,
    questions,
    currentIndex,
    setCurrentIndex,
    countDown,
    isUserFinished,
    setIsUserFinished,
  } = useRoomSocket(roomId || "", userName || "");

  const isGameInprogress = roomInfo?.status === ERoomStatus.QUIZ_INPROGRESS;
  const isGameStart = roomInfo?.status === ERoomStatus.QUIZ_START;
  const isGameEnd = roomInfo?.status === ERoomStatus.QUIZ_END;

  const handleAnswer = useCallback(
    (answer: string) => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= questions.length) {
        setIsUserFinished(true);
      } else {
        setCurrentIndex(nextIndex);
      }
      socket.emit("quiz:answer", roomId, userName, currentIndex, answer);
    },
    [
      currentIndex,
      questions.length,
      roomId,
      userName,
      setIsUserFinished,
      setCurrentIndex,
    ]
  );

  if (!roomInfo) return null;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <span>
        Welcome <b>{userName}</b> to room <b>{roomId}</b>
      </span>
      <BarChart
        xAxis={[
          {
            id: "users",
            data: Object.keys(roomInfo.quiz || []),
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: Object.values(roomInfo.quiz || {}).map(
              ({ totalScore }) => totalScore
            ),
            label: "Score",
          },
        ]}
        width={500}
        height={300}
      />
      {isGameInprogress && questions[currentIndex] && (
        <Question
          question={questions[currentIndex]}
          index={currentIndex}
          countDown={countDown}
          isGameInprogress={isGameInprogress}
          isUserFinished={isUserFinished}
          onAnswer={handleAnswer}
        />
      )}
      <Box sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}>
        {(isGameStart || isGameEnd) && (
          <Button
            variant="contained"
            onClick={() => socket.emit("quiz:start", roomId, userName)}
          >
            Start Quiz
          </Button>
        )}
        {isGameEnd && <p>Game finished. You can restart the game again.</p>}
        {!isGameEnd && isUserFinished && (
          <p>Please wait for others to finish.</p>
        )}
      </Box>
    </Box>
  );
};
