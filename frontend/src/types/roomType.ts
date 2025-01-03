export enum ERoomStatus {
  QUIZ_START = "QUIZ_START",
  QUIZ_INPROGRESS = "QUIZ_INPROGRESS",
  QUIZ_END = "QUIZ_END",
}

export type TQuestion = {
  id: number;
  question: string;
  allAnswer: string[];
  correctAnswer: string;
  score: number;
};

export type UserQuiz = {
  answeredQuestions: TQuestion[];
  totalScore: number;
  currentQuestionIndex: number;
  isDone: boolean;
};

export type TRoomInfo = {
  questions: TQuestion[];
  maxTimeQuiz: number;
  status: ERoomStatus;
  timeout: number;
  quiz: Record<string, UserQuiz>;
};

export type TRoomMap = Record<string, TRoomInfo>;
