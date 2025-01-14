import { act, renderHook } from "@testing-library/react";
import { useCountDown } from "../useCountdown"; // Adjust the path to your file
import { useState } from "react";

describe("useCountDown", () => {
  jest.useFakeTimers(); // Mock timers
  jest.spyOn(global, "clearInterval"); // Mock clearInterval
  it("should decrement countDown every second and call onComplete when count reaches 0", () => {
    const onCompleteMock = jest.fn();

    // Wrap the hook to provide a state-like behavior
    const { result } = renderHook(() => {
      const [countDown, setCountDown] = useState(5);
      return useCountDown({
        countDown,
        setCountDown,
        onComplete: onCompleteMock,
      });
    });

    // Start the countdown
    act(() => {
      result.current.reset();
    });

    // Simulate 5 seconds passing
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Verify the countdown reached 0
    expect(result.current.countDown).toBe(0);

    // Expect onComplete to be called
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it("should clean up the interval on unmount", () => {
    const onCompleteMock = jest.fn();

    const { result, unmount } = renderHook(() => {
      const [countDown, setCountDown] = useState(5);
      return useCountDown({
        countDown,
        setCountDown,
        onComplete: onCompleteMock,
      });
    });

    // Start the countdown
    act(() => {
      result.current.reset();
    });

    // Unmount the component
    unmount();

    // Verify the interval was cleared
    expect(global.clearInterval).toHaveBeenCalledTimes(1);
  });
});
