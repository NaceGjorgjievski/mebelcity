import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import CreditCardIcon from "@mui/icons-material/CreditCard";

function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "Karticka"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div className="pageContainer shipPC">
      <CheckoutSteps step1 step2 step3 />
      <Container className="main">
        <Helmet>
          <title>Начин на наплата</title>
        </Helmet>
        <h1 style={{ marginTop: "10px" }}>Начин на наплата</h1>
        <Form
          onSubmit={submitHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="radioContainer" style={{ marginTop: "10px" }}>
            <Form.Check
              type="radio"
              id="Karticka"
              label="Со платежна картичка"
              value="Karticka"
              checked={paymentMethodName === "Karticka"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="radioContainer" style={{ marginTop: "10px" }}>
            <Form.Check
              type="radio"
              id="voGotovo"
              label="Во готово при достава"
              value="voGotovo"
              checked={paymentMethodName === "voGotovo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button variant="danger" type="submit">
              Продолжи
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default PaymentMethodScreen;
