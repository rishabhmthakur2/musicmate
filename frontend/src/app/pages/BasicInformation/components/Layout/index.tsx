import React from "react";
import { Col } from "react-bootstrap";
import { stepData } from "../../config";
import DynamicContent from "../Content";
import StepIcon from "../StepIcon";

const Layout = ({ currentStepNumber }) => {
  return (
    <>
      <Col xs="12" className="pt-3 pb-3">
        {stepData[currentStepNumber].icon && (
          <StepIcon name={stepData[currentStepNumber].icon} />
        )}
        <p className="auth-title mt-3">
          {stepData[currentStepNumber].title}{" "}
          {stepData[currentStepNumber]?.subtitle && (
            <span>{stepData[currentStepNumber]?.subtitle}</span>
          )}
        </p>
        <div>
          <DynamicContent
            componentName={stepData[currentStepNumber].component}
          />
        </div>
      </Col>
    </>
  );
};
export default Layout;
