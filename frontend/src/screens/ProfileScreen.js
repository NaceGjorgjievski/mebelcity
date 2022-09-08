import React, { useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { getError } from "../components/utils";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCSS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [contact, setContact] = useState(userInfo.contact);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          contact,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Успешно ажурирање");
    } catch (err) {
      dispatch({ type: "FETCH_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <div className="pageContainer shipPC">
      <Helmet>
        <title>Мој профил</title>
      </Helmet>
      <h1>Моите податоци</h1>
      <Form onSubmit={submitHandler} className="formCointainer">
        <Form.Group controlId="name">
          <Form.Label>Име и Презиме</Form.Label>
          <Form.Control
            value={name}
            style={{ textAlign: "left" }}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="contact">
          <Form.Label>Телефон</Form.Label>
          <Form.Control
            value={contact}
            type="text"
            required
            onChange={(e) => setContact(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
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
            Ажурирај
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProfileScreen;
