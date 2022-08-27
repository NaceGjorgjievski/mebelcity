import React, { useContext } from "react";
import "../styles/CartScreen.css";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className="d-flex flex-column pageContainer">
      <Helmet>
        <title>Кошничка</title>
      </Helmet>
      <main>
        <h2>Кошничка</h2>
        <Row className="productRow">
          <Col>
            {cartItems.length === 0 ? (
              <MessageBox>Кошничката е празна</MessageBox>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item
                    variant="dark"
                    key={item._id}
                    className="item"
                  >
                    <div className="itemContainer ">
                      <div className="trashImgContainer">
                        <div className="trashIconContainer">
                          <Button
                            variant="dark"
                            onClick={() => removeItemHandler(item)}
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                        <div>
                          <Link className="link" to={`/product/${item.slug}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded img-thumbnail"
                            ></img>
                            <p>{item.name}</p>
                          </Link>
                        </div>
                      </div>
                      <div className="btnsPriceContainer">
                        <div className="">
                          <Button
                            variant="danger"
                            onClick={() =>
                              updateCartHandler(item, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                          >
                            <RemoveCircleIcon />
                          </Button>{" "}
                          <input
                            className="quantityInput"
                            readOnly
                            value={item.quantity}
                          ></input>{" "}
                          <Button
                            variant="danger"
                            className="marginBtn"
                            onClick={() =>
                              updateCartHandler(item, item.quantity + 1)
                            }
                            disabled={item.quantity === item.countInStock}
                          >
                            <AddCircleIcon />
                          </Button>
                        </div>
                        <div>
                          <h3>{item.price}ден</h3>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
        {cartItems.length === 0 ? (
          <h2></h2>
        ) : (
          <Row className="productRow lastRow">
            <div className="totalPriceContainer">
              <h3>Вкупно:</h3>
              <h3>
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}ден
              </h3>
            </div>
            <div className="checkoutBtnContainer">
              <Button
                variant="danger"
                size="lg"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                НАРАЧАЈТЕ
              </Button>
            </div>
          </Row>
        )}
      </main>
    </div>
  );
}

export default CartScreen;
