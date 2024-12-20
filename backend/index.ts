import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  addUserToRoom,
  createNewRoom,
  deleteRoom,
  deleteUserInRoom,
  getRoomInfo,
  quizEnd,
  quizStart,
  userAnswerQuiz,
} from "./src/controllers/roomController.js";
import { ERoomStatus, TQuestion } from "./src/types/roomType.js";
import { questions } from "./src/data/questionData.js";
import { getShuffledArr } from "./src/utils/array.js";
import {
  getLeaderBoard,
  getUserScoreLeaderBoard,
} from "./src/controllers/leaderBoardController.js";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  let socketMap = {};
  socket.on("room:join", (roomId: string, userName: string) => {
    const roomInfo = getRoomInfo(roomId);
    if (!roomInfo) {
      createNewRoom(roomId);
    }
    socket.join(roomId);
    addUserToRoom(roomId, userName);
    io.to(roomId).emit("room:join", getRoomInfo(roomId));
    socketMap[socket.id] = {
      roomId,
      userName,
    };
  });
  socket.on("room:leave", (roomId: string, userName: string) => {
    socket.leave(roomId);
    deleteUserInRoom(roomId, userName);

    io.to(roomId).emit("room:leave", getRoomInfo(roomId));
    delete socketMap[socket.id];
  });
  socket.on("quiz:start", (roomId: string) => {
    quizStart(roomId, questions);
    io.to(roomId).emit("quiz:start", getRoomInfo(roomId));

    setTimeout(() => {
      quizEnd(roomId);
      io.to(roomId).emit("quiz:end", getRoomInfo(roomId));
      io.emit("leaderboard:update", getLeaderBoard());
    }, getRoomInfo(roomId).timeout);
  });
  socket.on(
    "quiz:answer",
    (
      roomId: string,
      userName: string,
      currentQuestionIndex: number,
      userAnswer: string
    ) => {
      userAnswerQuiz(roomId, userName, currentQuestionIndex, userAnswer);
      const roomInfo = getRoomInfo(roomId);
      io.to(roomId).emit("quiz:answer", roomInfo);
      if (roomInfo.status === ERoomStatus.QUIZ_END) {
        io.to(roomId).emit("quiz:end", getRoomInfo(roomId));
      }
    }
  );
  socket.on("quiz:end", (roomId: string) => {
    quizEnd(roomId);
    io.to(roomId).emit("quiz:end", getRoomInfo(roomId));
    io.emit("leaderboard:update", getLeaderBoard());
  });
  socket.on("disconnect", () => {
    if (!socketMap[socket.id]) {
      return;
    }
    const { roomId, userName } = socketMap[socket.id];
    deleteUserInRoom(roomId, userName);
    io.to(roomId).emit("room:leave", getRoomInfo(roomId));
    if (!Object.keys(getRoomInfo(roomId).quiz).length) {
      deleteRoom(roomId);
    }
    delete socketMap[socket.id];
  });
  socket.on("leaderboard:update", () => {
    socket.emit("leaderboard:update", getLeaderBoard());
  });
});

httpServer.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
