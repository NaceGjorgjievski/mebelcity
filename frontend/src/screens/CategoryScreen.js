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
  const { category, subCategory } = params;
  var HF = 0;
  var HT = 1000;
  var WF = 0;
  var WT = 1000;
  var LF = 0;
  var LT = 1000;
  //const [HT, setHT] = useState(1000);
  //const [WF, setWF] = useState(0);
  //const [WT, setWT] = useState(1000);
  //const [LF, setLF] = useState(0);
  //const [LT, setLT] = useState(1000);
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  //const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  //const subCategory = sp.get("subCategory") || "all";
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
          `/api/products?page=${page}&query=${query}&category=${category}&subCategory=${subCategory}&order=${order}&HF=${HF}&HT=${HT}&WF=${WF}&WT=${WT}&LF=${LF}&LT=${LT}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [
    category,
    page,
    query,
    order,
    subCategory,
    error,
    HF,
    HT,
    WF,
    WT,
    LF,
    LT,
  ]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategorry = filter.category || category;
    const filterQuery = filter.query || query;
    const filterSubCategory = filter.subCategory || subCategory;
    const sortOrder = filter.order || order;
    const filterHF = filter.HF || HF;
    const filterHT = filter.HT || HT;
    const filterWF = filter.WF || WF;
    const filterWT = filter.WT || WT;
    const filterLF = filter.LF || LF;
    const filterLT = filter.LT || LT;
    return `?category=${filterCategorry}&query=${filterQuery}&subCategory=${filterSubCategory}&page=${filterPage}&order=${sortOrder}&HF=${filterHF}&HT=${filterHT}&WF=${filterWF}&WT=${filterWT}&LF=${filterLF}&LT=${filterLT}`;
  };

  const filterHandler = (e) => {
    e.preventDefault();
    HF = document.getElementById("HF").value;
    HT = document.getElementById("HT").value;
    WF = document.getElementById("WF").value;
    WT = document.getElementById("WT").value;
    LF = document.getElementById("LF").value;
    LT = document.getElementById("LT").value;
    console.log(HT);
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        /*
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&subCategory=${subCategory}&order=${order}`
        );*/
        const { data } = await axios.get(
          `/api/products?page=${page}&query=${query}&category=${category}&subCategory=${subCategory}&order=${order}&HF=${HF}&HT=${HT}&WF=${WF}&WT=${WT}&LF=${LF}&LT=${LT}`
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
            {category === "kancelarija" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>
                ??????????????????????
              </h1>
            ) : category === "dnevna" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>????????????</h1>
            ) : category === "spalna" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>????????????</h1>
            ) : category === "hodnik" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>????????????</h1>
            ) : category === "kujna" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>??????????</h1>
            ) : category === "gradina" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>
                ??????????????
              </h1>
            ) : category === "trpezarija" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>
                ????????????????????
              </h1>
            ) : (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>
                ???????????? ????????
              </h1>
            )}

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Form
                onSubmit={filterHandler}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  marginRight: "40px",
                  alignItems: "center",
                }}
              >
                <Form.Group style={{ display: "flex", alignItems: "center" }}>
                  <Form.Label style={{ margin: "0px" }}>H:</Form.Label>
                  <Form.Control
                    style={{ width: "60px" }}
                    id="HF"
                    //onChange={(e) => setHF(e.target.value)}
                  />
                  <Form.Label style={{ margin: "0px" }}>-</Form.Label>
                  <Form.Control
                    style={{ width: "60px" }}
                    id="HT"
                    //onChange={(e) => setHT(e.target.value)}
                  />
                </Form.Group>
                <Form.Group style={{ display: "flex", alignItems: "center" }}>
                  <Form.Label style={{ margin: "0px" }}>W:</Form.Label>
                  <Form.Control
                    style={{ width: "60px" }}
                    id="WF"
                    //onChange={(e) => setWF(e.target.value)}
                  />
                  <Form.Label style={{ margin: "0px" }}>-</Form.Label>
                  <Form.Control
                    style={{ width: "60px" }}
                    id="WT"
                    //onChange={(e) => setWT(e.target.value)}
                  />
                </Form.Group>
                <Form.Group style={{ display: "flex", alignItems: "center" }}>
                  <Form.Label style={{ margin: "0px" }}>L:</Form.Label>
                  <Form.Control
                    id="LF"
                    style={{ width: "60px" }}
                    //onChange={(e) => setLF(e.target.value)}
                  />
                  <Form.Label style={{ margin: "0px" }}>-</Form.Label>
                  <Form.Control
                    id="LT"
                    style={{ width: "60px" }}
                    //onChange={(e) => setLT(e.target.value)}
                  />
                </Form.Group>
                {/*}
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
                    </Form.Group>*/}
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
                <Form.Group>
                  <Button variant="danger" size="lg" type="submit">
                    ??????????????????
                  </Button>
                </Form.Group>
              </Form>
            </div>
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
