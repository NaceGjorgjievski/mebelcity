import React, { useContext } from "react";
import "../styles/Product.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { Store } from "../Store";

function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const addToCartHandler = () => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
  };
  return (
    <div className="product__container">
      <Link to={`/product/${product.slug}`}>
        <div className="product__img">
          <img src={product.image} alt="product"></img>
        </div>
      </Link>
      <div className="product__textContainer">
        <Link to={`/product/${product.slug}`}>
          <div className="product__name">
            <h3>{product.name}</h3>
          </div>
        </Link>
        <div className="product__price">
          <h5>{product.price}ден</h5>
        </div>
      </div>
      <div className="product__addToCart">
        <button onClick={addToCartHandler}>
          <ShoppingBasketIcon />
        </button>
      </div>
    </div>
  );
}

export default Product;
