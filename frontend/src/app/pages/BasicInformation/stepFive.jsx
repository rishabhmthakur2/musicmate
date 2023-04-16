import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import BIHeader from "./components/BIHeader";
import "./biinfo.scss";
import { ReactComponent as Notification } from "../../../assets/images/notifications.svg";
import { ReactComponent as Eye } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeSelected } from "../../../assets/images/eye-selected.svg";
import BadgeMain from "./components/Badge";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const StepFour = ({ handleNext, handlePrevious }) => {
  const navigate = useNavigate();
  const [enableNotifications, setEnableNotifications] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    userData["enableNotifications"] = enableNotifications;
    localStorage.setItem("userData", JSON.stringify(userData));
    handleNext();
  };

  return (
    <div className="auth-main-wrap" style={{ marginTop: "5%" }}>
      <Row>
        <Col xs="12">
          <BIHeader />
        </Col>
        <p
          className="bi-title text-center d-flex justify-content-center align-items-center pb-0 mb-0"
          style={{ marginTop: "35px" }}
        >
          <Notification />
        </p>
      </Row>

      <Form className="mt-40">
        <Form.Group className="mb-1">
          <Form.Label className="auth-title">
            Never miss an email from a MusicMate
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="desc-text-sec">
            We promise to not spam you with useless emails and promotions
          </Form.Label>
        </Form.Group>

        <div className="d-flex flex-column justify-content-center">
          <Container>
            <Row>
              <Col xs="12" className="d-flex justify-content-center p-0">
                <Button
                  className={
                    !enableNotifications
                      ? "secondary-btn w-100"
                      : "primary-btn w-100"
                  }
                  onClick={() => {
                    setEnableNotifications(!enableNotifications);
                  }}
                >
                  Enable Notifications
                </Button>
              </Col>
              <Col xs="12" className="d-flex justify-content-center mt-3 p-0">
                <Button
                  className={
                    !enableNotifications
                      ? "primary-btn w-100"
                      : "secondary-btn w-100"
                  }
                  onClick={() => {
                    setEnableNotifications(!enableNotifications);
                  }}
                >
                  Disable Notifications
                </Button>
              </Col>
            </Row>
          </Container>
          <Row className="mt-40">
            <Col xs="6">
              <Button className="secondary-btn w-auto" onClick={handlePrevious}>
                <ArrowLeft /> Prev
              </Button>
            </Col>
            <Col xs="6" className="d-flex justify-content-end">
              <Button className="primary-btn w-auto" onClick={handleSubmit}>
                Next <ArrowRight />
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
export default StepFour;
