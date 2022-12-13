import React, { useContext, useEffect, useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/AdminDashboard.css";
import { Store } from "../Store";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { toast } from "react-toastify";
import axios from "axios";

// Mesto podkategorii cuvaj stringovi od slugovite na podkategoriite vo kategoriite. Posle koga ce treba da gi stavas
//ce pravis get povik i ce gi zemis site podkategorii so tia slugovi zacuvani u kategorijata, i vnesi gi vo lista i vrati
//gi kako objekti (podkategorija)

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        getCategories: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  const [category, setCategory] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subCategorySlug, setSubCategorySlug] = useState("");
  let counter = 0;
  const addCategoryHandler = async (e) => {
    e.preventDefault();
    setCategories([]);
    try {
      const { data } = await Axios.post("/api/category/addCategory", {
        category,
        categorySlug,
        categories,
      });
      toast.success("Категоријата е додадена");
      counter++;
    } catch (err) {
      console.log(err);
      toast.error("Грешка");
    }
  };

  const addSubCategoryHandler = async (e) => {
    e.preventDefault();

    try {
      const data3 = await Axios.get(
        `/api/category/getCategory?category=${category}`
      );

      //console.log("<=============KATEGORII POCETNA SOSTOJBA==============>");
      //console.log(categories);
      let subcategoriesSlugs = data3.data[0].subCategories;
      for (let i = 0; i < subcategoriesSlugs.length; i++) {
        categories.push(subcategoriesSlugs[i]);
      }

      console.log(
        "<=============KATEGORII PO DOBIVANJETO NA PODKATEGORIITE==============>"
      );
      console.log(categories);

      const { data } = await Axios.post("/api/category/addSubCategory", {
        subCategory,
        subCategorySlug,
      });

      categories.push(data.subCategory.subCategorySlug);
      console.log("<=============KATEGORII POSLE PUSH==============>");
      console.log(categories);

      //categories.push(data.subCategory);
      //console.log(categories);

      const { data1 } = await Axios.put("/api/category/updateCategory", {
        category,
        //categorySlug,
        categories,
      });
      toast.success("Категоријата е додадена");
      categories.splice(0, categories.length);

      counter++;
    } catch (err) {
      console.log(err);
      toast.error("Грешка");
    } finally {
    }
  };

  const [{ loading, getCategories }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const flag = 1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        /*
      const { data } = await axios.get(
        `/api/products/search?page=${page}&query=${query}&category=${category}&subCategory=${subCategory}&order=${order}`
      );*/
        const { data } = await Axios.get(`/api/category/getCategories`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
      console.log(counter);
    };
    fetchData();
  }, [counter]);
  if (getCategories) foo(getCategories);
  function foo(getCategories) {
    let container = document.getElementById("selectContainer");
    container.innerHTML = "";
    for (let i = 0; i < getCategories.length; i++) {
      let option = document.createElement("option");
      option.setAttribute("value", getCategories[i].categorySlug);
      option.innerHTML = getCategories[i].categoryName;
      container.appendChild(option);
    }
  }

  return (
    <div id="pgContainer">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
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
          to={"/admin/addCategory"}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <div className="dashboard-btn">Додади категорија</div>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <div
          id="category-form-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          <h2>Додади категорија</h2>
          <Form
            className="formCointainer"
            onSubmit={addCategoryHandler}
            style={{ marginTop: "30px" }}
          >
            <Form.Group controlId="category">
              <Form.Control
                type="text"
                placeholder="Категорија"
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="categorySlug" style={{ marginTop: "20px" }}>
              <Form.Control
                type="text"
                placeholder="slug"
                required
                onChange={(e) => setCategorySlug(e.target.value)}
              />
            </Form.Group>
            <div className="submitBtnContainer">
              <Button variant="danger" size="lg" type="submit">
                Додади категорија
              </Button>
            </div>
          </Form>
        </div>
        <div
          id="subcategory-form-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          <h2>Додади подкатегорија</h2>
          <Form
            className="formCointainer"
            onSubmit={addSubCategoryHandler}
            style={{ marginTop: "30px" }}
          >
            <Form.Group>
              <Form.Select
                id="selectContainer"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></Form.Select>
            </Form.Group>
            <Form.Group controlId="subcategory" style={{ marginTop: "20px" }}>
              <Form.Control
                type="text"
                placeholder="Подкатегорија"
                required
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="subcategorySlug"
              style={{ marginTop: "20px" }}
            >
              <Form.Control
                type="text"
                placeholder="slug"
                required
                onChange={(e) => setSubCategorySlug(e.target.value)}
              />
            </Form.Group>
            <div className="submitBtnContainer">
              <Button variant="danger" size="lg" type="submit">
                Додади подкатегорија
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardScreen;
