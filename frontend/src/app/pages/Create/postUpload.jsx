import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Purpose } from "../../../assets/images/createPost.svg";
import { ReactComponent as Eye } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeSelected } from "../../../assets/images/eye-selected.svg";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as Camera } from "../../../assets/icons/camera.svg";
import Popup from "app/components/Popup";
import axios from "axios";

import NavBar from "app/components/NavBar";

const PostUpload = ({ back }) => {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState("");
  const [postLength, setPostLength] = useState(0);
  const [showOnProfile, setShowOnProfile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    if (postContent.length > 0) {
      setPostLength(postContent.length);
    }
  }, [postContent]);

  const postData = async () => {
    if (postLength < 1000) {
      try {
        const postCallData = await axios.post("http://localhost:8000/posts", {
          Userid: JSON.parse(localStorage.getItem("loggedUser"))._id,
          Description: postContent,
          ShowOnProfile: showOnProfile,
        });
        if (postCallData.status === 200) {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            back();
          }, 5000);
        }
      } catch (e) {
        console.log("Something went wrong");
      }
    } else {
      alert("Exceeded character length");
    }
  };
  return (
    <>
      <div
        className="auth-main-wrap"
        style={{ padding: "40px 35px", marginBottom: "72px" }}
      >
        <Row>
          <Col xs="12">
            <Container>
              <Row>
                <p className="bi-title text-center d-flex justify-content-center align-items-center pb-0 mb-0">
                  <Logo />
                </p>
              </Row>
            </Container>
          </Col>
          <p
            className="bi-title text-center d-flex justify-content-center align-items-center pb-0 mb-0"
            style={{ marginTop: "35px" }}
          >
            <Purpose />
          </p>
        </Row>

        <Form className="mt-40">
          <Form.Group className="mb-1">
            <Form.Label className="body-heading">
              What kind of content do you want to post?
            </Form.Label>
          </Form.Group>

          <div className="d-flex flex-column justify-content-center mt-10">
            <textarea
              value={postContent}
              style={{
                border: "1px solid #CCCCCC",
                height: "250px",
                paddingTop: 0,
              }}
              onChange={(e) => {
                setPostContent(e.target.value);
              }}
            />
            <div
              className="d-flex flex-row align-items-center justify-items-center mt-1"
              style={{ justifyContent: "space-between" }}
            >
              <p
                className="d-flex flex-row align-items-center justify-items-center"
                style={{ color: "#3A86FF" }}
              >
                <Camera /> Upload Picture
              </p>{" "}
              <p
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "17px",
                  textAlign: "right",
                  color: "#9B9B9B",
                }}
              >
                {postLength}/1,000
              </p>
            </div>
            <Col
              xs="12"
              className="d-flex align-items-center"
              style={{ marginTop: "40px" }}
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
            <Row style={{ marginTop: "20px" }}>
              <Col
                xs="12"
                className="d-flex flex-column align-items-center justify-content-center mt-2 "
              >
                <Button
                  className="primary-btn"
                  disabled={postLength === 0}
                  onClick={postData}
                >
                  Post
                </Button>
                <Button className="secondary-btn mt-3" onClick={() => back()}>
                  Back
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
      <NavBar />
      {showPopup && (
        <Popup
          message="You post has been 
uploaded to the MusicMate community feed "
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};
export default PostUpload;
