import React, { useState } from "react";
import "./ReactStarRating.css";

const ReactStarRating = ({ startCount = 5 }) => {
  const [starValue, setStarValue] = useState();
  const [hoverValue, setHoverValue] = useState(-1);
  return (
    <div className="container">
      {new Array(startCount).fill(0).map((_, index) => {
        return (
          <span
            key={index}
            className={
              (hoverValue == -1 && index <= starValue) || index <= hoverValue
                ? "gold"
                : ""
            }
            onClick={() => setStarValue(index)}
            onMouseEnter={() => setHoverValue(index)}
            onMouseLeave={() => setHoverValue(-1)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default ReactStarRating;
