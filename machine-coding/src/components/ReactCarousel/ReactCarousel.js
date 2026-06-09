import React, { useEffect, useState, useRef } from "react";
import "./ReactCarousel.css";
import data from "./data.json";

const ReactCarousel = () => {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const handleNext = () => {
    setIndex((prevIndex) => {
      if (prevIndex == data.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex((prevIndex) => index - 1);
    } else {
      setIndex(data.length - 1);
    }
  };

  useEffect(() => {
    ref.current = setInterval(handleNext, 1000);
    return () => {
      clearInterval(ref.current);
    };
  }, []);
  return (
    <div
      className="container"
      onMouseEnter={() => clearInterval(ref.current)}
      onMouseLeave={() => {
        ref.current = setInterval(handleNext, 1000);
      }}
    >
      <div className="left-btn" onClick={handlePrevious}>
        {"<"}
      </div>
      <img src={data[index]?.download_url} alt="" />
      <div className="right-btn" onClick={handleNext}>
        {">"}
      </div>
    </div>
  );
};

export default ReactCarousel;
