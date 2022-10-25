import React from "react";
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

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

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
            <li>Почетна</li>
          </Link>
          <li onClick={toggleSubMenu} className="subMenu">
            Производи <ArrowDropDownIcon />
            <div className="subDropdown hidden">
              <div className="backBtn" onClick={backToMenu}>
                <ArrowBackIcon />
                Назад
              </div>
              <ul className="mobile-submenu">
                <li
                  className="category-menu-trigger"
                  onClick={categoryMenuTrigger}
                >
                  <span className="dnevna">
                    <WeekendIcon /> Дневна
                  </span>
                  <div className="category-menu dnevna-menu hidden">
                    <div onClick={backToSubMenu} className="dnevna">
                      <ArrowBackIcon />
                      Назад
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
                          Аголни гарнитури
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
                          Софи
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
                          Фотелји
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
                          Табуретки
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
                          Клуб Маси
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
                          ТВ Комоди
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
                          Комоди
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
                    Ходник
                  </span>
                  <div className="category-menu hodnik-menu hidden">
                    <div onClick={backToSubMenu} className="hodnik">
                      <ArrowBackIcon />
                      Назад
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
                          Шкафови за чевли
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
                          Закачалки и огледала
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
                          Колекции за ходник
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
                    Кујна
                  </span>
                  <div className="category-menu kujna-menu hidden">
                    <div onClick={backToSubMenu} className="kujna">
                      <ArrowBackIcon />
                      Назад
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
                          Кујнски аголни гарнитури
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
                          Стандардни кујни
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
                    Спална
                  </span>
                  <div className="category-menu spalna-menu hidden">
                    <div onClick={backToSubMenu} className="spalna">
                      <ArrowBackIcon />
                      Назад
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
                          Спални комплети
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
                          Лежаи
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
                          Кревети
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
                          Плакари
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
                          Ноќни шкафчиња
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
                          Тоалетни маси
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
                    Градина
                  </span>
                  <div className="category-menu gradina-menu hidden">
                    <div onClick={backToSubMenu} className="gradina">
                      <ArrowBackIcon />
                      Назад
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
                          Градинарски комплети
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
                          Градинарски лулки
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
                          Градинарски чадори
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
                          Градинарски маси
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
                          Градинарски столови
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
                          Градинарско осветлување
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
                    Канцеларија
                  </span>
                  <div className="category-menu kancelarija-menu hidden">
                    <div onClick={backToSubMenu} className="kancelarija">
                      <ArrowBackIcon />
                      Назад
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
                          Бироа
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
                          Канцелариски столови
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
                          Гејмерски столови
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
                          Канцелариски шкафови
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
                    Трпезарија
                  </span>
                  <div className="category-menu trpezarija-menu hidden">
                    <div onClick={backToSubMenu} className="trpezarija">
                      <ArrowBackIcon />
                      Назад
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
                          Трпезариски маси
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
                          Трпезариски столови
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
                          Кујнски гарнитури
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
                          Бар столови и маси
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
                    Детска соба
                  </span>
                  <div className="category-menu detska-menu hidden">
                    <div onClick={backToSubMenu} className="detska">
                      <ArrowBackIcon />
                      Назад
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
                          Колекции за детска соба
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
                          Детски бироа
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
                          Лежаи
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>За Нас</li>
          <li>Контакти</li>
        </ul>
      </div>
      <nav className="header__menu">
        <img src={logo} alt="logo"></img>
        <li>
          <Link to={"/"} className="link">
            Почетна
          </Link>
        </li>
        <li className="header__products">
          <span className="header__productsSpan">
            Производи <ArrowDropDownIcon />
          </span>
          <div className="header__dropdown">
            <div className="header__dropdownColumn">
              <ul>
                <li>
                  <Link to="/products/dnevna/all">
                    <span>
                      <WeekendIcon /> Дневна
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/dnevna/agolni-garnituri">
                        Аголни гарнитури
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/sofi">Софи</Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/fotelji">Фотелји</Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/taburetki">Табуретки</Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/klub-masi">Клуб Маси</Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/tv-komodi">ТВ Комоди</Link>
                    </li>
                    <li>
                      <Link to="/products/dnevna/komodi">Комоди</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/products/hodnik/all">
                    <span>
                      <MeetingRoomIcon />
                      Ходник
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/hodnik/skafovi-za-cevli">
                        Шкафови за чевли
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/hodnik/zakacalki-i-ogledala">
                        Закачалки и огледала
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/hodnik/kolekcii-za-hodnik">
                        Колекции за ходник
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/products/kujna/all">
                    <span>
                      <KitchenIcon />
                      Кујна
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/kujna/kujnski-agolni-garnituri">
                        Кујнски аголни гарнитури
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/kujna/standarni-kujni">
                        Стандардни кујни
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="header__dropdownColumn">
              <ul>
                <li>
                  <Link to="/products/spalna/all">
                    <span>
                      <BedIcon />
                      Спална
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/spalna/spalni-kompleti">
                        Спални комплети
                      </Link>
                    </li>

                    <li>
                      <Link to="/products/spalna/lezai">Лежаи</Link>
                    </li>

                    <li>
                      <Link to="/products/spalna/kreveti">Кревети</Link>
                    </li>

                    <li>
                      <Link to="/products/spalna/plakari">Плакари</Link>
                    </li>
                    <li>
                      <Link to="/products/spalna/nokni-skafcinja">
                        Ноќни шкафчиња
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/spalna/toaletni-masi">
                        Тоалетни маси
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/products/gradina/all">
                    <span>
                      <DeckIcon />
                      Мебел за градина
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/gradina/gradinarski-kompleti">
                        Градинарски комплети
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gradina/gradinarski-lulki">
                        Градинарски лулки
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gradina/gradinarski-cadori">
                        Градинарски чадори
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gradina/gradinarski-masi">
                        Градинарски маси
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gradina/gradinarski-stolovi">
                        Градинарски столови
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gradina/gradinarsko-osvetluvanje">
                        Градинарско осветлување
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="header__dropdownColumn">
              <ul>
                <li>
                  <Link to="/products/kancelarija/all">
                    <span>
                      <ChairAltIcon />
                      Канцеларија
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/kancelarija/biroa">Бироа</Link>
                    </li>
                    <li>
                      <Link to="/products/kancelarija/kancelariski-stolovi">
                        Канцелариски столови
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/kancelarija/gejmerski-stolovi">
                        Гејмерски столови
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/kancelarija/kancelariski-skafovi">
                        Канцелариски шкафови
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/products/trpezarija/all">
                    <span>
                      <TableRestaurantIcon />
                      Трпезарија
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/trpezarija/trpezariski-masi">
                        Трпезариски маси
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/trpezarija/trpezariski-stolovi">
                        Трпезариски столови
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/trpezarija/kujnski-garnituri">
                        Кујнски гарнитури
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/trpezarija/bar-stolovi-i-masi">
                        Бар столови и маси
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/products/detska/all">
                    <span>
                      <BedroomChildIcon />
                      Детска соба
                    </span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/products/detska/kolekcii-za-detska-soba">
                        Колекции за детска соба
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/detska/detski-biroa">
                        Детски бироа
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/detska/detski-lezai">Лежаи</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="header__dropdownColumn">
              <ul></ul>
            </div>
          </div>
        </li>
        <li className="header__aboutUs">За Нас</li>
        <li className="header__contacts">Контакти</li>
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
                Профил
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
                Одјави се
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
                Профил
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => {
                  navigate("/orderhistory");
                }}
              >
                Нарачки
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
                className="drowdown-item"
                to="#signout"
                onClick={signoutHandler}
              >
                Одјави се
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
                <p>Најави се</p>
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
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Header;
