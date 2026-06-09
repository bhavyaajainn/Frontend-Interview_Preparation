import "./ReactStepper.css";
import React, { useState } from "react";

const steps = [
  {
    label: "Personal Info",
    content: <div>Personal Information Content</div>,
  },
  {
    label: "Account",
    content: <div>Account Information Content</div>,
  },
  {
    label: "Payment",
    content: <div>Payment Content</div>,
  },
  {
    label: "Confirmation",
    content: <div>Confirmation Content</div>,
  },
  {
    label: "Review",
    content: <div>Review Content</div>,
  },
];

export const ReactStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="stepper">
      <div>
        {steps.map((step, index) => {
          return (
            <div key={step.label} className="stepper-container">
              <div
                className={`step-number ${index <= currentStep ? "active" : ""}`}
              >
                {index + 1}
                {index < steps.length - 1 && (
                  <div
                    className={`step-line ${index < currentStep ? "active" : ""}`}
                  ></div>
                )}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
          );
        })}
      </div>

      <div className="stepper-content">{steps[currentStep].content}</div>
      <div className="stepper-controls">
        <button onClick={() => handleBack()}>Back</button>
        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
};
