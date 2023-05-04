import { Row, Col, Button, Container } from "react-bootstrap";
import { ReactComponent as Send } from "../../../../assets/icons/sendMessage.svg";
import { ReactComponent as BackArrow } from "../../../../assets/icons/back.svg";
import { useEffect, useState } from "react";
import MMLogo from "../../../../assets/images/MMTopBarLogo.svg";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Message from "../../../../assets/images/message.svg";
import { ReactComponent as UserProfileImg } from "../../../../assets/images/profile-pic.svg";
import Location from "../../../../assets/icons/location.svg";
import NavBar from "app/components/NavBar";
import axios from "axios";
import BadgeSecondary from "../../BasicInformation/components/Badge/secondary";

const Gig = () => {
  const { id } = useParams();
  const [skills, setSkills] = useState(["Loading"]);
  const [gigType, setGigType] = useState([""]);
  const [gigDescription, setGigDescription] = useState("");
  const [gigName, setGigName] = useState("");
  const [gigCompany, setGigCompany] = useState("");
  const [gigLocation, setGigLocation] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getGigData = async () => {
      const gigId = "6452fe5227c4f54dc7a0dcf9";
      const gigData = await axios.get(`http://localhost:8000/gigs/${id}`);

      if (gigData.status === 200) {
        const data = gigData.data[0];
        setGigName(data.Name);
        setGigDescription(data.Description);
        setSkills(data.Skills);
        setGigType([data.GigType[0], data.RequiredProficiency[0] || ""]);
        setGigLocation(data.LocationName);
        setGigCompany(data.CompanyName || "");
      }
    };
    getGigData();
  }, []);

  return (
    <>
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
                navigate("/landing");
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
            {gigName}
          </div>
          <div
            className="desc-text"
            style={{
              marginTop: "10px",
              flex: "1",
            }}
          >
            {gigCompany}
          </div>
          <div
            className="desc-text"
            style={{
              marginTop: "10px",
              flex: "1",
            }}
          >
            <span>
              <img src={Location} /> {gigLocation}
            </span>
          </div>

          <Button
            className="primary-btn"
            style={{ marginTop: "40px" }}
            type="submit"
          >
            Interested? Let them know!
          </Button>
          <Button
            className="secondary-btn"
            style={{ marginTop: "5px" }}
            type="submit"
          >
            Save Gig
          </Button>
        </div>
        <div
          style={{
            position: "relative",
            left: "0",
            marginTop: "40px",
            borderBottom: "4px solid #CDE0FF",
            width: "100vw",
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
          <div className="sec-title-left">Gig Description</div>
          <p className="desc-text" style={{ marginTop: "25px" }}>
            {gigDescription}
          </p>
        </div>
        <div
          style={{
            position: "relative",
            left: "0",
            marginTop: "40px",
            borderBottom: "4px solid #CDE0FF",
            width: "100vw",
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
          <div className="sec-title-left">Gig Type:</div>
          <ul
            style={{
              marginTop: "25px",
            }}
          >
            {gigType.map((reason, i) => {
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
          <div className="sec-title-left">Top Skills Needed:</div>
          <ul
            style={{
              marginTop: "25px",
            }}
          >
            {skills.map((reason, i) => {
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
            marginLwidth: "100vw",
          }}
        ></div>
      </div>
      <NavBar />
    </>
  );
};

export default Gig;
