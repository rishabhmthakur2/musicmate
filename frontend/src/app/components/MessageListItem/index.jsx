import { Row, Col } from "react-bootstrap";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const MessageListItem = ({
  profilePic,
  userName,
  messagePreview,
  messageTime,
  unread,
  senderId,
  receiverId,
  messages,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="message-details"
      style={{ marginLeft: "20px" }}
      onClick={() => {
        navigate("/messages/view", {
          state: {
            senderId,
            receiverId,
            messages,
            userName,
          },
        });
      }}
    >
      <Row className="flex-row align-items-center" style={{ height: "80px" }}>
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
            alt="message Image"
          />
        </Col>
        <Col xs={10} style={{ marginLeft: "15px" }}>
          <Row>
            <div
              className={
                unread ? "message-user-name-unread" : "message-user-name"
              }
            >
              {userName}
            </div>
            <div className={unread ? "message-time-unread" : "message-time"}>
              {messagePreview} ... {messageTime}
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MessageListItem;
