import React, { useState } from "react";
import "./ReactVirtualizedList.css";
const LIST = Array.from({ length: 10000 }, (_, index) => index + 1);
const height = 400;
const width = 300;
const itemHeight = 35;
const ReactVirtualizedList = () => {
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)]);
  const visibleList = LIST.slice(indices[0], indices[1] + 1);
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setIndices([newStartIndex, newEndIndex]);
  };
  return (
    <div
      className="container"
      style={{ height, width, backgroundColor: "grey", overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: LIST.length * itemHeight, position: "relative" }}>
        {visibleList.map((item, index) => {
          return (
            <div
              className="item"
              style={{
                height: itemHeight,
                backgroundColor: "coral",
                borderTop: "5px solid grey",
                position: "absolute",
                top: (indices[0] + index) * itemHeight,
                width: "100%",
                textAlign: "center",
              }}
            >
              {"Item " + item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReactVirtualizedList;
