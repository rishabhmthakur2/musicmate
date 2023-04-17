import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReactComponent as UploadSuccess } from "../../../../../assets/images/upload-success.svg";

const UploadSucess = ({}) => {
  const navigate = useNavigate();
  return (
    <Container fluid style={{ marginTop: "100px" }}>
      <Row>
        <Col xs="12" className="d-flex justify-content-center mt-5 pt-5">
          <UploadSuccess />
        </Col>
        <Col xs="12">
          <p className="main-title mt-5">Amazing!</p>
          <p className="desc-text text-center">
            Your work has been uploaded to your MusicMate Profile
          </p>
        </Col>
        <Col
          xs="12"
          className="d-flex flex-column align-items-center justify-content-center mt-2 "
        >
          <Button
            className="primary-btn"
            style={{ marginTop: "38px" }}
            onClick={() => {
              navigate("/upload");
            }}
          >
            Upload another file
          </Button>
          <Button
            className="secondary-btn"
            style={{ marginTop: "16px" }}
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default UploadSucess;
