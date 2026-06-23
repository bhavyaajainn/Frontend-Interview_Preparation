import React, { useEffect, useState, useRef } from "react";
import "./ReactStopwatch.css";

const ReactStopwatch = () => {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  const handleChange = (e, field) => {
    const value = parseInt(e.target.value, 10) || 0;

    const copyTime = { ...time };
    copyTime[field] = value;
    copyTime.minute += Math.floor(copyTime.second / 60);
    copyTime.second = copyTime.second % 60;

    copyTime.hour += Math.floor(copyTime.minute / 60);
    copyTime.minute = copyTime.minute % 60;
    setTime(copyTime);
  };

  useEffect(() => {
    if (isRunning) {
      if (
        time.hour.length == 0 &&
        time.minute.length == 0 &&
        time.second.length == 0
      ) {
        return;
      }
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const copyPrevTime = { ...prevTime };
          copyPrevTime.second--;
          if (copyPrevTime.second < 0) {
            copyPrevTime.minute--;
            copyPrevTime.second = 59;
            if (copyPrevTime.minute < 0) {
              copyPrevTime.hour--;
              copyPrevTime.minute = 59;
              if (copyPrevTime.hour < 0) {
                clearInterval(intervalRef.current);
                return {
                  hour: 0,
                  minute: 0,
                  second: 0,
                };
              }
            }
          }

          return copyPrevTime;
        });

        return () => {
          clearInterval(intervalRef.current);
        };
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime({
      hour: 0,
      minute: 0,
      second: 0,
    });
  };
  return (
    <div className="stopwatch-container">
      <div className="input-container">
        <input
          onChange={(e) => handleChange(e, "hour")}
          type="text"
          placeholder="HH"
          value={time.hour}
          disabled={isRunning}
        />
        :
        <input
          onChange={(e) => handleChange(e, "minute")}
          type="text"
          placeholder="MM"
          value={time.minute}
          disabled={isRunning}
        />
        :
        <input
          onChange={(e) => handleChange(e, "second")}
          type="text"
          placeholder="SS"
          value={time.second}
          disabled={isRunning}
        />
      </div>
      <div className="btn-container">
        <button onClick={handleStart}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default ReactStopwatch;
