import React, { useContext, useEffect, useReducer } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { getError } from "../components/utils";
import { toast } from "react-toastify";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";

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

function PlaceOrderScreen() {
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

  const paymentHandler = async () => {
    navigate(`/placeorder/payment`);
  };

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
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
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div className="pageContainer shipPC">
      <CheckoutSteps step1 step2 step3 step4 />

      <Helmet>
        <title>Потврди нарачка</title>
      </Helmet>
      <h1 style={{ marginTop: "20px" }}>Потврди нарачка</h1>
      <Row style={{ width: "90%" }}>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Испорака</Card.Title>
              <Card.Text>
                <strong>Име:</strong> {cart.shippingAddress.fullName}
                <br />
                <strong>Адреса:</strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
                <br />
              </Card.Text>
              <Link to="/shipping">Измени</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Плаќање</Card.Title>
              <Card.Text>
                <strong>Начин:</strong>{" "}
                {cart.paymentMethod === "Karticka"
                  ? "Со платежна картичка"
                  : "Во готово при достава"}
              </Card.Text>
              <Link to="/payment">Измени</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Продукти</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                          style={{ margin: "0px" }}
                        ></img>
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </div>

                      <span>{item.quantity}</span>

                      <span>{item.price} ден</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Измени</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Нарачка</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Продукти:</Col>
                    <Col>{cart.itemsPrice.toFixed(2)} ден</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Испорака:</Col>
                    <Col>{cart.shippingPrice.toFixed(2)} ден</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Вкупно</strong>
                    </Col>
                    <Col>
                      <strong>{cart.totalPrice.toFixed(2)} ден</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    {cart.paymentMethod === "Karticka" ? (
                      <Button
                        type="button"
                        onClick={paymentHandler}
                        disabled={cart.cartItems.length === 0}
                        variant="danger"
                      >
                        Плати
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                        variant="danger"
                      >
                        Потврди нарачка
                      </Button>
                    )}
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
