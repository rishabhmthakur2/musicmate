import MessageListItem from "app/components/MessageListItem";
import Profile from "../../../assets/icons/profile.svg";
import { useState } from "react";
import NavBar from "app/components/NavBar";
import SearchBar from "app/components/SearchBar";
import { ReactComponent as BackArrow } from "../../../assets/icons/back.svg";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Messages = () => {
  const navigate = useNavigate();
  const [profileUserName, setProfileUserName] = useState("Margaret Mulholland");
  const [messages, setMessages] = useState([
    {
      profilePic: Profile,
      userName: "Rishabh Thakur",
      messagePreview: "Hahaha so",
      messageTime: "1 hour ago",
      unread: true,
    },
    {
      profilePic: Profile,
      userName: "Rishabh Thakur",
      messagePreview: "Hahaha so",
      messageTime: "1 hour ago",
      unread: false,
    },
    {
      profilePic: Profile,
      userName: "Rishabh Thakur",
      messagePreview: "Hahaha so",
      messageTime: "1 hour ago",
      unread: true,
    },
    {
      profilePic: Profile,
      userName: "Rishabh Thakur",
      messagePreview: "Hahaha so",
      messageTime: "1 hour ago",
      unread: false,
    },
  ]);
  const [unreadCount, setUnreadCount] = useState(2);
  return (
    <div
      style={{
        margin: "20px 0px 0px",
        marginBottom: "70px",
        padding: "0",
        width: "100vw",
        overflowX: "hidden",
        marginTop: "20px",
      }}
    >
      <Row className="d-flex align-content-center align-items-center">
        {" "}
        <Col
          xs={1}
          style={{ marginLeft: "20px" }}
          onClick={() => {
            navigate("/landing");
          }}
        >
          <BackArrow />
        </Col>
        <Col xs={9}>
          <p
            style={{
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "24px",
              lineHeight: "29px",
              color: "#373737",
            }}
          >
            {profileUserName}
          </p>
        </Col>
        {/* <Col xs={1}>
          <p
            style={{
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "22px",
              backgroundColor: "#3A86FF",
              height: "30px",
              width: "30px",
              borderRadius: "50px",
              padding: "3px",
              marginRight: "10px",
              alignItems: "center",
              textAlign: "center",
              color: "#fff",
            }}
          >
            {unreadCount}
          </p>
        </Col> */}
      </Row>

      <div style={{ margin: "20px" }}>
        <SearchBar />
      </div>
      <p
        style={{
          margin: "0 20px 10px",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "18px",
          lineHeight: "22px",
          display: "flex",
          alignItems: "center",
        }}
      >
        Messages
      </p>
      {messages.map((message, i) => {
        return (
          <MessageListItem
            key={i}
            profilePic={message.profilePic}
            userName={message.userName}
            messagePreview={message.messagePreview}
            messageTime={message.messageTime}
            unread={message.unread}
          />
        );
      })}
      <NavBar />
    </div>
  );
};

export default Messages;
