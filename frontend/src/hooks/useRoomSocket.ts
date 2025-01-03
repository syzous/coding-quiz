import { socket } from "../socket";
import { useCallback, useEffect, useState } from "react";
import { TQuestion, TRoomInfo } from "../types/roomType";
import { useCountDown } from "../hooks/useCountdown";

export const useRoomSocket = (roomId: string, userName: string) => {
  const [roomInfo, setRoomInfo] = useState<TRoomInfo>();
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [isUserFinished, setIsUserFinished] = useState(false);

  const resetCountdown = useCountDown({
    countDown,
    setCountDown,
    onComplete: useCallback(() => {}, []),
  }).reset;

  useEffect(() => {
    const onConnect = () => socket.emit("room:join", roomId, userName);
    const onRoomUpdate = (info: TRoomInfo) => setRoomInfo(info);

    const onQuizStart = (info: TRoomInfo) => {
      setQuestions(info.questions);
      setRoomInfo(info);
      setCurrentIndex(0);
      setCountDown(info.timeout / 1000);
      setIsUserFinished(false);
      resetCountdown();
    };

    socket.on("connect", onConnect);
    socket.on("room:join", onRoomUpdate);
    socket.on("room:leave", onRoomUpdate);
    socket.on("quiz:start", onQuizStart);
    socket.on("quiz:end", onRoomUpdate);
    socket.on("quiz:answer", onRoomUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("room:join", onRoomUpdate);
      socket.off("room:leave", onRoomUpdate);
      socket.off("quiz:start", onQuizStart);
      socket.off("quiz:end", onRoomUpdate);
      socket.off("quiz:answer", onRoomUpdate);
    };
  }, [roomId, userName, resetCountdown]);

  useEffect(() => {
    socket.emit("room:join", roomId, userName);
    return () => {
      socket.emit("room:leave", roomId, userName);
    };
  }, [roomId, userName]);

  return {
    roomInfo,
    questions,
    currentIndex,
    setCurrentIndex,
    countDown,
    isUserFinished,
    setIsUserFinished,
  };
};
