"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAnswerQuiz = exports.updateUserQuiz = exports.getUserQuiz = exports.deleteUserInRoom = exports.addUserToRoom = exports.getRoomInfo = exports.quizEnd = exports.quizStart = exports.deleteRoom = exports.createNewRoom = void 0;
const roomData_1 = require("../data/roomData");
const roomType_1 = require("../types/roomType");
const leaderBoardController_1 = require("./leaderBoardController");
const createNewRoom = (roomId, questions) => {
    roomData_1.roomsMap[roomId] = {
        questions,
        status: roomType_1.ERoomStatus.QUIZ_START,
        maxTimeQuiz: Date.now(),
        timeout: 50000,
        quiz: {},
    };
    return roomData_1.roomsMap[roomId];
};
exports.createNewRoom = createNewRoom;
const deleteRoom = (roomId) => {
    delete roomData_1.roomsMap[roomId];
};
exports.deleteRoom = deleteRoom;
const quizStart = (roomId) => {
    const roomInfo = roomData_1.roomsMap[roomId];
    roomInfo.status = roomType_1.ERoomStatus.QUIZ_INPROGRESS;
    roomInfo.maxTimeQuiz = Date.now() + roomInfo.timeout;
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
exports.quizStart = quizStart;
const quizEnd = (roomId) => {
    const roomInfo = roomData_1.roomsMap[roomId];
    if (roomInfo.status === roomType_1.ERoomStatus.QUIZ_END) {
        return;
    }
    roomInfo.status = roomType_1.ERoomStatus.QUIZ_END;
    Object.entries(roomInfo.quiz).forEach(([userName, userQuizInfo]) => {
        (0, leaderBoardController_1.updateScoreToLeaderBoard)(userName, (0, leaderBoardController_1.getUserScoreLeaderBoard)(userName) + userQuizInfo.totalScore);
    });
};
exports.quizEnd = quizEnd;
const getRoomInfo = (roomId) => {
    return roomData_1.roomsMap[roomId];
};
exports.getRoomInfo = getRoomInfo;
const addUserToRoom = (roomId, userName) => {
    if (roomData_1.roomsMap[roomId].quiz) {
        roomData_1.roomsMap[roomId].quiz[userName] = {
            answeredQuestions: [],
            totalScore: 0,
            currentQuestionIndex: 0,
            isDone: false,
        };
    }
};
exports.addUserToRoom = addUserToRoom;
const deleteUserInRoom = (roomId, userName) => {
    if (roomData_1.roomsMap[roomId].quiz[userName]) {
        delete roomData_1.roomsMap[roomId].quiz[userName];
    }
};
exports.deleteUserInRoom = deleteUserInRoom;
const getUserQuiz = (roomId, userName) => {
    var _a, _b;
    return (_b = (_a = roomData_1.roomsMap[roomId]) === null || _a === void 0 ? void 0 : _a.quiz) === null || _b === void 0 ? void 0 : _b[userName];
};
exports.getUserQuiz = getUserQuiz;
const updateUserQuiz = (roomId, userName, newUserQuiz) => {
    var _a, _b;
    if ((_b = (_a = roomData_1.roomsMap[roomId]) === null || _a === void 0 ? void 0 : _a.quiz) === null || _b === void 0 ? void 0 : _b[userName]) {
        roomData_1.roomsMap[roomId].quiz[userName] = newUserQuiz;
    }
};
exports.updateUserQuiz = updateUserQuiz;
const userAnswerQuiz = (roomId, userName, currentQuestionIndex, userAnswer) => {
    const roomInfo = roomData_1.roomsMap[roomId];
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
            (0, exports.quizEnd)(roomId);
        }
    }
    const currentQuestion = roomInfo.questions[currentQuestionIndex];
    userQuizInfo.answeredQuestions.push(currentQuestion);
    userQuizInfo.currentQuestionIndex = currentQuestionIndex;
    if (currentQuestion.correctAnswer === userAnswer) {
        userQuizInfo.totalScore += currentQuestion.score;
    }
};
exports.userAnswerQuiz = userAnswerQuiz;
//# sourceMappingURL=roomController.js.map