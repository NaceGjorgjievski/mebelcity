import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import icon1 from "../Images/icon3.svg";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingCart";
import "../styles/ProductScreen.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div>
        <Header />
        <Container>
          <div className="left-side">
            <div className="mainImg">
              <img src={product.image} alt={product.name}></img>
            </div>
            <div className="sideImgContainer">
              <div className="sideImg">
                <img src={product.image} alt={product.name}></img>
              </div>
              <div className="sideImg">
                <img src={product.sideImage} alt={product.name}></img>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="name-container">
              <h2>{product.name}</h2>
            </div>
            <div className="price-container">
              <div className="price-left">
                <h2>{product.price} ден</h2>
                <span>
                  <img src={icon1} alt="10-day-delivery"></img>Бесплатна
                  достава: 10 дена
                </span>
              </div>
              <div className="price-right">
                <button className="addToCartBtn">
                  <ShoppingBasketIcon />
                  ДОДАЈ ВО КОШНИЧКА
                </button>
              </div>
            </div>

            <div className="informationContainer">
              <div className="table">
                <div>Опис</div>
                <div>Димензии</div>
                <div>Монтажа</div>
                <div>Шема за монтажа</div>
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default ProductScreen;
