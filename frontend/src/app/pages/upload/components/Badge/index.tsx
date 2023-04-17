import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { ReactComponent as Close } from "../../../../../assets/images/close-white.svg";

const BadgeMain = ({ options, setOptions }) => {
  return (
    <>
      {options &&
        options.length > 0 &&
        options.map((item, i) => (
            <Col xs="10">
              <Badge
                key={i}
                pill
                className="pill-wrap-selected mb-1"
                onClick={() => {
                  setOptions(item);
                }}
              >
                {item} <Close style={{ marginLeft: "10px" }} />
              </Badge>
            </Col>
        ))}
    </>
  );
};
export default BadgeMain;
