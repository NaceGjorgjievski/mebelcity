import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

function AddProductForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("dnevna");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceMontaza, setPriceMontaza] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const [sideImage, setSideImage] = useState("");
  const [sideImage2, setSideImage2] = useState("");
  const [dimension, setDimension] = useState("");
  const [scheme, setScheme] = useState("");
  const [message, setMessage] = useState("");

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const onChangeSideImage = (e) => {
    setSideImage(e.target.files[0]);
  };
  const onChangeSideImage2 = (e) => {
    setSideImage2(e.target.files[0]);
  };
  const onChangeDimension = (e) => {
    setDimension(e.target.files[0]);
  };
  const onChangeScheme = (e) => {
    setScheme(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("priceMontaza", priceMontaza);
    formData.append("countInStock", countInStock);
    formData.append("image", image);
    formData.append("sideImage", sideImage);
    formData.append("sideImage2", sideImage2);
    formData.append("dimension", dimension);
    formData.append("scheme", scheme);

    try {
      const result = await axios.post("/api/products/add", formData);
      if (result) toast.success("Product Added");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="taskContainer">
      <h1>Додади нов продукт</h1>
      <Form
        onSubmit={submitHandler}
        encType="multipart/form-data"
        className="newProductFormCointainer"
      >
        <div className="firstRow" style={{ display: "flex" }}>
          <Form.Group>
            <Form.Label>Име</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Слуг</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Категорија</Form.Label>
            <Form.Select onChange={(e) => setCategory(e.target.value)}>
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
            <Form.Select onChange={(e) => setSubCategory(e.target.value)}>
              <option value="default">Подкатегорија</option>
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
              {category === "dnevna" && <option value="komodi">Комоди</option>}
              {category === "spalna" && (
                <option value="spalni-kompleti">Спални Комплети</option>
              )}
              {category === "spalna" && <option value="lezai">Лежаи</option>}
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
                <option value="kolekcii-za-hodnik">Колекции за ходник</option>
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
                <option value="gradinarski-cadori">Градинарски чадори</option>
              )}
              {category === "gradina" && (
                <option value="gradinarski-masi">Градинарски маси</option>
              )}
              {category === "gradina" && (
                <option value="gradinarski-stolovi">Градинарски столови</option>
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
                <option value="trpezariski-stolovi">Трпезариски столови</option>
              )}
              {category === "trpezarija" && (
                <option value="kujnski-garnituri">Кујнски гарнитури</option>
              )}
              {category === "trpezarija" && (
                <option value="bar-stolovi-i-masi">Бар столови и маси</option>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group style={{ marginTop: "10px" }}>
              <Form.Label>Цена Монтажа</Form.Label>
              <Form.Control
                value={priceMontaza}
                onChange={(e) => setPriceMontaza(e.target.value)}
                type="number"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group style={{ marginTop: "10px" }}>
              <Form.Label>Залиха</Form.Label>
              <Form.Control
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                type="number"
                required
              ></Form.Control>
            </Form.Group>
          </div>
        </div>
        <div className="thirdRow">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form.Group>
              <Form.Label>Главна слика</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={onChangeImage}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group style={{ marginTop: "10px" }}>
              <Form.Label>Споредна слика бр.1</Form.Label>
              <Form.Control
                type="file"
                name="sideImage"
                onChange={onChangeSideImage}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group style={{ marginTop: "10px" }}>
              <Form.Label>Споредна слика бр.2</Form.Label>
              <Form.Control
                type="file"
                name="sideImage2"
                onChange={onChangeSideImage2}
                required
              ></Form.Control>
            </Form.Group>
          </div>
          <div>
            <Form.Group>
              <Form.Label>Слика со димензии</Form.Label>
              <Form.Control
                type="file"
                name="dimension"
                onChange={onChangeDimension}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group style={{ marginTop: "10px" }}>
              <Form.Label>Слика од шема</Form.Label>
              <Form.Control
                type="file"
                name="scheme"
                onChange={onChangeScheme}
                required
              ></Form.Control>
            </Form.Group>
          </div>
        </div>
        <div className="submitBtnContainer">
          <Button variant="danger" size="lg" type="submit">
            Додади
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddProductForm;
