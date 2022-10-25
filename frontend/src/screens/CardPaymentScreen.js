import React, { useContext, useEffect, useReducer, useState } from "react";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";
import { getError } from "../components/utils";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function CardPaymentScreen() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 1500 ? round2(0) : round2(150);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const [cardNumber, setCardNumber] = useState("");
  const handleChange = (event) => {
    const result = event.target.value.replace(/[^0-9]/gi, "");
    setCardNumber(result);
  };
  const [ccvNumber, setCcvNumber] = useState("");
  const handleChangeCCV = (event) => {
    const result = event.target.value.replace(/[^0-9]/gi, "");
    console.log(event.currentTarget.validity.valid);

    setCcvNumber(result);
  };
  const paymentHandler = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (cardNumber.length !== 16) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "/api/orders",
          {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
            isPaid: true,
            paidAt: Date.now(),
            isConfirmed: true,
            contactNumber: userInfo.contact,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        ctxDispatch({ type: "CART_CLEAR" });
        dispatch({ type: "CREATE_SUCCESS" });
        localStorage.removeItem("cartItems");
        navigate(`/order/${data.order._id}`);
      } catch (err) {
        dispatch({ type: "CREATE_FAIL" });
        toast.error(getError(err));
      }
    }
  };

  return (
    <div className="pageContainer">
      <Container className="pageContainer shipPC">
        <Helmet>
          <title>Плати нарачка</title>
        </Helmet>
        <Form
          noValidate
          validated={validated}
          onSubmit={paymentHandler}
          className="formCointainer"
        >
          <Form.Group id="nameInput">
            <Form.Label>Име и Презиме</Form.Label>
            <Form.Control type="text" required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Број на картичка</Form.Label>
            <Form.Control
              type="text"
              minLength="16"
              maxLength="16"
              value={cardNumber}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>CVV2/CVC2</Form.Label>
            <Form.Control
              type="text"
              minLength={3}
              maxLength={3}
              value={ccvNumber}
              onChange={handleChangeCCV}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Рок на важност</Form.Label>
            <div style={{ display: "flex" }}>
              <Form.Select style={{ width: "47%", margin: "auto" }}>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </Form.Select>
              <Form.Select style={{ width: "47%", margin: "auto" }}>
                <option value="02">23</option>
                <option value="03">24</option>
                <option value="04">25</option>
                <option value="05">26</option>
              </Form.Select>
            </div>
          </Form.Group>

          <div className="submitBtnContainer">
            <Button variant="danger" size="lg" type="submit">
              Плати
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default CardPaymentScreen;
