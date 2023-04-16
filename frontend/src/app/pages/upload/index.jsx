import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BIHeader from "./components/BIHeader";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { ReactComponent as Eye } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeSelected } from "../../../assets/images/eye-selected.svg";
import { ReactComponent as Thumbnail } from "../../../assets/images/thumbnail.svg";
import AWS from "aws-sdk";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showOnProfile, setShowOnProfile] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const inputRef = useRef(null);

  const handleUpload = () => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
    console.log({ s3 });
    const fileKey = `${Date.now()}-${fileName}`;

    // Upload the file to S3
    s3.upload(
      {
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
        Key: fileKey,
        Body: file,
      },
      (error, data) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`File uploaded to: ${data.Location}`);
        }
      }
    );
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    console.log({ file, fileName });
  }, [file]);

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setFile(fileObj);
    setFileName(fileObj.name);
  };
  return (
    <div className="auth-main-wrap" style={{ marginTop: "5%" }}>
      <Row>
        <Col xs="12">
          <BIHeader />
        </Col>
      </Row>

      <Form className="mt-40">
        <Form.Group className="sec-title-left">
          <Form.Label className="sec-title-left">Upload your work</Form.Label>
        </Form.Group>

        <div className="d-flex flex-column justify-content-center">
          <Row style={{ marginTop: "-20px" }}>
            <Col xs="12">
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />
              <Thumbnail onClick={handleClick} />
            </Col>
          </Row>
          <Form.Group className="mb-4 mt-4">
            <Form.Label className="desc-text">
              Title <span style={{ color: "#3A86FF" }}>(required)</span>
            </Form.Label>
            <Form.Control
              className=" p-2 auth-input-wrap"
              type="text"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="desc-text">Genre(s)</Form.Label>
            <Form.Control
              className=" p-2 auth-input-wrap"
              type="text"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="desc-text">Description</Form.Label>
            <Form.Control
              className="p-2 auth-input-wrap"
              as="textarea" rows={3}
            />
          </Form.Group>
          <Row className="mt-40">
            <Col
              xs="12"
              className="d-flex align-items-center"
              style={{ marginTop: "20px" }}
            >
              <p className="desc-text pe-2">Visible on profile</p>
              <div
                onClick={() => {
                  setShowOnProfile(!showOnProfile);
                }}
              >
                {!showOnProfile ? <Eye /> : <EyeSelected />}
              </div>
            </Col>
            <Col
              xs="12"
              className="d-flex flex-column align-items-center justify-content-center mt-2 "
            >
              <Button
                className="primary-btn"
                style={{ marginTop: "38px" }}
                onClick={handleUpload}
              >
                Finish
              </Button>
              <Button
                className="secondary-btn"
                style={{ marginTop: "16px" }}
                onClick={handleUpload}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
export default Upload;
