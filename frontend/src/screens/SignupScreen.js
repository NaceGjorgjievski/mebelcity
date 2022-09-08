import Axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import "../styles/SigninScreen.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../components/utils";

function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Лозинките не се совпаѓаат");
      return;
    }
    try {
      const { data } = await Axios.post("/api/users/signup", {
        name,
        contact,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="pageContainer">
      <Container className="main">
        <Helmet>
          <title>Регистрирај се</title>
        </Helmet>
        <h1>Регистрирај се</h1>
        <Form className="formCointainer" onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Име и Презиме</Form.Label>
            <Form.Control
              style={{ textAlign: "left" }}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="contact">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Лозинка</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Потврди Лозинка</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div className="submitBtnContainer">
            <Button variant="danger" size="lg" type="submit">
              Регистрирај се
            </Button>
          </div>
          <div className="registerParagraph">
            Имате профил?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Најави се</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default SignupScreen;
