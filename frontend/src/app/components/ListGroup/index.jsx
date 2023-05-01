import ListItem from "app/components/ListItem";
import MMLogo from "../../../assets/icons/MusicMate List Item Logo.svg";
import "./listGroup.scss";
import { Container, Row, Col } from "react-bootstrap";
const ListGroup = ({ groupName, listData, isCompressedView }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <Col xs={12}>
          <div
            style={{
              marginLeft: "20px",
              marginTop: "15px",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "24px",
              lineHeight: "29px",
              color: "#373737",
            }}
          >
            {groupName}
          </div>
          <Row>
            <ListItem
              profilePic={MMLogo}
              heading={"Oliver Stone"}
              subheading={"Tupper & Reed"}
              caption={"Berkeley, CA"}
              // isBookmarked={true}
            />
          </Row>
          <Row>
            <ListItem
              profilePic={MMLogo}
              heading={"Oliver Stone"}
              subheading={"Tupper & Reed"}
              caption={"Berkeley, CA"}
            />
          </Row>
          <Row>
            <ListItem
              profilePic={MMLogo}
              heading={"Oliver Stone"}
              subheading={"Tupper & Reed"}
              caption={"Berkeley, CA"}
            />
          </Row>
          {isCompressedView && (
            <div
              style={{
                marginTop: "15px",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "18px",
                lineHeight: "22px",
                color: "#9B9B9B",
                textAlign: "center",
                borderTop: "2px solid #CDE0FF",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderBottom: "4px solid #CDE0FF",
              }}
            >
              See all {groupName.toLowerCase()} results
            </div>
          )}
        </Col>
      </div>
    </>
  );
};

export default ListGroup;
