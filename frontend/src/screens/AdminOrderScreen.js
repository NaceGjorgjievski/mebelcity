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
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

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

  const confirmOrderHandler = async () => {
    let isConfirmed = true;
    let _id = order._id;
    try {
      const { data } = await axios.put("/api/orders/action", {
        isConfirmed,
        _id,
      });

      toast.success("?????????????????? ?? ??????????????????");
    } catch (err) {
      dispatch({ type: "FETCH_FAIL" });
      toast.error("????????????");
    }
  };
  const sendOrderHandler = async () => {
    let isShipped = true;
    let shippedAt = Date();
    let _id = order._id;
    try {
      const { data } = await axios.put("/api/orders/action", {
        isShipped,
        shippedAt,
        _id,
      });

      toast.success("?????????????????? ?? ??????????????????");
    } catch (err) {
      dispatch({ type: "FETCH_FAIL" });
      toast.error("????????????");
    }
  };
  const finishOrderHandler = async () => {
    let isDelivered = true;
    let deliveredAt = Date();
    let _id = order._id;
    try {
      if (order.isPaid) {
        const { data } = await axios.put("/api/orders/action", {
          isDelivered,
          deliveredAt,
          _id,
        });
      } else {
        let isPaid = true;
        let paidAt = Date();
        const { data } = await axios.put("/api/orders/action", {
          _id,
          isDelivered,
          deliveredAt,
          isPaid,
          paidAt,
        });
      }

      toast.success("?????????????????? ?? ??????????????????????");
    } catch (err) {
      dispatch({ type: "FETCH_FAIL" });
      toast.error("????????????");
    }
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="pageContainer shipPC">
      <Helmet>
        <title>?????????????? {orderId}</title>
      </Helmet>
      <h1 style={{ marginTop: "20px" }}>?????????????? {orderId}</h1>
      <Row style={{ width: "90%" }}>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>????????????????</Card.Title>
              <Card.Text>
                <strong>??????:</strong> {order.shippingAddress.fullName}
                <br />
                <strong>????????????:</strong> {order.shippingAddress.address},
                {order.shippingAddress.city},{order.shippingAddress.postalCode},
                {order.shippingAddress.country}
                <br />
                <strong>??????????????:</strong> {order.contactNumber}
                <br />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>??????????????</Card.Title>
              <Card.Text>
                <strong>??????????:</strong>{" "}
                {order.paymentMethod === "Karticka"
                  ? "???? ???????????????? ????????????????"
                  : "???? ???????????? ?????? ??????????????"}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  ?????????????? ???? {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">???? ?? ??????????????</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>????????????????</Card.Title>
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

                      <span>{item.price} ??????</span>
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
              <Card.Title>??????????????</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>????????????????:</Col>
                    <Col>{order.itemsPrice.toFixed(2)} ??????</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>????????????????:</Col>
                    <Col>{order.shippingPrice.toFixed(2)} ??????</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>????????????</strong>
                    </Col>
                    <Col>
                      <strong>{order.totalPrice.toFixed(2)} ??????</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ marginTop: "40px" }}>
            <Card.Body>
              <Card.Title>??????????</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Button
                    style={{ width: "100%" }}
                    disabled={order.isConfirmed === true}
                    onClick={confirmOrderHandler}
                  >
                    ?????????????? ??????????????
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    style={{ width: "100%" }}
                    disabled={
                      order.isConfirmed === false || order.isShipped === true
                    }
                    onClick={sendOrderHandler}
                  >
                    ?????????????? ??????????????
                  </Button>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    style={{ width: "100%" }}
                    disabled={
                      order.isConfirmed === false ||
                      order.isShipped === false ||
                      order.isDelivered === true
                    }
                    onClick={finishOrderHandler}
                  >
                    ?????????????????? ?? ??????????????????????
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
