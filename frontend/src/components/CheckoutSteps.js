import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Најава</Col>
      <Col className={props.step2 ? "active" : ""}>Адреса</Col>
      <Col className={props.step3 ? "active" : ""}>Плаќање</Col>
      <Col className={props.step4 ? "active" : ""}>Потврди</Col>
    </Row>
  );
}

export default CheckoutSteps;
