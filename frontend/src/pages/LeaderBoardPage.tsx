import { useEffect, useMemo, useState } from "react";
import { socket } from "../socket";
import { TLeaderBoard } from "../types/leaderBoardType";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const LeaderBoardPage = () => {
  const [boardScore, setBoardScore] = useState<TLeaderBoard>({});

  useEffect(() => {
    socket.emit("leaderboard:update");
    const onLeaderBoardScoreUpdate = (boardScoreBE: TLeaderBoard) => {
      setBoardScore(boardScoreBE);
    };

    socket.on("leaderboard:update", onLeaderBoardScoreUpdate);

    return () => {
      socket.off("leaderboard:update", onLeaderBoardScoreUpdate);
    };
  }, []);

  const boardScoreSortedArr = useMemo(() => {
    return Object.entries(boardScore).sort(([_A, scoreA], [_B, scoreB]) =>
      scoreA < scoreB ? 1 : -1
    );
  }, [boardScore]);

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <b>Leader Board</b>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boardScoreSortedArr.map(([userName, score], index) => (
              <TableRow
                key={userName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{userName}</TableCell>
                <TableCell>{score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
