import React, { useEffect, useState } from "react";
import "./ReactTrafficLights.css";

const Signal = ({ color, isActive }) => {
  return (
    <div
      className="signal"
      style={{ backgroundColor: `${isActive ? color : "grey"}` }}
    ></div>
  );
};

const ReactTrafficLights = ({ lights = ["green", "yellow", "red"] }) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActive((prevActive) => {
        return (prevActive + 1) % lights.length;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {lights?.map((color, index) => {
        return <Signal key={index} isActive={active === index} color={color} />;
      })}
    </>
  );
};

export default ReactTrafficLights;
