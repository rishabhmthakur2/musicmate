import ListItem from "app/components/ListItem";
import MMLogo from "../../../assets/icons/MusicMate List Item Logo.svg";
import "./listGroup.scss";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
const ListGroup = ({
  groupName,
  listData,
  isCompressedView,
  setIsCompressedView,
  resultType,
  setSelectedFilters,
}) => {
  const [numberOfItemsToShow, setNumberOfItemsToShow] = useState(3);

  const onExpandResults = () => {
    setIsCompressedView(false);
    setNumberOfItemsToShow(listData.length);
    setSelectedFilters([groupName]);
  };

  return (
    <>
      {listData.length > 0 && (
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
            {listData.slice(0, numberOfItemsToShow).map((object, index) => {
              return (
                <Row>
                  <ListItem
                    profilePic={MMLogo}
                    heading={
                      resultType === "Gigs"
                        ? object?.Name
                        : resultType === "People"
                        ? object?.FirstName + " " + object?.LastName
                        : object?.Title
                    }
                    subheading={object?.Skills}
                    caption={
                      resultType === "Gigs"
                        ? object?.LocationName
                        : resultType === "People"
                        ? object?.Location?.city
                        : object?.Description
                    }
                    // isBookmarked={true}
                  />
                </Row>
              );
            })}

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
                onClick={onExpandResults}
              >
                See all {groupName.toLowerCase()}
              </div>
            )}
          </Col>
        </div>
      )}
    </>
  );
};

export default ListGroup;
