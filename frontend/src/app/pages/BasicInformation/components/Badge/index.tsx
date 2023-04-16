import React from "react";
import { Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

const BadgeMain = ({ options, setOptions }) => {
  return (
    <>
      {options &&
        options.length > 0 &&
        options.map((item, i) => (
          <Col>
            <Badge
              key={i}
              pill
              className={
                item.selected ? "pill-wrap-selected mb-3" : "pill-wrap mb-3"
              }
              onClick={() => {
                const newOptions = [...options];
                newOptions[i].selected = !newOptions[i].selected;
                setOptions([...newOptions]);
              }}
            >
              {item.name}
            </Badge>
          </Col>
        ))}
    </>
  );
};
export default BadgeMain;
