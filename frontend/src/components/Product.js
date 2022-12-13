import React, { useContext } from "react";
import "../styles/Product.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const addToCartHandler = () => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
  };
  return (
    <div
      className="product__container"
      style={{ marginLeft: "5px", marginRight: "5px", marginTop: "10px" }}
    >
      <Link to={`/product/${product.slug}`} style={{ height: "165.91px" }}>
        <div className="product__img" style={{ height: "100%" }}>
          <img
            src={product.image}
            alt="product"
            style={{ height: "100%" }}
          ></img>
        </div>
      </Link>
      <div
        className="product__textContainer"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginLeft: "25px",
        }}
      >
        <Link
          to={`/product/${product.slug}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="product__name">
            <h3>{product.name}</h3>
          </div>
        </Link>
        <div className="product__price">
          <h3 style={{ textDecoration: "none", color: "black" }}>
            {product.price}ден
          </h3>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h5>H: {product.height}</h5>
        <h5>W: {product.width}</h5>
        <h5>L: {product.length}</h5>
      </div>
      <div
        className="product__addToCart"
        style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}
      >
        <button onClick={addToCartHandler}>
          <ShoppingBasketIcon />
        </button>
        <div
          style={{
            //width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "10px",
          }}
        >
          {product.countInStock > 0 ? (
            <span style={{ color: "green" }}>
              <CheckIcon></CheckIcon>Залиха
            </span>
          ) : (
            <span style={{ color: "red" }}>
              <ClearIcon></ClearIcon>Залиха
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
