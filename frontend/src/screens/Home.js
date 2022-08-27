import React, { useEffect, useReducer, useState } from "react";
import "../styles/Home.css";
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import image1 from "../Images/slideshow1.png";
import image2 from "../Images/slideshow2.png";
import image3 from "../Images/slideshow3.png";
import icon1 from "../Images/icon1.svg";
import icon2 from "../Images/icon2.svg";
import icon3 from "../Images/icon3.svg";
import Footer from "../components/Footer";
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

  const slides = [
    { url: image1, title: "Shiping" },
    { url: image2, title: "SchoolDiscount" },
    { url: image3, title: "OfficeDiscount" },
  ];

  const clearActive = () => {
    let icon1 = document.getElementById("icon1");
    icon1.classList.remove("activeIcon");
    let icon2 = document.getElementById("icon2");
    icon2.classList.remove("activeIcon");
    let icon3 = document.getElementById("icon3");
    icon3.classList.remove("activeIcon");

    let icon1Text = document.getElementById("icon1-text");
    icon1Text.classList.remove("activeIcon");
    let icon2Text = document.getElementById("icon2-text");
    icon2Text.classList.remove("activeIcon");
    let icon3Text = document.getElementById("icon3-text");
    icon3Text.classList.remove("activeIcon");

    let icon1Container = document.getElementById("1");
    icon1Container.classList.remove("activeIconContainer");
    let icon2Container = document.getElementById("2");
    icon2Container.classList.remove("activeIconContainer");
    let icon3Container = document.getElementById("3");
    icon3Container.classList.remove("activeIconContainer");
  };

  const handleClick = (event) => {
    let clickedIcon = document.getElementById("icon" + event.currentTarget.id);
    let clickedIconText = document.getElementById(
      "icon" + event.currentTarget.id + "-text"
    );
    clearActive();
    clickedIcon.classList.add("activeIcon");
    clickedIconText.classList.add("activeIcon");

    let iconContainer = document.getElementById(event.currentTarget.id);
    iconContainer.classList.add("activeIconContainer");

    const icon1Text = "Бесплатна достава за нарачки над 1500 ден.";
    const icon2Text =
      "Ние можеме да го монтираме мебелот наместо Вас – брзо, лесно и чисто.";
    const icon3Text = "Доставуваме над 1000 производи до 10 дена.";

    let p = document.querySelector(".icon-description");
    if (event.currentTarget.id === "1") p.textContent = icon1Text;
    else if (event.currentTarget.id === "2") p.textContent = icon2Text;
    else p.textContent = icon3Text;
  };

  return (
    <div>
      <Helmet>
        <title>MebelCity</title>
      </Helmet>
      <Header />
      <div className="sliderContainer">
        <ImageSlider slides={slides} />
      </div>
      <div className="section">
        <div className="iconWrapper">
          <div
            className="iconContainer activeIconContainer"
            id="1"
            onClick={handleClick}
          >
            <img
              src={icon1}
              alt="бесплатна достава"
              className="icon activeIcon"
              id="icon1"
            />
            <p className="icon-text activeIcon" id="icon1-text">
              Бесплатна достава
            </p>
          </div>
          <div className="iconContainer" id="2" onClick={handleClick}>
            <img src={icon2} className="icon" alt="монтажа" id="icon2" />
            <p className="icon-text" id="icon2-text">
              Монтажа
            </p>
          </div>
          <div className="iconContainer" onClick={handleClick} id="3">
            <img src={icon3} alt="брза достава" className="icon" id="icon3" />
            <p className="icon-text" id="icon3-text">
              Брза достава
            </p>
          </div>
        </div>
        <div className="descriptionContainer">
          <p className="icon-description">
            Бесплатна достава за нарачки над 1500 ден.
          </p>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-item item1">Дневна</div>
        <div className="grid-item item2">Ходник</div>
        <div className="grid-item item3">Трпезарија</div>
        <div className="grid-item item4">Спална</div>
        <div className="grid-item item5">Кујна</div>
        <div className="grid-item item6">Канцеларија</div>
        <div className="grid-item item7">Детска соба</div>
        <div className="grid-item item8">Мебел за градина</div>
      </div>
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
      <Footer />
    </div>
  );
}

export default Home;
