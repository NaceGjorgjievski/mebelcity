import React, { useEffect, useReducer } from "react";
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
                Канцеларија
              </h1>
            ) : category === "dnevna" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>Дневна</h1>
            ) : category === "spalna" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>Спална</h1>
            ) : category === "hodnik" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>Ходник</h1>
            ) : category === "kujna" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>Кујна</h1>
            ) : category === "gradina" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>
                Градина
              </h1>
            ) : category === "trpezarija" ? (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>
                Трпезарија
              </h1>
            ) : (
              <h1 style={{ textAlign: "center", marginTop: "10px" }}>
                Детска соба
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
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                  marginRight: "40px",
                  alignItems: "center",
                }}
              >
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
                    </Form.Group>*/}
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
