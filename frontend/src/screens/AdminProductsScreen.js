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
                Додади нов производ
              </div>
            </Link>
            <Link
              to={"/admin/products"}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <div className="dashboard-btn">Производи</div>
            </Link>
            <Link
              to={"/admin/orders"}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <div className="dashboard-btn">Нарачки</div>
            </Link>
          </div>
          <div className="taskContainer">
            <h1>Производи</h1>
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
                  placeholder="Име"
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
                    <option value="all">Категорија</option>
                    <option value={"dnevna"}>Дневна</option>
                    <option value={"spalna"}>Спална</option>
                    <option value={"kancelarija"}>Канцеларија</option>
                    <option value={"hodnik"}>Ходник</option>
                    <option value={"gradina"}>Градина</option>
                    <option value={"trpezarija"}>Трпезарија</option>
                    <option value={"kujna"}>Кујна</option>
                    <option value={"detska"}>Детска</option>
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
                    <option value="all">Подкатегорија</option>

                    {category === "dnevna" && (
                      <option value="agolni-garnituri">Аголни Гарнитури</option>
                    )}
                    {category === "dnevna" && (
                      <option value="sofi">Софи</option>
                    )}
                    {category === "dnevna" && (
                      <option value="fotelji">Фотелји</option>
                    )}
                    {category === "dnevna" && (
                      <option value="taburetki">Табуретки</option>
                    )}
                    {category === "dnevna" && (
                      <option value="klub-masi">Клуб маси</option>
                    )}
                    {category === "dnevna" && (
                      <option value="tv-komodi">ТВ комоди</option>
                    )}
                    {category === "dnevna" && (
                      <option value="komodi">Комоди</option>
                    )}
                    {category === "spalna" && (
                      <option value="spalni-kompleti">Спални Комплети</option>
                    )}
                    {category === "spalna" && (
                      <option value="lezai">Лежаи</option>
                    )}
                    {category === "spalna" && (
                      <option value="kreveti">Кревети</option>
                    )}
                    {category === "spalna" && (
                      <option value="plakari">Плакари</option>
                    )}
                    {category === "spalna" && (
                      <option value="nokni-skafcinja">Ноќни шкафчиња</option>
                    )}
                    {category === "spalna" && (
                      <option value="toaletni-masi">Тоалетни маси</option>
                    )}
                    {category === "kancelarija" && (
                      <option value="biroa">Бироа</option>
                    )}
                    {category === "kancelarija" && (
                      <option value="kancelariski-stolovi">
                        Канцелариски столови
                      </option>
                    )}
                    {category === "kancelarija" && (
                      <option value="gejmerski-stolovi">
                        Гејмерски столови
                      </option>
                    )}
                    {category === "kancelarija" && (
                      <option value="kancelariski-skafovi">
                        Канцелариски шкафови
                      </option>
                    )}
                    {category === "hodnik" && (
                      <option value="skafovi-za-cevli">Шкафови за чевли</option>
                    )}
                    {category === "hodnik" && (
                      <option value="zakacalki-i-ogledala">
                        Закачалки и огледала
                      </option>
                    )}
                    {category === "hodnik" && (
                      <option value="kolekcii-za-hodnik">
                        Колекции за ходник
                      </option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarski-kompleti">
                        Градинарски комплети
                      </option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarski-lulki">
                        Градинарски лулки
                      </option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarski-cadori">
                        Градинарски чадори
                      </option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarski-masi">Градинарски маси</option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarski-stolovi">
                        Градинарски столови
                      </option>
                    )}
                    {category === "gradina" && (
                      <option value="gradinarsko-osvetluvanje">
                        Градинарско осветлување
                      </option>
                    )}
                    {category === "trpezarija" && (
                      <option value="trpezariski-masi">Трпезариски маси</option>
                    )}
                    {category === "trpezarija" && (
                      <option value="trpezariski-stolovi">
                        Трпезариски столови
                      </option>
                    )}
                    {category === "trpezarija" && (
                      <option value="kujnski-garnituri">
                        Кујнски гарнитури
                      </option>
                    )}
                    {category === "trpezarija" && (
                      <option value="bar-stolovi-i-masi">
                        Бар столови и маси
                      </option>
                    )}
                    {category === "kujna" && (
                      <option value="kujnski-agolni-garnituri">
                        Кујнски аголни гарнитури
                      </option>
                    )}
                    {category === "kujna" && (
                      <option value="standardni-kujni">Стандардни кујни</option>
                    )}
                    {category === "detska" && (
                      <option value="kolekcii-za-detska-soba">
                        Колекции за детска соба
                      </option>
                    )}
                    {category === "detska" && (
                      <option value="detski-biroa">Детски бироа</option>
                    )}
                    {category === "detska" && (
                      <option value="detski-lezai">Детски лежаи</option>
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
                    <option value={"newest"}>Сортирај по цена</option>
                    <option value={"lowFirst"}>Од ниска кон висока</option>
                    <option value={"highFirst"}>Од висока кон ниска</option>
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

                    <span>{item.price} ден</span>
                    <Button
                      type="button"
                      variant="primary"
                      style={{ height: "50px" }}
                      onClick={() => {
                        navigate(`/admin/product/${item.slug}`);
                      }}
                    >
                      Измени
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
