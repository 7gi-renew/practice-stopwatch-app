import { Button } from "@mantine/core";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [seconds, setSeconds] = useState<number>(0);
  const timerIdRef = useRef<number | null>(null);

  // タイマーを1分追加する
  const plus1Minutes = () => {
    if (seconds >= 60 * 99) {
      setSeconds(60 * 99 + 59);
    } else {
      setSeconds((seconds) => seconds + 60);
    }
  };

  const plus10Minutes = () => {
    if (seconds >= 60 * 90) {
      setSeconds(60 * 99 + 59);
    } else {
      setSeconds((seconds) => seconds + 60 * 10);
    }
  };

  const resetTimer = () => {
    setSeconds(0);
  };

  const startTimer = () => {
    if (seconds > 0 && timerIdRef.current === null) {
      timerIdRef.current = setInterval(() => setSeconds((seconds) => seconds - 1), 1000);
    }
  };

  const stopTimer = () => {
    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  useEffect(() => {
    if (seconds <= 0 && timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, [seconds]);

  const padMinutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const padSeconds = (seconds % 60).toString().padStart(2, "0");

  return (
    <>
      <section id="center">
        <div className="flex gap-3">
          <div className="flex">
            <span>{padMinutes}</span>
            <p>min</p>
          </div>
          <div className="flex">
            <span>{padSeconds}</span>
            <p>sec</p>
          </div>
        </div>
        <div className="flex gap-4 mt-16">
          <Button variant="filled" color="pink" onClick={plus10Minutes}>
            +10min
          </Button>
          <Button variant="filled" color="pink" onClick={plus1Minutes}>
            +1min
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <Button variant="filled" onClick={stopTimer}>
            Stop
          </Button>
          <Button variant="filled" onClick={startTimer}>
            Start
          </Button>
          <Button variant="filled" onClick={resetTimer}>
            Reset
          </Button>
        </div>
      </section>
    </>
  );
}

export default App;
