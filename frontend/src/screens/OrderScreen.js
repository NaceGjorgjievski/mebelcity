import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../components/utils";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="pageContainer shipPC">
      <Helmet>
        <title>Нарачка {orderId}</title>
      </Helmet>
      <h1 style={{ marginTop: "20px" }}>Нарачка {orderId}</h1>
      <Row style={{ width: "90%" }}>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Испорака</Card.Title>
              <Card.Text>
                <strong>Име:</strong> {order.shippingAddress.fullName}
                <br />
                <strong>Адреса:</strong> {order.shippingAddress.address},
                {order.shippingAddress.city},{order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Доставено на {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Не е доставено</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Плаќање</Card.Title>
              <Card.Text>
                <strong>Начин:</strong>{" "}
                {order.paymentMethod === "Karticka"
                  ? "Со платежна картичка"
                  : "Во готово при достава"}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Платено на {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Не е платено</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Продукти</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
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
                    <Col>{order.itemsPrice.toFixed(2)} ден</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Испорака:</Col>
                    <Col>{order.shippingPrice.toFixed(2)} ден</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Вкупно</strong>
                    </Col>
                    <Col>
                      <strong>{order.totalPrice.toFixed(2)} ден</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
