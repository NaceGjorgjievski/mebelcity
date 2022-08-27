import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import "../styles/SigninScreen.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function SigninScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  return (
    <div className="pageContainer">
      <Container className="main">
        <Helmet>
          <title>Најави се</title>
        </Helmet>
        <h1>Најави се</h1>
        <Form className="formCointainer">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Лозинка</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <div className="submitBtnContainer">
            <Button variant="danger" size="lg" type="submit">
              Најави се
            </Button>
          </div>
          <div className="registerParagraph">
            Нов корисник?{" "}
            <Link to={`/signup?redirect=${redirect}`}>Регистрирај се</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default SigninScreen;
