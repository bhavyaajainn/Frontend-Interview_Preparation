import React, { useState } from "react";
import ReactProgressBar from "./ReactProgressBar";

const Button = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      {show && <ReactProgressBar />}
      <button onClick={() => setShow(!show)}>Toggle</button>
    </>
  );
};

export default Button;
