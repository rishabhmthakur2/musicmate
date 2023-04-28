import ListItem from "app/components/ListItem";
import MMLogo from "../../../assets/icons/MusicMate List Item Logo.svg";
import "./listGroup.scss";
import { Container, Row, Col } from "react-bootstrap";
const ListGroup = ({ groupName, listData }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          paddingBottom: "20px",
          borderBottom: "4px solid #CDE0FF",
        }}
      >
        <Col xs={12}>
          <div
            style={{
              marginLeft: "20px",
              marginTop: "20px",
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
          <div
            style={{
              marginTop: "25px",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "22px",
              color: "#9B9B9B",
              textAlign: "center",
            }}
          >
            See all {groupName} results
          </div>
        </Col>
      </div>
    </>
  );
};

export default ListGroup;
