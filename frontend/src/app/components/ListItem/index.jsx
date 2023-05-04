import { Row, Col } from "react-bootstrap";
import "./index.scss";
import { ReactComponent as BoookmarkIcon } from "../../../assets/icons/bookmarked.svg";

const ListItem = ({
  profilePic,
  heading,
  subheading,
  caption,
  isBookmarked,
}) => {
  return (
    <div
      className="message-details"
      style={{ marginLeft: "20px", marginTop: "10px" }}
    >
      <Row
        className="flex-row align-items-center"
        style={{
          height: "67px",
        }}
      >
        <Col xs={1}>
          <img
            style={{
              backgroundColor: "#9CC2FF",
              width: "38px",
              height: "38px",
              borderRadius: "50px",
              padding: "2px",
            }}
            src={profilePic}
            alt="profile pic"
          />
        </Col>
        <Col xs={8} style={{ marginLeft: "15px" }}>
          <Row>
            <div className="heading">{heading}</div>
            <div className="subheading">{subheading}</div>
            <div className="caption">{caption}</div>
          </Row>
        </Col>
        {isBookmarked && (
          <Col xs={3}>
            <BoookmarkIcon style={{ marginLeft: "30px" }} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ListItem;
