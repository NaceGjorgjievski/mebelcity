import React, { useEffect, useState } from "react";
import logo from "../Images/logo.png";
import "../styles/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WeekendIcon from "@mui/icons-material/Weekend";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import BedIcon from "@mui/icons-material/Bed";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import DeckIcon from "@mui/icons-material/Deck";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo2 from "../Images/logo2.png";
import Badge from "react-bootstrap/Badge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Store } from "../Store";
import { useContext } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { height } from "@mui/system";
import Axios from "axios";
import CategoryMenu from "./CategoryMenu";

const toggleMenu = (event) => {
  event.stopPropagation();
  let menu = document.querySelector(".mobile-menu-container");
  menu.classList.remove("hidden");
  menu.classList.add("visible");
};

const toggleSubMenu = (event) => {
  event.stopPropagation();
  let menu = document.querySelector(".subDropdown");
  menu.classList.remove("hidden");
  menu.classList.add("visible");
  let tog = document.querySelector(".subMenu");
  tog.removeAttribute("onClick");
  console.log("SubMenu Visible");
};

const categoryMenuTrigger = (event) => {
  event.stopPropagation();
  let span = event.target;
  let menu = document.querySelector(`.${span.classList[0]}-menu`);
  menu.classList.remove("hidden");
  menu.classList.add("visible");
};

const closeMenu = (event) => {
  let menu = document.querySelector(".mobile-menu-container");
  menu.classList.remove("visible");
  menu.classList.add("hidden");
};

const backToMenu = (event) => {
  event.stopPropagation();
  let menu1 = document.querySelector(".subDropdown");
  menu1.classList.remove("visible");
  menu1.classList.add("hidden");
  console.log("SubMenu Invisible");
};

const backToSubMenu = (event) => {
  event.stopPropagation();
  let menu = document.querySelector(`.${event.target.classList[0]}-menu`);
  menu.classList.remove("visible");
  menu.classList.add("hidden");
};

