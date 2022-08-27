import React, { useEffect, useReducer, useState } from "react";
import "../styles/Home.css";
// import data from "./data";
import Product from "../components/Product";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Home() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>MebelCity</title>
      </Helmet>

      <div className="most-popular-products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <Product key={product.slug} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
