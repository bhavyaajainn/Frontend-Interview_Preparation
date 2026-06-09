import React from "react";
import "./ReactPagination.css";
const ReactPagination = ({ pageNo, setPageNo }) => {
  const prevThreeNoArr = Array.from(
    { length: 3 },
    (_, index) => pageNo - 1 - index,
  )
    .filter((val) => val > 0)
    .reverse();

  const nextFourNoArr = Array.from({ length: 4 }, (_, index) => pageNo + index);

  const combinedArr = [...prevThreeNoArr, ...nextFourNoArr];
  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handleBack = () => {
    setPageNo(pageNo - 1);
  };
  return (
    <div className="pagination-container">
      {pageNo > 1 && (
        <div onClick={handleBack} className="page-btn">
          {"<"}
        </div>
      )}
      {combinedArr.map((val) => {
        return (
          <div
            onClick={() => setPageNo(val)}
            className={`page-btn ${val == pageNo ? "active" : ""}`}
          >
            {val}
          </div>
        );
      })}

      <div onClick={handleNext} className="page-btn">
        {">"}
      </div>
    </div>
  );
};

export default ReactPagination;
