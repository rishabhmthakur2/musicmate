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
import axios from "axios";
import BadgeSecondary from "../BasicInformation/components/Badge/secondary";
import Loader from "app/components/Loader";

const Profile = () => {
  const { userId } = useParams();
  const [skills, setSkills] = useState(["Loading"]);
  const [isSkillVisible, setIsSkillVisible] = useState(true);
  const [genres, setGenres] = useState(["Loading"]);
  const [isGenreVisible, setIsGenreVisible] = useState(true);
  const [onboardingReasons, setOnboardingReasons] = useState(["Loading"]);
  const [isOnboardingReasonVisible, setIsOnboardingReasonVisible] =
    useState(true);
  const [userLocation, setUserLocation] = useState("");
  const [isUserLocationVisible, setIsUserLocationVisible] = useState("");
  const [userName, setUserName] = useState("");
  const [userHeading, setUserHeading] = useState("");
  const [isProfileOwner, setIsProfileOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getProfileData = async () => {
      const userData = JSON.parse(localStorage.getItem("loggedUser"));
      if (userData._id === userId) {
        setIsProfileOwner(true);
        setSkills([...userData.Skills]);
        setIsSkillVisible(userData.SkillsFlag);
        setGenres([...userData.Genres]);
        setIsGenreVisible(userData.GenresFlag);
        setOnboardingReasons([...userData.OnboardingReasons]);
        setIsOnboardingReasonVisible(userData.OnboardingFlag);
        setUserLocation(userData.Location.city);
        setIsUserLocationVisible(userData.LocationFlag);
        setUserName(userData.FirstName + " " + userData.LastName);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } else {
        const userDataAPI = await axios.get(
          `http://localhost:8000/users/${userId}`
        );
        if (userDataAPI.status === 200) {
          const userData = userDataAPI.data[0];
          setSkills([...userData.Skills]);
          setIsSkillVisible(userData.SkillsFlag);
          setGenres([...userData.Genres]);
          setIsGenreVisible(userData.GenresFlag);
          setOnboardingReasons([...userData.OnboardingReasons]);
          setIsOnboardingReasonVisible(userData.OnboardingFlag);
          setUserLocation(userData.Location.city);
          setIsUserLocationVisible(userData.LocationFlag);
          setUserName(userData.FirstName + " " + userData.LastName);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      }
    };
    getProfileData();
  }, []);
  const navigate = useNavigate();
  const handleMessage = async () => {
    try {
      setIsLoading(true);
      const messageData = await axios.get(
        `http://localhost:8000/messages/${
          JSON.parse(localStorage.getItem("loggedUser"))._id
        }/${userId}`
      );
      if (messageData.status === 200) {
        navigate("/messages/view", {
          state: {
            senderId: JSON.parse(localStorage.getItem("loggedUser"))._id,
            receiverId: userId,
            messages: messageData.data,
            userName: userName,
          },
        });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (e) {}
  };
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
              {userName}
            </div>
            <div
              className="desc-text"
              style={{
                marginTop: "20px",
                flex: "1",
              }}
            >
              {userHeading !== ""
                ? userHeading
                : "Freelance music technologist based in SF Bay Area"}
            </div>
            <div
              className="desc-text"
              style={{
                marginTop: "35px",
                flex: "1",
              }}
            >
              <span>
                <img src={Location} /> {userLocation}
              </span>
            </div>
            {!isProfileOwner && (
              <>
                <Button
                  className="primary-btn"
                  style={{ marginTop: "40px" }}
                  type="submit"
                  onClick={handleMessage}
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
              </>
            )}
            {isProfileOwner && (
              <>
                <Button
                  className="primary-btn"
                  style={{ marginTop: "40px" }}
                  type="submit"
                  onClick={() => {
                    navigate("/basicinfo");
                  }}
                >
                  Edit Profile
                </Button>
                <Button
                  className="tertiary-btn"
                  style={{ marginTop: "10px" }}
                  type="submit"
                >
                  Delete account
                </Button>
              </>
            )}
          </div>
          <div
            style={{
              marginTop: "40px",
              borderBottom: "4px solid #CDE0FF",
              width: "100vw",
            }}
          ></div>
          {isOnboardingReasonVisible && (
            <>
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
                  {onboardingReasons.map((reason, i) => {
                    return (
                      <li className="desc-text" key={i}>
                        {reason}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                style={{
                  marginTop: "40px",
                  borderBottom: "4px solid #CDE0FF",
                  width: "100vw",
                }}
              ></div>
            </>
          )}

          {isGenreVisible && (
            <>
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
                      <BadgeSecondary options={genres} />
                    </Row>
                  </Container>
                </div>
              </div>
              <div
                style={{
                  marginTop: "40px",
                  borderBottom: "4px solid #CDE0FF",
                  width: "100vw",
                }}
              ></div>
            </>
          )}

          {isSkillVisible && (
            <>
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
                      <BadgeSecondary options={skills} />
                    </Row>
                  </Container>
                </div>
              </div>
              <div
                style={{
                  marginTop: "40px",
                  borderBottom: "4px solid #CDE0FF",
                  width: "100vw",
                }}
              ></div>
            </>
          )}
        </>
      )}

      <NavBar />
    </div>
  );
};

export default Profile;
