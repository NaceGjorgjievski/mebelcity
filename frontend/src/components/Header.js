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
                      <li>Аголни гарнитури</li>
                      <li>Софи</li>
                      <li>Фотелји</li>
                      <li>Табуретки</li>
                      <li>Клуб Маси</li>
                      <li>ТВ комоди</li>
                      <li>Комоди</li>
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
                      <li>Шкафови за чевли</li>
                      <li>Закачалки и огледала</li>
                      <li>Колекции за ходник</li>
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
                      <li>Кујнски аголни гарнитури</li>
                      <li>Стандардни кујни</li>
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
                      <li>Спални комплети</li>
                      <li>Лежаи</li>
                      <li>Кревети</li>
                      <li>Плакари</li>
                      <li>Ноќни шкафчиња</li>
                      <li>Тоалетни маси</li>
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
                      <li>Градинарски комплети</li>
                      <li>Градинарски лулки</li>
                      <li>Градинарски чадори</li>
                      <li>Градинарски маси</li>
                      <li>Градинарски столови</li>
                      <li>Градинарско осветлување</li>
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
                      <li>Бироа</li>
                      <li>Канцелариски столови</li>
                      <li>Гејмерски столови</li>
                      <li>Канцелариски шкафови</li>
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
                      <li>Трпезариски маси</li>
                      <li>Трпезариски столови</li>
                      <li>Кујнски гарнитури</li>
                      <li>Бар столови и маси</li>
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
                      <li>Колекции за детска соба</li>
                      <li>Детски бироа</li>
                      <li>Лежаи</li>
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
                  <a href="#">
                    <span>
                      <WeekendIcon /> Дневна
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Аголни гарнитури</a>
                    </li>
                    <li>
                      <a href="#">Софи</a>
                    </li>
                    <li>
                      <a href="#">Фотелји</a>
                    </li>
                    <li>
                      <a href="#">Табуретки</a>
                    </li>
                    <li>
                      <a href="#">Клуб Маси</a>
                    </li>
                    <li>
                      <a href="#">ТВ Комоди</a>
                    </li>
                    <li>
                      <a href="#">Комоди</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>
                      <MeetingRoomIcon />
                      Ходник
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Шкафови за чевли</a>
                    </li>
                    <li>
                      <a href="#">Закачалки и огледала</a>
                    </li>
                    <li>
                      <a href="#">Колекции за ходник</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>
                      <KitchenIcon />
                      Кујна
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Кујнски аголни гарнитури</a>
                    </li>
                    <li>
                      <a href="#">Стандардни кујни</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="header__dropdownColumn">
              <ul>
                <li>
                  <a href="#">
                    <span>
                      <BedIcon />
                      Спална
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Спални комплети</a>
                    </li>

                    <li>
                      <a href="#">Лежаи</a>
                    </li>

                    <li>
                      <a href="#">Кревети</a>
                    </li>

                    <li>
                      <a href="#">Плакари</a>
                    </li>
                    <li>
                      <a href="#">Ноќни шкафчиња</a>
                    </li>
                    <li>
                      <a href="#">Тоалетни маси</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>
                      <DeckIcon />
                      Мебел за градина
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Градинарски комплети</a>
                    </li>
                    <li>
                      <a href="#">Градинарски лулки</a>
                    </li>
                    <li>
                      <a href="#">Градинарски чадори</a>
                    </li>
                    <li>
                      <a href="#">Градинарски маси</a>
                    </li>
                    <li>
                      <a href="#">Градинарски столови</a>
                    </li>
                    <li>
                      <a href="#">Градинарско осветлување</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="header__dropdownColumn">
              <ul>
                <li>
                  <a href="#">
                    <span>
                      <ChairAltIcon />
                      Канцеларија
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Бироа</a>
                    </li>
                    <li>
                      <a href="#">Канцелариски столови</a>
                    </li>
                    <li>
                      <a href="#">Гејмерски столови</a>
                    </li>
                    <li>
                      <a href="#">Канцелариски шкафови</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>
                      <TableRestaurantIcon />
                      Трпезарија
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Трпезариски маси</a>
                    </li>
                    <li>
                      <a href="#">Трпезариски столови</a>
                    </li>
                    <li>
                      <a href="#">Кујнски гарнитури</a>
                    </li>
                    <li>
                      <a href="#">Бар столови и маси</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>
                      <BedroomChildIcon />
                      Детска соба
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Колекции за детска соба</a>
                    </li>
                    <li>
                      <a href="#">Детски бироа</a>
                    </li>
                    <li>
                      <a href="#">Лежаи</a>
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
          {userInfo ? (
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
          ) : (
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