function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  //const []

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  const searchHandler = () => {
    let text = document.querySelector(".header__searchInput").value;
    console.log(text);
    navigate(`/products/search?text=${text}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cat = await Axios.get(`/api/category/getCategories`);
      categories.splice(0, categories.length);
      for (let i = 0; i < cat.data.length; i++) {
        categories.push(cat.data[i]);
      }
      console.log(categories[0]);
    };
    fetchData();
  }, [categories]);
  const results = [];
  const results1 = [];
  const results2 = [];
  const results3 = [];
  if (categories) createMenu(categories);
  function createMenu(categories) {
    /*
    let ul = document.getElementById("category-ul-1");
    for(let i=0;i<categories.length;i++){
      ul.appendChild()
    }*/
    results.splice(0, results.length);
    categories.forEach((category) => {
      results.push(<CategoryMenu category={category} />);
    });
    for (let i = 0; i < categories.length; i++) {
      if (i < 3) {
        results1.push(<CategoryMenu category={categories[i]} />);
      } else if (i < 5) {
        results2.push(<CategoryMenu category={categories[i]} />);
      } else {
        results3.push(<CategoryMenu category={categories[i]} />);
      }
    }
    console.log("Results:");
    console.log(categories);
  }

  return (
    <div className="header">
      <div className="header__iconContainer">
        <MenuIcon
          className="header__icon"
          fontSize="large"
          onClick={toggleMenu}
        />
        <img
          className="header__icon"
          src={logo2}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        ></img>
      </div>
      <div className="mobile-menu-container hidden">
        <div className="closeBtn" onClick={closeMenu}>
          x
        </div>
        <ul className="mobile-menu">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "black" }}
            onClick={closeMenu}
          >
            <li>??????????????</li>
          </Link>
          <li onClick={toggleSubMenu} className="subMenu">
            ?????????????????? <ArrowDropDownIcon />
            <div className="subDropdown hidden">
              <div className="backBtn" onClick={backToMenu}>
                <ArrowBackIcon />
                ??????????
              </div>
              <ul className="mobile-submenu">
                <li
                  className="category-menu-trigger"
                  onClick={categoryMenuTrigger}
                >
                  <span className="dnevna">
                    <WeekendIcon /> ????????????
                  </span>
                  <div className="category-menu dnevna-menu hidden">
                    <div onClick={backToSubMenu} className="dnevna">
                      <ArrowBackIcon />
                      ??????????
                    </div>
                    <ul>
                      <li>
                        <Link
                          to="/products/dnevna/agolni-garnituri"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???????????? ??????????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/dnevna/sofi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/dnevna/fotelji"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ??????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/dnevna/taburetki"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ??????????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/dnevna/klub-masi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???????? ????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/dnevna/tv-komodi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???? ????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/dnevna/komodi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ????????????
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className="category-menu-trigger"
                  onClick={categoryMenuTrigger}
                >
                  <span className="hodnik">
                    <MeetingRoomIcon />
                    ????????????
                  </span>
                  <div className="category-menu hodnik-menu hidden">
                    <div onClick={backToSubMenu} className="hodnik">
                      <ArrowBackIcon />
                      ??????????
                    </div>
                    <ul>
                      <li>
                        <Link
                          to="/products/hodnik/skafovi-za-cevli"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????? ???? ??????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/hodnik/zakacalki-i-ogledala"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????????? ?? ????????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/hodnik/kolekcii-za-hodnik"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???????????????? ???? ????????????
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className="category-menu-trigger"
                  onClick={categoryMenuTrigger}
                >
                  <span className="kujna">
                    <KitchenIcon />
                    ??????????
                  </span>
                  <div className="category-menu kujna-menu hidden">
                    <div onClick={backToSubMenu} className="kujna">
                      <ArrowBackIcon />
                      ??????????
                    </div>
                    <ul>
                      <li>
                        <Link
                          to="/products/kujna/kujnski-agolni-garnituri"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????? ???????????? ??????????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/kujna/standarni-kujni"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???????????????????? ??????????
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className="category-menu-trigger"
                  onClick={categoryMenuTrigger}
                >
                  <span className="spalna">
                    <BedIcon />
                    ????????????
                  </span>
                  <div className="category-menu spalna-menu hidden">
                    <div onClick={backToSubMenu} className="spalna">
                      <ArrowBackIcon />
                      ??????????
                    </div>
                    <ul>
                      <li>
                        <Link
                          to="/products/spalna/spalni-kompleti"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???????????? ????????????????
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/products/spalna/lezai"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ??????????
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/products/spalna/kreveti"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ??????????????
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/products/spalna/plakari"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ??????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/spalna/nokni-skafcinja"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????? ????????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/spalna/toaletni-masi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???????????????? ????????
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className="category-menu-trigger"
                  onClick={categoryMenuTrigger}
                >
                  <span className="gradina">
                    <DeckIcon />
                    ??????????????
                  </span>
                  <div className="category-menu gradina-menu hidden">
                    <div onClick={backToSubMenu} className="gradina">
                      <ArrowBackIcon />
                      ??????????
                    </div>
                    <ul>
                      <li>
                        <Link
                          to="/products/gradina/gradinarski-kompleti"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????????????? ????????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/gradina/gradinarski-lulki"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????????????? ??????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/gradina/gradinarski-cadori"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????????????? ????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/gradina/gradinarski-masi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????????????? ????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/gradina/gradinarski-stolovi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????????????? ??????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/gradina/gradinarsko-osvetluvanje"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????????????? ??????????????????????
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className="category-menu-trigger"
                  onClick={categoryMenuTrigger}
                >
                  <span className="kancelarija">
                    <ChairAltIcon />
                    ??????????????????????
                  </span>
                  <div className="category-menu kancelarija-menu hidden">
                    <div onClick={backToSubMenu} className="kancelarija">
                      <ArrowBackIcon />
                      ??????????
                    </div>
                    <ul>
                      <li>
                        <Link
                          to="/products/kancelarija/biroa"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ??????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/kancelarija/kancelariski-stolovi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???????????????????????? ??????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/kancelarija/gejmerski-stolovi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????????? ??????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/kancelarija/kancelariski-skafovi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???????????????????????? ??????????????
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className="category-menu-trigger"
                  onClick={categoryMenuTrigger}
                >
                  <span className="trpezarija">
                    <TableRestaurantIcon />
                    ????????????????????
                  </span>
                  <div className="category-menu trpezarija-menu hidden">
                    <div onClick={backToSubMenu} className="trpezarija">
                      <ArrowBackIcon />
                      ??????????
                    </div>
                    <ul>
                      <li>
                        <Link
                          to="/products/trpezarija/trpezariski-masi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????????????? ????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/trpezarija/trpezariski-stolovi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????????????? ??????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/trpezarija/kujnski-garnituri"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????????????? ??????????????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/trpezarija/bar-stolovi-i-masi"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ?????? ?????????????? ?? ????????
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className="category-menu-trigger"
                  onClick={categoryMenuTrigger}
                >
                  <span className="detska">
                    <BedroomChildIcon />
                    ???????????? ????????
                  </span>
                  <div className="category-menu detska-menu hidden">
                    <div onClick={backToSubMenu} className="detska">
                      <ArrowBackIcon />
                      ??????????
                    </div>
                    <ul>
                      <li>
                        <Link
                          to="/products/detska/kolekcii-za-detska-soba"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???????????????? ???? ???????????? ????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/detska/detski-biroa"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ???????????? ??????????
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/detska/detski-lezai"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          ??????????
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>???? ??????</li>
          <li>????????????????</li>
        </ul>
      </div>
      <nav className="header__menu">
        <img src={logo} alt="logo"></img>
        <li>
          <Link to={"/"} className="link">
            ??????????????
          </Link>
        </li>
        <li className="header__products">
          <span className="header__productsSpan">
            ?????????????????? <ArrowDropDownIcon />
          </span>
          <div className="header__dropdown">
            <div className="header__dropdownColumn">
              <ul id="category-ul-1">
                <li>{categories[0] && results1}</li>
                {/*
                <li>
                  <Link to="/products/dnevna/all">
                    <span>
                      <WeekendIcon /> ????????????
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/dnevna/agolni-garnituri">
                        ???????????? ??????????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/sofi">????????</Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/fotelji">??????????????</Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/taburetki">??????????????????</Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/klub-masi">???????? ????????</Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/tv-komodi">???? ????????????</Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/komodi">????????????</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/products/hodnik/all">
                    <span>
                      <MeetingRoomIcon />
                      ????????????
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/hodnik/skafovi-za-cevli">
                        ?????????????? ???? ??????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/hodnik/zakacalki-i-ogledala">
                        ?????????????????? ?? ????????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/hodnik/kolekcii-za-hodnik">
                        ???????????????? ???? ????????????
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/products/kujna/all">
                    <span>
                      <KitchenIcon />
                      ??????????
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/kujna/kujnski-agolni-garnituri">
                        ?????????????? ???????????? ??????????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/kujna/standarni-kujni">
                        ???????????????????? ??????????
                      </Link>
                    </li>
                  </ul>
                        </li>*/}
              </ul>
            </div>
            <div className="header__dropdownColumn">
              <ul>
                <li>{categories[0] && results2}</li>
                {/*
                <li>
                  <Link to="/products/spalna/all">
                    <span>
                      <BedIcon />
                      ????????????
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/spalna/spalni-kompleti">
                        ???????????? ????????????????
                      </Link>
                    </li>

                    <li>
                      <Link to="/products/spalna/lezai">??????????</Link>
                    </li>

                    <li>
                      <Link to="/products/spalna/kreveti">??????????????</Link>
                    </li>

                    <li>
                      <Link to="/products/spalna/plakari">??????????????</Link>
                    </li>
                    <li>
                      <Link to="/products/spalna/nokni-skafcinja">
                        ?????????? ????????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/spalna/toaletni-masi">
                        ???????????????? ????????
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/products/gradina/all">
                    <span>
                      <DeckIcon />
                      ?????????? ???? ??????????????
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/gradina/gradinarski-kompleti">
                        ?????????????????????? ????????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gradina/gradinarski-lulki">
                        ?????????????????????? ??????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gradina/gradinarski-cadori">
                        ?????????????????????? ????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gradina/gradinarski-masi">
                        ?????????????????????? ????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gradina/gradinarski-stolovi">
                        ?????????????????????? ??????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gradina/gradinarsko-osvetluvanje">
                        ?????????????????????? ??????????????????????
                      </Link>
                    </li>
                  </ul>
                </li>
                      */}
              </ul>
            </div>
            <div className="header__dropdownColumn">
              <ul>
                <li>{categories[0] && results3}</li>
                {/*
                <li>
                  <Link to="/products/kancelarija/all">
                    <span>
                      <ChairAltIcon />
                      ??????????????????????
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/kancelarija/biroa">??????????</Link>
                    </li>
                    <li>
                      <Link to="/products/kancelarija/kancelariski-stolovi">
                        ???????????????????????? ??????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/kancelarija/gejmerski-stolovi">
                        ?????????????????? ??????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/kancelarija/kancelariski-skafovi">
                        ???????????????????????? ??????????????
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/products/trpezarija/all">
                    <span>
                      <TableRestaurantIcon />
                      ????????????????????
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/trpezarija/trpezariski-masi">
                        ?????????????????????? ????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/trpezarija/trpezariski-stolovi">
                        ?????????????????????? ??????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/trpezarija/kujnski-garnituri">
                        ?????????????? ??????????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/trpezarija/bar-stolovi-i-masi">
                        ?????? ?????????????? ?? ????????
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/products/detska/all">
                    <span>
                      <BedroomChildIcon />
                      ???????????? ????????
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/detska/kolekcii-za-detska-soba">
                        ???????????????? ???? ???????????? ????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/detska/detski-biroa">
                        ???????????? ??????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/detska/detski-lezai">??????????</Link>
                    </li>
                  </ul>
                </li>
                */}
              </ul>
            </div>
            <div className="header__dropdownColumn">
              <ul></ul>
            </div>
          </div>
        </li>
        <li className="header__aboutUs">???? ??????</li>
        <li className="header__contacts">????????????????</li>
      </nav>
      <div className="header__right">
        <div className="header__buttons">
          {userInfo && userInfo.isAdmin && (
            <NavDropdown
              title={
                <span>
                  <AccountCircleIcon
                    className="header__login"
                    fontSize="large"
                  />
                  <p>{userInfo.name}</p>
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  navigate("/profile");
                }}
              >
                ????????????
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => {
                  navigate("/admin/dashboard");
                }}
              >
                Dashboard
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
                className="drowdown-item"
                to="#signout"
                onClick={signoutHandler}
              >
                ???????????? ????
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {userInfo && !userInfo.isAdmin && (
            <NavDropdown
              title={
                <span>
                  <AccountCircleIcon
                    className="header__login"
                    fontSize="large"
                  />
                  <p>{userInfo.name}</p>
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  navigate("/profile");
                }}
              >
                ????????????
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => {
                  navigate("/orderhistory");
                }}
              >
                ??????????????
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
                className="drowdown-item"
                to="#signout"
                onClick={signoutHandler}
              >
                ???????????? ????
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {!userInfo && (
            <Link
              to={"/signin"}
              className="link"
              onClick={() => {
                navigate("/orderhistory");
              }}
            >
              <span>
                <AccountCircleIcon className="header__login" fontSize="large" />
                <p>???????????? ????</p>
              </span>
            </Link>
          )}

          <Link to="/cart" className="badgee">
            <span>
              <ShoppingBasketIcon className="header__cart" fontSize="large" />

              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </span>
          </Link>
        </div>
        <div className="header__search">
          <input className="header__searchInput" type="text" name="text" />
          <button onClick={searchHandler}>
            <SearchIcon className="header__searchIcon" fontSize="large" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
