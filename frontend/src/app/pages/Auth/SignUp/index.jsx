import React, { useState } from "react";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne handleNext={handleNext} />;
      case 2:
        return (
          <StepTwo handleNext={handleNext} handlePrevious={handlePrevious} />
        );
      case 3:
        return (
          <StepThree handleNext={handleNext} handlePrevious={handlePrevious} />
        );
      case 4:
        return (
          <StepFour handleNext={handleNext} handlePrevious={handlePrevious} />
        );
      default:
        return <StepOne handleNext={handleNext} />;
    }
  };

  return <div>{renderStep()}</div>;
};

export default SignUp;
