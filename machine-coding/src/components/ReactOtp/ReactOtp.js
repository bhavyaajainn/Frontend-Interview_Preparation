import { useState, useRef, useEffect } from "react";
import "./ReactOtp.css";
export const ReactOtp = ({ otpLength = 6 }) => {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    const copyOtpFields = [...otpFields];
    if (key == "Backspace") {
      copyOtpFields[index] = "";
      setOtpFields(copyOtpFields);
      if (index > 0) {
        ref.current[index - 1].focus();
      }
      return;
    }
    if (key == "ArrowLeft") {
      if (index > 0) {
        ref.current[index - 1].focus();
      }
    }

    if (key == "ArrowRight") {
      if (index + 1 < otpLength) {
        ref.current[index + 1].focus();
      }
    }
    if (isNaN(key)) {
      return;
    }

    console.log(typeof key);
    copyOtpFields[index] = key;
    if (index + 1 < otpLength) {
      ref.current[index + 1].focus();
    }
    setOtpFields(copyOtpFields);
  };

  useEffect(() => {
    ref.current["0"].focus();
  }, []);

  return (
    <div className="container">
      {otpFields.map((value, index) => {
        return (
          <input
            ref={(currentInput) => (ref.current[index] = currentInput)}
            key={index}
            type="text"
            value={value}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
};
