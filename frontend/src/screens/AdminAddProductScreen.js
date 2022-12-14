import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AdminAddProductScreen() {
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
  const [H, setH] = useState("");
  const [W, setW] = useState("");
  const [L, setL] = useState("");
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
    formData.append("H", H);
    formData.append("W", W);
    formData.append("L", L);
    try {
      const result = await axios.post("/api/products/add", formData);
      if (result) toast.success("Product Added");
      return;
    } catch (error) {
      console.log(error);
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
      <div id="mainScreen">
        <div className="taskContainer">
          <h1>???????????? ?????? ??????????????</h1>
          <Form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            className="newProductFormCointainer"
          >
            <div className="firstRow" style={{ display: "flex" }}>
              <Form.Group>
                <Form.Label>??????</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>????????</Form.Label>
                <Form.Control
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>????????????????????</Form.Label>
                <Form.Select onChange={(e) => setCategory(e.target.value)}>
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
                <Form.Label>??????????????????????????</Form.Label>
                <Form.Select onChange={(e) => setSubCategory(e.target.value)}>
                  <option value="default">??????????????????????????</option>
                  {category === "dnevna" && (
                    <option value="agolni-garnituri">???????????? ??????????????????</option>
                  )}
                  {category === "dnevna" && <option value="sofi">????????</option>}
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
                    <option value="gejmerski-stolovi">?????????????????? ??????????????</option>
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
                    <option value="gradinarski-lulki">?????????????????????? ??????????</option>
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
                    <option value="kujnski-garnituri">?????????????? ??????????????????</option>
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
            </div>
            <div className="secondRow">
              <Form.Group style={{ width: "60%", marginTop: "20px" }}>
                <Form.Label>????????</Form.Label>
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
                  <Form.Label>????????</Form.Label>
                  <Form.Control
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group style={{ marginTop: "10px" }}>
                  <Form.Label>???????? ??????????????</Form.Label>
                  <Form.Control
                    value={priceMontaza}
                    onChange={(e) => setPriceMontaza(e.target.value)}
                    type="number"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group style={{ marginTop: "10px" }}>
                  <Form.Label>????????????</Form.Label>
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
                  <Form.Label>???????????? ??????????</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={onChangeImage}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group style={{ marginTop: "10px" }}>
                  <Form.Label>???????????????? ?????????? ????.1</Form.Label>
                  <Form.Control
                    type="file"
                    name="sideImage"
                    onChange={onChangeSideImage}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group style={{ marginTop: "10px" }}>
                  <Form.Label>???????????????? ?????????? ????.2</Form.Label>
                  <Form.Control
                    type="file"
                    name="sideImage2"
                    onChange={onChangeSideImage2}
                    required
                  ></Form.Control>
                </Form.Group>
              </div>
              <div>
                <Form.Group
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Form.Label>H:</Form.Label>
                    <Form.Control
                      type="text"
                      name="dimension"
                      style={{ width: "60px" }}
                      value={H}
                      onChange={(e) => setH(e.target.value)}
                      required
                    ></Form.Control>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Form.Label>W:</Form.Label>
                    <Form.Control
                      type="text"
                      name="dimension"
                      value={W}
                      onChange={(e) => setW(e.target.value)}
                      style={{ width: "60px" }}
                      required
                    ></Form.Control>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Form.Label>L:</Form.Label>
                    <Form.Control
                      type="text"
                      name="dimension"
                      style={{ width: "60px" }}
                      value={L}
                      onChange={(e) => setL(e.target.value)}
                      required
                    ></Form.Control>
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>?????????? ???? ????????????????</Form.Label>
                  <Form.Control
                    type="file"
                    name="dimension"
                    onChange={onChangeDimension}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group style={{ marginTop: "10px" }}>
                  <Form.Label>?????????? ???? ????????</Form.Label>
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
                ????????????
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AdminAddProductScreen;
