import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";
import axios from "axios";
import AuthHeader from "../Components/AuthHeader";
import "../auth.scss";
import { useNavigate } from "react-router-dom";

const StepFour = ({ handleNext, handlePrevious }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [stageName, setStageName] = useState("");
  const [nameType, setNameType] = useState("Full Name");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log({ userData });
    setNameType(userData["nameType"]);
  }, []);

  const registerUser = async (userData) => {
    const userRegistration = {
      FirstName: userData.firstName,
      LastName: userData.lastName,
      EmailId: userData.email,
      Password: userData.password,
    };
    const userId = await axios.post(
      "http://localhost:8000/users",
      userRegistration
    );
    console.log(userId.data.createdUser._id);
    return userId.data.createdUser._id;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      nameType === "Full Name" &&
      firstName.length > 0 &&
      lastName.length > 0
    ) {
      userData["firstName"] = firstName;
      userData["lastName"] = lastName;
    } else if (nameType === "Stage Name" && stageName.length > 0) {
      userData["firstName"] = stageName;
      userData["lastName"] = "";
    } else {
      alert("Invalid/Missing inputs!");
    }
    const userId = await registerUser(userData);
    userData["userId"] = userId;
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/welcome");
  };
  return (
    <div className="auth-main-wrap" style={{ marginTop: "120px" }}>
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
          {nameType === "Full Name" && (
            <>
              <Form.Group className="mb-4">
                <Form.Label className="auth-label">First Name</Form.Label>
                <Form.Control
                  className=" p-2 auth-input-wrap"
                  type="text"
                  placeholder=""
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="auth-label">Last Name</Form.Label>
                <Form.Control
                  className=" p-2 auth-input-wrap"
                  type="text"
                  placeholder=""
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </Form.Group>
            </>
          )}
          {nameType === "Stage Name" && (
            <Form.Group className="mb-4">
              <Form.Label className="auth-label">Stage Name</Form.Label>
              <Form.Control
                className=" p-2 auth-input-wrap"
                type="text"
                placeholder=""
                onChange={(event) => {
                  setStageName(event.target.value);
                }}
              />
            </Form.Group>
          )}
          <p className="tnc-text" style={{ marginTop: "48px" }}>
            By clicking Agree & Join, you agree to MusicMate’s{" "}
            <span style={{ color: "#3A86FF" }}>
              User Agreement, Privacy Policy, & Cookie Policy
            </span>
            .
          </p>
          <Button
            className="primary-btn"
            style={{ marginTop: "18px" }}
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
export default StepFour;
