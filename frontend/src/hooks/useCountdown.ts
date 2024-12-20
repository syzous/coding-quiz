import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";

type TUseCountDown = {
  onComplete?: () => void;
  countDown: number;
  defaultSecond?: number;
  setCountDown: Dispatch<SetStateAction<number>>;
};

export const useCountDown = ({
  countDown,
  setCountDown,
  onComplete,
}: TUseCountDown) => {
  const countDownIdInterval = useRef<ReturnType<typeof setInterval>>();

  const reset = useCallback(() => {
    if (countDownIdInterval.current) {
      return;
    }
    countDownIdInterval.current = setInterval(() => {
      setCountDown((prevSecond) => {
        const newSecond = prevSecond - 1;

        if (newSecond === 0) {
          clearInterval(countDownIdInterval.current);
          onComplete?.();
          countDownIdInterval.current = undefined;
        }

        return newSecond;
      });
    }, 1000);
  }, [onComplete, setCountDown]);

  useEffect(() => {
    return () => {
      clearInterval(countDownIdInterval.current);
      countDownIdInterval.current = undefined;
    };
  }, []);

  return { reset, countDown };
};
