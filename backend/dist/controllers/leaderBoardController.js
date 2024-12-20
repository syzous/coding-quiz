"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScoreToLeaderBoard = exports.deleteUserScoreFromLeaderBoard = exports.getUserScoreLeaderBoard = void 0;
const leaderBoardData_1 = require("../data/leaderBoardData");
const getUserScoreLeaderBoard = (userName) => {
    return leaderBoardData_1.leaderBoard[userName];
};
exports.getUserScoreLeaderBoard = getUserScoreLeaderBoard;
const deleteUserScoreFromLeaderBoard = (userName) => {
    delete leaderBoardData_1.leaderBoard[userName];
};
exports.deleteUserScoreFromLeaderBoard = deleteUserScoreFromLeaderBoard;
const updateScoreToLeaderBoard = (userName, score) => {
    leaderBoardData_1.leaderBoard[userName] = score;
};
exports.updateScoreToLeaderBoard = updateScoreToLeaderBoard;
//# sourceMappingURL=leaderBoardController.js.map