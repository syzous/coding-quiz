import { leaderBoard } from "../data/leaderBoardData";

export const getLeaderBoard = () => {
  return leaderBoard;
};

export const getUserScoreLeaderBoard = (userName: string) => {
  return leaderBoard[userName];
};

export const deleteUserScoreFromLeaderBoard = (userName: string) => {
  delete leaderBoard[userName];
};

export const updateScoreToLeaderBoard = (userName: string, score: number) => {
  leaderBoard[userName] = score;
};
