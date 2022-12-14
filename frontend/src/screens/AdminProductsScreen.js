import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getError } from "../components/utils";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
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

function AdminProductsScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const subCategory = sp.get("subCategory") || "all";
  //const name = sp.get("name") || "all";
  const order = sp.get("order") || "newest";
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
          `/api/products?page=${page}&query=${query}&category=${category}&subCategory=${subCategory}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [category, page, query, order, subCategory, error]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategorry = filter.category || category;
    const filterQuery = filter.query || query;
    const filterSubCategory = filter.subCategory || subCategory;
    const sortOrder = filter.order || order;
    return `?category=${filterCategorry}&query=${filterQuery}&subCategory=${filterSubCategory}&page=${filterPage}&order=${sortOrder}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varriant="danger">{error}</MessageBox>
      ) : (
        <div id="pgContainer">
          <div id="sidebarMenu">
            <Link
              to={"/admin/addProduct"}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <div className="dashboard-btn" to="/admin/addProduct">
                ???????????? ?????? ????????????????
              </div>
            </Link>
            <Link
              to={"/admin/addCategory"}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <div className="dashboard-btn">???????????? ????????????????????</div>
            </Link>
            <Link
              to={"/admin/products"}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <div className="dashboard-btn">??????????????????</div>
            </Link>
            <Link
              to={"/admin/orders"}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <div className="dashboard-btn">??????????????</div>
            </Link>
          </div>
          <div className="taskContainer">
            <h1>??????????????????</h1>
            <div className="filterContainer" style={{ width: "100%" }}>
              <Form
                id="fff"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {/*
              <Form.Group>
                <Form.Control
                  id="filterName"
                  placeholder="??????"
                  onSubmit={submitHandler}
                  required
                ></Form.Control>
            </Form.Group>*/}
                <Form.Group>
                  <Form.Select
                    value={category}
                    onChange={(e) => {
                      if (e.target.value === "all") {
                        navigate(
                          getFilterUrl({
                            page: 1,
                            category: e.target.value,
                            subCategory: "all",
                          })
                        );
                      } else {
                        navigate(
                          getFilterUrl({ category: e.target.value, page: 1 })
                        );
                      }
                    }}
                  >
                    <option value="all">????????????????????</option>
                    <option value={"dnevna"}>????????????</option>
                    <option value={"spalna"}>????????????</option>
                    <option value={"kancelarija"}>??????????????????????</option>
                    <option value={"hodnik"}>????????????</option>
                    <option value={"gradina"}>??????????????</option>
                    <option value={"trpezarija"}>????????????????????</option>
                    <option value={"kujna"}>??????????</option>
                    <option value={"detska"}>????????????</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Select
                    value={subCategory}
                    onChange={(e) => {
                      navigate(
                        getFilterUrl({ subCategory: e.target.value, page: 1 })
                      );
                    }}
                  >
                    <option value="all">??????????????????????????</option>

                    {category === "dnevna" && (
                      <option value="agolni-garnituri">???????????? ??????????????????</option>
                    )}
                    {category === "dnevna" && (
                      <option value="sofi">????????</option>
                    )}
                    {category === "dnevna" && (
                      <option value="fotelji">??????????????</option>
                    )}
                    {category === "dnevna" && (
                      <option value="taburetki">??????????????????</option>
                    )}
                    {category === "dnevna" && (
                      <option value="klub-masi">???????? ????????</option>
                    )}
                    {category === "dnevna" && (
                      <option value="tv-komodi">???? ????????????</option>
                    )}
                    {category === "dnevna" && (
                      <option value="komodi">????????????</option>
                    )}
                    {category === "spalna" && (
                      <option value="spalni-kompleti">???????????? ????????????????</option>
                    )}
                    {category === "spalna" && (
                      <option value="lezai">??????????</option>
                    )}
                    {category === "spalna" && (
                      <option value="kreveti">??????????????</option>
                    )}
                    {category === "spalna" && (
                      <option value="plakari">??????????????</option>
                    )}
                    {category === "spalna" && (
                      <option value="nokni-skafcinja">?????????? ????????????????</option>
                    )}
                    {category === "spalna" && (
                      <option value="toaletni-masi">???????????????? ????????</option>
                    )}
                    {category === "kancelarija" && (
                      <option value="biroa">??????????</option>
                    )}
                    {category === "kancelarija" && (
                      <option value="kancelariski-stolovi">
                        ???????????????????????? ??????????????
                      </option>
                    )}
                    {category === "kancelarija" && (
                      <option value="gejmerski-stolovi">
                        ?????????????????? ??????????????
                      </option>
                    )}
                    {category === "kancelarija" && (
                      <option value="kancelariski-skafovi">
                        ???????????????????????? ??????????????
                      </option>
                    )}
                    {category === "hodnik" && (
                      <option value="skafovi-za-cevli">?????????????? ???? ??????????</option>
                    )}
                    {category === "hodnik" && (
                      <option value="zakacalki-i-ogledala">
                        ?????????????????? ?? ????????????????
                      </option>
                    )}
                    {category === "hodnik" && (
                      <option value="kolekcii-za-hodnik">
                        ???????????????? ???? ????????????
                      </option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarski-kompleti">
                        ?????????????????????? ????????????????
                      </option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarski-lulki">
                        ?????????????????????? ??????????
                      </option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarski-cadori">
                        ?????????????????????? ????????????
                      </option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarski-masi">?????????????????????? ????????</option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarski-stolovi">
                        ?????????????????????? ??????????????
                      </option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarsko-osvetluvanje">
                        ?????????????????????? ??????????????????????
                      </option>
                    )}
                    {category === "trpezarija" && (
                      <option value="trpezariski-masi">?????????????????????? ????????</option>
                    )}
                    {category === "trpezarija" && (
                      <option value="trpezariski-stolovi">
                        ?????????????????????? ??????????????
                      </option>
                    )}
                    {category === "trpezarija" && (
                      <option value="kujnski-garnituri">
                        ?????????????? ??????????????????
                      </option>
                    )}
                    {category === "trpezarija" && (
                      <option value="bar-stolovi-i-masi">
                        ?????? ?????????????? ?? ????????
                      </option>
                    )}
                    {category === "kujna" && (
                      <option value="kujnski-agolni-garnituri">
                        ?????????????? ???????????? ??????????????????
                      </option>
                    )}
                    {category === "kujna" && (
                      <option value="standardni-kujni">???????????????????? ??????????</option>
                    )}
                    {category === "detska" && (
                      <option value="kolekcii-za-detska-soba">
                        ???????????????? ???? ???????????? ????????
                      </option>
                    )}
                    {category === "detska" && (
                      <option value="detski-biroa">???????????? ??????????</option>
                    )}
                    {category === "detska" && (
                      <option value="detski-lezai">???????????? ??????????</option>
                    )}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Select
                    id="sortOrder"
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value={"newest"}>???????????????? ???? ????????</option>
                    <option value={"lowFirst"}>???? ?????????? ?????? ????????????</option>
                    <option value={"highFirst"}>???? ???????????? ?????? ??????????</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
            <ListGroup
              id="filteredProductsContainer"
              variant="success"
              style={{ width: "95%", margin: "auto", marginTop: "20px" }}
            >
              {products.map((item) => (
                <ListGroup.Item key={item._id}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
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
                      <span style={{ marginLeft: "20px" }}>{item.name}</span>
                    </div>
                    <span>{item.category}</span>
                    <span>{item.subCategory}</span>
                    <span>{item.countInStock}</span>

                    <span>{item.price} ??????</span>
                    <Button
                      type="button"
                      variant="primary"
                      style={{ height: "50px" }}
                      onClick={() => {
                        navigate(`/admin/product/${item.slug}`);
                      }}
                    >
                      ????????????
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div style={{ marginTop: "20px" }}>
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
        </div>
      )}
    </div>
  );
}

export default AdminProductsScreen;
