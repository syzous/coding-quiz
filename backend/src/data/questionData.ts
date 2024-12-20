import { TQuestion } from "../types/roomType";

export const questions: TQuestion[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  question: "What is the correct value?",
  correctAnswer: "correct value" + (i + 1),
  allAnswer: [
    "correct value" + (i + 1),
    "wrong value 1",
    "wrong value 2",
    "wrong value 3",
  ],
  score: 5,
}));
