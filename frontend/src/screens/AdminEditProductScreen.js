import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

function AdminEditProductScreen() {
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

  const [category, setCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");

  const submitHandler = async (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let slug = document.getElementById("slug").value;
    let price = document.getElementById("price").value;
    let priceMontaza = document.getElementById("priceMontaza").value;
    let countInStock = document.getElementById("stock").value;
    let description = document.getElementById("textArea").value;

    try {
      const { data } = await axios.put("/api/products/edit", {
        name,
        slug,
        category,
        subCategory,
        description,
        price,
        priceMontaza,
        countInStock,
      });

      toast.success("Успешно ажурирање");
    } catch (err) {
      dispatch({ type: "FETCH_FAIL" });
      toast.error("Грешка");
    }
  };

  return (
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
      <div id="mainScreen">
        <div className="taskContainer">
          <h1>Ажурирај продукт</h1>
          <Form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            className="newProductFormCointainer"
          >
            <div className="firstRow" style={{ display: "flex" }}>
              <Form.Group>
                <Form.Label>Име</Form.Label>
                <Form.Control
                  id="name"
                  defaultValue={product.name}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Слуг</Form.Label>
                <Form.Control
                  id="slug"
                  defaultValue={slug}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Категорија</Form.Label>
                <Form.Select onChange={(e) => setCategory(e.target.value)}>
                  <option value={"all"}>Категорија</option>
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
                <Form.Label>Подкатегорија</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}
                >
                  <option value="all">Подкатегорија</option>

                  {category === "dnevna" && (
                    <option value="agolni-garnituri">Аголни Гарнитури</option>
                  )}
                  {category === "dnevna" && <option value="sofi">Софи</option>}
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
                    <option value="gejmerski-stolovi">Гејмерски столови</option>
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
                    <option value="gradinarski-lulki">Градинарски лулки</option>
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
                    <option value="kujnski-garnituri">Кујнски гарнитури</option>
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
            </div>
            <div className="secondRow">
              <Form.Group style={{ width: "60%", marginTop: "20px" }}>
                <Form.Label>Опис</Form.Label>
                <Form.Control
                  id="textArea"
                  defaultValue={product.description}
                  as="textarea"
                  required
                ></Form.Control>
              </Form.Group>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40%",
                }}
              >
                <Form.Group style={{ marginTop: "20px" }}>
                  <Form.Label>Цена</Form.Label>
                  <Form.Control
                    id="price"
                    defaultValue={product.price}
                    type="number"
                    style={{ color: "black" }}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group style={{ marginTop: "10px" }}>
                  <Form.Label>Цена Монтажа</Form.Label>
                  <Form.Control
                    id="priceMontaza"
                    defaultValue={product.priceMontaza}
                    type="number"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group style={{ marginTop: "10px" }}>
                  <Form.Label>Залиха</Form.Label>
                  <Form.Control
                    id="stock"
                    defaultValue={product.countInStock}
                    type="number"
                    required
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>

            <div className="submitBtnContainer">
              <Button variant="danger" size="lg" type="submit">
                Ажурирај
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AdminEditProductScreen;
