import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";

import AuthHeader from "../Components/AuthHeader";
import "../auth.scss";
import { useNavigate } from "react-router-dom";

const StepTwo = ({ handleNext, handlePrevious }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {};
    userData["email"] = email;
    userData["password"] = password;
    localStorage.setItem("userData", JSON.stringify(userData));
    if (password.length < 8) {
      alert("Password should be atleast 8 characters");
    } else if (!isEmailValid(email)) {
      alert("Please enter a valid email address!");
      return;
    } else {
      handleNext();
    }
  };
  const isEmailValid = (email) => {
    // Regex pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  return (
    <div className="auth-main-wrap" style={{marginTop: "120px"}}>
      <AuthHeader />
      <Form className="mt-40">
        <Form.Group className="mb-1">
          <Form.Label className="auth-title">Join MusicMate</Form.Label>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="desc-text">
            Grow your career, together
          </Form.Label>
        </Form.Group>

        <div className="d-flex flex-column justify-content-center mt-40 ">
          <Form.Group className="mb-4">
            <Form.Label className="auth-label">Email</Form.Label>
            <Form.Control
              className=" p-2 auth-input-wrap"
              type="text"
              placeholder=""
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="auth-label">Password</Form.Label>
            <Form.Control
              className=" p-2 auth-input-wrap"
              type="text"
              placeholder="8 or more characters"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>
          <Button
            className="primary-btn"
            style={{ marginTop: "48px" }}
            type="submit"
            onClick={handleSubmit}
          >
            Continue
          </Button>
          <Button
            className="secondary-btn"
            style={{ marginTop: "12px" }}
            type="submit"
            onClick={handlePrevious}
          >
            Back
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default StepTwo;
