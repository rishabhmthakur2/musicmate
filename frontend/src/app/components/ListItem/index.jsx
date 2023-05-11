import { Row, Col } from "react-bootstrap";
import "./index.scss";
import { ReactComponent as BoookmarkIcon } from "../../../assets/icons/bookmarked.svg";
import { ReactComponent as NonBoookmarkIcon } from "../../../assets/icons/non-bookmarked.svg";

const ListItem = ({
  profilePic,
  heading,
  subheading,
  caption,
  onClick,
  handleBookmarkChange,
  isBookmarked = false,
}) => {
  return (
    <div
      className="message-details"
      style={{ marginLeft: "20px", marginTop: "20px" }}
    >
      <Row
        className="flex-row align-items-center"
        style={{
          height: "auto",
        }}
      >
        <Col xs={1} onClick={onClick}>
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
        <Col xs={8} style={{ marginLeft: "15px" }} onClick={onClick}>
          <Row>
            <div className="heading">{heading}</div>
            <div className="subheading">{subheading}</div>
            <div className="caption">{caption}</div>
          </Row>
        </Col>
        {isBookmarked && (
          <Col>
            <BoookmarkIcon
              style={{ marginLeft: "5px" }}
              onClick={handleBookmarkChange}
            />
          </Col>
        )}
        {!isBookmarked && (
          <Col xs={2}>
            <NonBoookmarkIcon
              style={{ marginLeft: "5px" }}
              onClick={handleBookmarkChange}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ListItem;
