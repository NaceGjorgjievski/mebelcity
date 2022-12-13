import React, { useEffect, useReducer, useState } from "react";
import "../styles/Home.css";
// import data from "./data";
import Product from "../components/Product";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { getError } from "../components/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LinkContainer from "react-router-bootstrap/LinkContainer";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Home() {
  const params = useParams();

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const text = sp.get("text") || "";
  const page = sp.get("page") || 1;
  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, { loading: true, error: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        /*
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&subCategory=${subCategory}&order=${order}`
        );*/
        const { data } = await axios.get(
          `/api/products/search?page=${page}&text=${text}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [page, error, text]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterText = filter.text || text;
    return `?page=${filterPage}&text=${filterText}`;
  };

  const filterHandler = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        /*
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&subCategory=${subCategory}&order=${order}`
        );*/
        const { data } = await axios.get(
          `/api/products/search?page=${page}&text=${text}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  };

  return (
    <div style={{ width: "100%" }}>
      <Helmet>
        <title>MebelCity</title>
      </Helmet>

      <div className="most-popular-products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div style={{ width: "100%" }}>
            <h1>Резултати од пребарување</h1>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: "20px",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              {products.map((product) => (
                <Product key={product.slug} product={product} />
              ))}
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                  key={x + 1}
                  className="mx-1"
                  to={getFilterUrl({ page: x + 1 })}
                >
                  <Button
                    className={Number(page) === x + 1 ? "text-bold" : ""}
                    variant={Number(page) === x + 1 ? "danger" : "light"}
                  >
                    {x + 1}
                  </Button>
                </LinkContainer>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
