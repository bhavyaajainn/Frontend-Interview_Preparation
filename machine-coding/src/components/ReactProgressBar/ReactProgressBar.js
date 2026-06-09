import React, { useEffect, useState } from "react";
import "./ReactProgressBar.css";

const ReactProgressBar = () => {
  const [bar, setBar] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBar((prevBarValue) => {
        if (prevBarValue >= 100) {
          clearInterval(interval);
          return prevBarValue;
        }
        return prevBarValue + 5;
      });
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <div
        className="progress"
        style={{ transform: `translateX(${bar - 100}%)` }}
      ></div>
    </div>
  );
};

export default ReactProgressBar;
