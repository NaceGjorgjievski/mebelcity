import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import icon1 from "../Images/icon3.svg";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingCart";
import "../styles/ProductScreen.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../components/utils";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const handleClick = (event) => {
    let tmp = document.querySelector("#tmp");
    if (tmp != null) {
      tmp.parentNode.removeChild(tmp);
      if (document.querySelector("#tmp") != null) {
        let tmp = document.querySelector("#tmp");
        tmp.parentNode.removeChild(tmp);
      }
    }
    if (event.target.textContent === "Опис") {
      let pre = document.createElement("pre");
      pre.setAttribute("id", "tmp");
      pre.textContent = product.description;
      event.target.appendChild(pre);
    } else if (event.target.textContent === "Монтажа") {
      let table = document.createElement("table");
      let thModel = document.createElement("th");
      let thPrice = document.createElement("th");
      let tdName = document.createElement("td");
      let tdPrice = document.createElement("td");
      let tr1 = document.createElement("tr");
      let tr2 = document.createElement("tr");
      thModel.innerHTML = "Модел";
      thPrice.innerHTML = "Цена";
      tdName.innerHTML = product.name;
      tdPrice.innerHTML = product.priceMontaza;
      tr1.appendChild(thModel);
      tr1.appendChild(thPrice);
      tr2.appendChild(tdName);
      tr2.appendChild(tdPrice);
      table.appendChild(tr1);
      table.appendChild(tr2);
      table.setAttribute("id", "tmp");
      let p = document.createElement("p");
      p.innerHTML = "Цената за монтажа е посочена на секој производ посебно.";
      p.setAttribute("id", "tmp");

      event.target.appendChild(table);
      event.target.appendChild(p);
    } else {
      let p = document.createElement("p");
      let a = document.createElement("a");
      let img = document.createElement("img");
      if (event.target.textContent === "Димензии") {
        a.setAttribute("href", product.dimension);
        img.src = product.dimension;
      } else {
        a.setAttribute("href", product.scheme);
        img.src = product.scheme;
      }
      p.appendChild(img);
      a.setAttribute("id", "tmp");
      a.appendChild(p);
      event.target.appendChild(a);
    }
  };

  const changePhoto = (event) => {
    let main = document.getElementById("main");
    main.setAttribute("src", event.target.src);
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div>
        <Container>
          <Row>
            <Col>
              <Row>
                <img id="main" src={product.image} alt={product.name}></img>
              </Row>
              <Row className="imgRow">
                <img
                  id="sec"
                  src={product.image}
                  alt={product.name}
                  onClick={changePhoto}
                ></img>

                <img
                  id="sec"
                  src={product.sideImage}
                  alt={product.name}
                  onClick={changePhoto}
                ></img>
              </Row>

              {/*</div>*/}
            </Col>
            <Col sm>
              <Row>
                <h2 id="name">{product.name}</h2>
              </Row>
              <Row>
                <h2 id="price">{product.price} ден</h2>
                <span>
                  <img id="icon" src={icon1} alt="10-day-delivery"></img>
                  Бесплатна достава: 10 дена
                </span>
              </Row>
              <Row>
                <Button
                  onClick={addToCartHandler}
                  className="addToCartBtn"
                  variant="danger"
                >
                  <ShoppingBasketIcon />
                  ДОДАЈ ВО КОШНИЧКА
                </Button>
              </Row>
              <Row>
                <Table id="table">
                  <tbody>
                    <tr>
                      <td>
                        <div onClick={handleClick}>Опис</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div onClick={handleClick}>Димензии</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div onClick={handleClick}>Монтажа</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div onClick={handleClick}>Шема за монтажа</div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ProductScreen;
