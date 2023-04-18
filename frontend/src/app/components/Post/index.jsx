import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Profile from "../../../assets/icons/profile.svg";
import { ReactComponent as Like } from "../../../assets/icons/like.svg";
import { ReactComponent as Bookmark } from "../../../assets/icons/bookmark-blue.svg";
import { ReactComponent as Message } from "../../../assets/images/message.svg";

function Post(props) {
  return (
    <Container
      fluid
      className="post"
      style={{
        marginBottom: "0",
        padding: "0",
        borderBottom: "2px solid #CDE0FF",
        borderTop: "2px solid #CDE0FF",
      }}
    >
      <div className="post-details" style={{ marginLeft: "20px" }}>
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
              src={props.profilePic}
              alt="Post"
            />
          </Col>
          <Col xs={10} style={{ marginLeft: "15px" }}>
            <Row>
              <div className="post-user-name">{props.userName}</div>
              <div className="post-time">{props.timePosted}</div>
            </Row>
          </Col>
        </Row>
      </div>
      {props.feedType === "Post" && (
        <>
          {props?.postImage && (
            <img
              style={{
                height: "210px",
                width: "100vw",
                margin: "0 0 10px",
                padding: "0",
              }}
              src={props.postImage}
              alt="User Profile Pic"
            />
          )}
          {props?.postPreview && (
            <div className="post-content" style={{ margin: "10px 20px 10px" }}>
              {props.postPreview}
            </div>
          )}
          <div style={{ marginLeft: "10px" }}>
            <Like
              style={{
                height: "20px",
                width: "20px",
                margin: "10px 10px 20px",
              }}
            />
            <Message
              style={{
                height: "20px",
                width: "20px",
                margin: "10px 10px 20px",
              }}
            />
          </div>
        </>
      )}
      {props.feedType === "Gig" && (
        <>
          {props?.gigTitle && (
            <div
              style={{
                margin: "10px 20px 10px",
                padding: "15px",
                backgroundColor: "#CDE0FF",
                borderRadius: "10px",
              }}
            >
              <div className="post-user-name">{props.gigTitle}</div>
              <div className="post-time" style={{ color: "#373737" }}>
                {props.gigLocation}
              </div>
              <div className="post-time">{props.gigCity}</div>
              <div
                style={{
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#373737",
                  marginTop: "20px",
                }}
              >
                Gig Description
              </div>
              <div className="post-time" style={{ color: "#373737" }}>
                {props.gigDescription}
              </div>
            </div>
          )}
          <div style={{ marginLeft: "10px" }}>
            <Bookmark
              style={{
                height: "20px",
                width: "20px",
                margin: "10px 10px 20px",
              }}
            />
            <Message
              style={{
                height: "20px",
                width: "20px",
                margin: "10px 10px 20px",
              }}
            />
          </div>
        </>
      )}
    </Container>
  );
}

function MainBody() {
  const posts = [
    {
      feedType: "Post",
      profilePic: Profile,
      postImage:
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydCUyMGNyb3dkfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      userName: "Margaret Mulholland",
      timePosted: "Just Now",
      postPreview:
        "I’m excited to share that I will soon move to New York to start my graduate studies at Berklee NYC’s Master of Arts in Creative Media and Technology program!!",
    },
    {
      feedType: "Gig",
      profilePic: Profile,
      userName: "Michael Scott",
      timePosted: "1 hour ago!",
      gigTitle: "Part-Time Pianist",
      gigLocation: "Tupper & Reed",
      gigCity: "Berkeley, California, United States",
      gigDescription:
        "Accompanying vocal and instrumental performances as assigned across many genres, including classical, musical theatre, commercial, jazz, pop and others.",
    },
  ];

  return (
    <div className="main-body">
      {posts.map((post) => (
        <Post
          feedType={post.feedType}
          profilePic={post.profilePic}
          userName={post.userName}
          timePosted={post.timePosted}
          postPreview={post.postPreview}
          postImage={post.postImage}
          gigTitle={post.gigTitle}
          gigLocation={post.gigLocation}
          gigCity={post.gigCity}
          gigDescription={post.gigDescription}
        />
      ))}
    </div>
  );
}

export default MainBody;
