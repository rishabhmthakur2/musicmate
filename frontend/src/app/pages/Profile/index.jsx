import { Row, Col, Button, Container } from "react-bootstrap";
import { ReactComponent as Send } from "../../../assets/icons/sendMessage.svg";
import { ReactComponent as BackArrow } from "../../../assets/icons/back.svg";
import { useEffect, useState } from "react";
import MMLogo from "../../../assets/images/MMTopBarLogo.svg";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../../../assets/images/message.svg";
import { ReactComponent as UserProfileImg } from "../../../assets/images/profile-pic.svg";
import Location from "../../../assets/icons/location.svg";
import NavBar from "app/components/NavBar";
import BadgeMain from "../BasicInformation/components/Badge";
import axios from "axios";

const Profile = () => {
  const { userId } = useParams;
  console.log({ userId });
  const [options, setOptions] = useState([
    { name: "Bossa Nova", selected: true },
    { name: "Classical", selected: true },
    { name: "Country", selected: true },
  ]);
  const [skills, setSkills] = useState(["None"]);
  const [genres, setGenres] = useState(["None"]);

  useEffect(() => {
    const getProfileData = async () => {
      const userData = JSON.parse(localStorage.getItem("loggedUser"));
      if (userData._id === userId) {
        // Get data from localStorage
      } else {
        // Get data from API
      }
    };
  });
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "0",
        width: "100vw",
        overflow: "hidden",
        marginTop: "20px",
        paddingLeft: "0px",
        marginBottom: "72px",
      }}
    >
      <Row
        className="d-flex align-content-center align-items-center"
        style={{ justifyContent: "space-between" }}
      >
        <Col xs={3} style={{ marginLeft: "20px" }}>
          <BackArrow
            onClick={() => {
              navigate("/messages");
            }}
          />
        </Col>
        <Col xs={6} style={{ marginRight: "10px" }}>
          <img src={MMLogo} alt="message Image" />
        </Col>
        <Col xs={2}>
          <img
            src={Message}
            alt="Message"
            onClick={() => {
              navigate("/messages");
            }}
          />
        </Col>
      </Row>
      <div
        style={{
          marginLeft: "35px",
          marginTop: "30px",
          width: "320px",
          height: "100%",
          paddingRight: "35px",
        }}
      >
        <UserProfileImg />
        <div className="auth-title" style={{ marginTop: "25px" }}>
          Oliver Stone
        </div>
        <div
          className="desc-text"
          style={{
            marginTop: "20px",
            flex: "1",
          }}
        >
          Freelance music technologist based in SF Bay Area
        </div>
        <div
          className="desc-text"
          style={{
            marginTop: "35px",
            flex: "1",
          }}
        >
          <span>
            <img src={Location} /> Berkeley, CA{" "}
          </span>
        </div>
        <Button
          className="primary-btn"
          style={{ marginTop: "40px" }}
          type="submit"
        >
          Message
        </Button>
        <Button
          className="secondary-btn"
          style={{ marginTop: "5px" }}
          type="submit"
        >
          Save Profile
        </Button>
      </div>
      <div
        style={{
          marginTop: "40px",
          borderBottom: "4px solid #CDE0FF",
          marginLwidth: "100vw",
        }}
      ></div>
      <div
        style={{
          marginLeft: "35px",
          marginTop: "25px",
          width: "320px",
          height: "100%",
          paddingRight: "35px",
        }}
      >
        <div className="sec-title-left">Looking For:</div>
        <ul
          style={{
            marginTop: "25px",
          }}
        >
          <li className="desc-text">Gig Opportunities</li>
          <li className="desc-text">Mates to jam with</li>
        </ul>
      </div>
      <div
        style={{
          marginTop: "40px",
          borderBottom: "4px solid #CDE0FF",
          marginLwidth: "100vw",
        }}
      ></div>
      <div
        style={{
          marginLeft: "35px",
          marginTop: "25px",
          width: "320px",
          height: "100%",
          paddingRight: "35px",
        }}
      >
        <div className="sec-title-left">Genre(s)</div>
        <div
          className="d-flex flex-column justify-content-center"
          style={{ marginTop: "25px" }}
        >
          <Container className="p-0">
            <Row className="d-flex">
              <BadgeMain options={options} setOptions={setOptions} />
            </Row>
          </Container>
        </div>
      </div>
      <div
        style={{
          marginTop: "40px",
          borderBottom: "4px solid #CDE0FF",
          marginLwidth: "100vw",
        }}
      ></div>
      <div
        style={{
          marginLeft: "35px",
          marginTop: "25px",
          width: "320px",
          height: "100%",
          paddingRight: "35px",
        }}
      >
        <div className="sec-title-left">Skill(s)</div>
        <div
          className="d-flex flex-column justify-content-center"
          style={{ marginTop: "25px" }}
        >
          <Container className="p-0">
            <Row className="d-flex">
              <BadgeMain options={options} setOptions={setOptions} />
            </Row>
          </Container>
        </div>
      </div>
      <div
        style={{
          marginTop: "40px",
          borderBottom: "4px solid #CDE0FF",
          marginLwidth: "100vw",
        }}
      ></div>
      <NavBar />
    </div>
  );
};

export default Profile;
