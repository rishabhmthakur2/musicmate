import React from "react";
import { Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

const BadgeSecondary = ({ options }) => {
  console.log({ options });
  return (
    <>
      {options &&
        options.length > 0 &&
        options.map((item, i) => (
          <Col>
            <Badge key={i} pill className="pill-wrap-selected mb-3">
              {item}
            </Badge>
          </Col>
        ))}
    </>
  );
};
export default BadgeSecondary;
