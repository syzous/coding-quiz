import { leaderBoard } from "../data/leaderBoardData";
import { roomsMap } from "../data/roomData";
import { TLeaderBoard } from "../types/leaderBoardType";
import {
  ERoomStatus,
  TQuestion,
  TRoomInfo,
  TRoomMap,
  UserQuiz,
} from "../types/roomType";
import { getShuffledArr } from "../utils/array";
import {
  getUserScoreLeaderBoard,
  updateScoreToLeaderBoard,
} from "./leaderBoardController";

export const createNewRoom = (roomId: string) => {
  roomsMap[roomId] = {
    questions: [],
    status: ERoomStatus.QUIZ_START,
    maxTimeQuiz: Date.now(),
    timeout: 20000,
    quiz: {},
  };
  return roomsMap[roomId];
};

export const deleteRoom = (roomId: string) => {
  delete roomsMap[roomId];
};

export const quizStart = (roomId: string, questions: TQuestion[]) => {
  const roomInfo = roomsMap[roomId];
  roomInfo.status = ERoomStatus.QUIZ_INPROGRESS;
  roomInfo.maxTimeQuiz = Date.now() + roomInfo.timeout;
  roomInfo.questions = getShuffledArr(questions)
    .slice(0, 10)
    .map((question) => {
      question.allAnswer = getShuffledArr(question.allAnswer);
      return question;
    });
  const roomQuiz = roomInfo.quiz;
  Object.keys(roomQuiz).forEach((key) => {
    roomQuiz[key] = {
      answeredQuestions: [],
      totalScore: 0,
      currentQuestionIndex: 0,
      isDone: false,
    };
  });
};

export const quizEnd = (roomId: string) => {
  const roomInfo = roomsMap[roomId];
  if (
    roomInfo.status === ERoomStatus.QUIZ_END ||
    roomInfo.status === ERoomStatus.QUIZ_START
  ) {
    return;
  }
  roomInfo.status = ERoomStatus.QUIZ_END;
  Object.entries(roomInfo.quiz).forEach(([userName, userQuizInfo]) => {
    updateScoreToLeaderBoard(
      userName,
      (getUserScoreLeaderBoard(userName) || 0) + userQuizInfo.totalScore
    );
  });
};

export const getRoomInfo = (roomId: string) => {
  return roomsMap[roomId];
};

export const addUserToRoom = (roomId: string, userName: string) => {
  if (roomsMap[roomId].quiz) {
    roomsMap[roomId].quiz[userName] = {
      answeredQuestions: [],
      totalScore: 0,
      currentQuestionIndex: 0,
      isDone: false,
    };
  }
};

export const deleteUserInRoom = (roomId: string, userName: string) => {
  if (roomsMap[roomId].quiz[userName]) {
    delete roomsMap[roomId].quiz[userName];
  }
};

export const getUserQuiz = (roomId: string, userName: string) => {
  return roomsMap[roomId]?.quiz?.[userName];
};

export const updateUserQuiz = (
  roomId: string,
  userName: string,
  newUserQuiz: UserQuiz
) => {
  if (roomsMap[roomId]?.quiz?.[userName]) {
    roomsMap[roomId].quiz[userName] = newUserQuiz;
  }
};

export const userAnswerQuiz = (
  roomId: string,
  userName: string,
  currentQuestionIndex: number,
  userAnswer: string
) => {
  const roomInfo = roomsMap[roomId];

  const userQuizInfo = roomInfo.quiz[userName];
  if (userQuizInfo.isDone) {
    return;
  }
  if (currentQuestionIndex >= roomInfo.questions.length - 1) {
    userQuizInfo.isDone = true;
    const isQuizEnd = Object.entries(roomInfo.quiz).every(([_, userQuiz]) => {
      return userQuiz.isDone;
    });
    if (isQuizEnd) {
      quizEnd(roomId);
    }
  }

  const currentQuestion = roomInfo.questions[currentQuestionIndex];
  userQuizInfo.answeredQuestions.push(currentQuestion);
  userQuizInfo.currentQuestionIndex = currentQuestionIndex;
  if (currentQuestion.correctAnswer === userAnswer) {
    userQuizInfo.totalScore += currentQuestion.score;
  }
};
