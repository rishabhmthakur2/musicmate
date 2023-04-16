import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ReactComponent as Close } from "../../../../../assets/images/close.svg";
import "../../upload.scss";
import { ReactComponent as Logo } from "../../../../../assets/images/logo.svg";

const BIHeader = () => {
  return (
    <Container>
      <Row>
        {/* <Col xs="10"> */}
          <p className="bi-title text-center d-flex justify-content-center align-items-center pb-0 mb-0">
            <Logo />
          </p>
        {/* </Col> */}
        {/* <Col xs="2" className="d-flex justify-content-end align-items-center">
          <Close />
        </Col> */}
      </Row>
    </Container>
  );
};
export default BIHeader;
