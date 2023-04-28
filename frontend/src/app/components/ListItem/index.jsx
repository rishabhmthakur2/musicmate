import { Row, Col } from "react-bootstrap";
import "./index.scss";

const ListItem = ({ profilePic, heading, subheading, caption }) => {
  return (
    <div
      className="message-details"
      style={{ marginLeft: "20px", marginTop: "15px" }}
    >
      <Row className="flex-row align-items-center" style={{ height: "67px" }}>
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
        <Col xs={10} style={{ marginLeft: "15px" }}>
          <Row>
            <div className="heading">{heading}</div>
            <div className="subheading">{subheading}</div>
            <div className="caption">{caption}</div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ListItem;
