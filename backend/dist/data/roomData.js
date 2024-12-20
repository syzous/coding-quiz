"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsMap = void 0;
const roomType_1 = require("../types/roomType");
exports.roomsMap = {
    xxx: {
        questions: [],
        status: roomType_1.ERoomStatus.QUIZ_START,
        maxTimeQuiz: 12321321,
        timeout: 50000,
        quiz: {
            lam1: {
                answeredQuestions: [],
                totalScore: 0,
                currentQuestionIndex: 2,
                isDone: false,
            },
            lam2: {
                answeredQuestions: [],
                totalScore: 0,
                currentQuestionIndex: 3,
                isDone: true,
            },
        },
    },
};
//# sourceMappingURL=roomData.js.map