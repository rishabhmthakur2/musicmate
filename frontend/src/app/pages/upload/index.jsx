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
import AutocompleteDropdown from "app/components/AutocompleteDropdown";
import Loader from "app/components/Loader";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showOnProfile, setShowOnProfile] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([
    "Bossa Nova",
    "Classical",
    "Country",
    "Electronic",
    "Hip-hop",
    "Jazz",
    "Pop",
    "R&B",
    "Rock",
    "Soundtrack",
    "Alternatives",
  ]);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const inputRef = useRef(null);

  const handleUpload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      // Upload to Backend API here
      // AWS integration already completed. Need to push the data to backend API when the user clicks Finish.

      // const credentials = {
      //   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      //   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      // };
      // AWS.config.update(credentials);
      // AWS.config.region = "us-west-1";
      // const bucket = new AWS.S3({
      //   params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
      // });
      // const fileKey = `${Date.now()}-${fileName}`;
      // // Upload the file to S3
      // bucket.upload(
      //   {
      //     Key: fileKey,
      //     Body: file,
      //   },
      //   (error, data) => {
      //     if (error) {
      //       console.error(error);
      //     } else {
      //       const fileData = {
      //         data: {
      //           name: fileName,
      //           url: data.Location,
      //           genres: [...selectedGenres],
      //           description: description,
      //         },
      //         isVisible: showOnProfile,
      //       };
      //       const userData = JSON.parse(localStorage.getItem("userData")) || {};
      //       console.log({ userData });
      //       if (userData?.files) {
      //         userData["files"] = [...userData["files"], fileData];
      //       } else {
      //         userData["files"] = [fileData];
      //       }
      //       localStorage.setItem("userData", JSON.stringify(userData));
      //     }
      //   }
      // );
      navigate("/upload/success");
    }, 2000);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
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
      {isLoading && <Loader />}

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
              value={fileName}
              placeholder=""
            />
          </Form.Group>
          <AutocompleteDropdown
            options={options}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <Form.Group className="mb-4">
            <Form.Label className="desc-text">Description</Form.Label>
            <Form.Control
              className="p-2 auth-input-wrap"
              as="textarea"
              rows={2}
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
          <Row className="mt-40">
            <Col
              xs="12"
              className="d-flex align-items-center"
              style={{ marginTop: "10px" }}
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
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <Button
                className="primary-btn"
                style={{ marginTop: "28px" }}
                onClick={handleUpload}
              >
                Finish
              </Button>
              <Button
                className="secondary-btn"
                style={{ marginTop: "16px" }}
                onClick={() => navigate("/")}
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
