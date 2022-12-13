import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getError } from "../components/utils";
import Button from "react-bootstrap/Button";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import Form from "react-bootstrap/Form";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      console.log(action.payload);
      return {
        ...state,
        //orders: action.payload,

        orders: action.payload.orders,
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

function AdminOrdersScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const isConfirmed = sp.get("isConfirmed") || "all";
  const isShipped = sp.get("isShipped") || "all";
  const query = sp.get("query") || "all";
  const page = sp.get("page") || 1;
  const [{ loading, error, orders, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/orders?page=${page}&isConfirmed=${isConfirmed}&isShipped=${isShipped}&query=${query}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [isConfirmed, isShipped, page, query]);
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterIsConfirmed = filter.isConfirmed || isConfirmed;
    const filterIsShipped = filter.isShipped || isShipped;
    const filterQuery = filter.query || query;
    return `?page=${filterPage}&isConfirmed=${filterIsConfirmed}&isShipped=${filterIsShipped}&query=${filterQuery}`;
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
      <div id="mainScreen">
        <div className="taskContainer">
          <h1 style={{ marginTop: "20px" }}>Нарачки</h1>
          <div
            className="filterContainer"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              variant="danger"
              onClick={(e) => {
                navigate(
                  getFilterUrl({ isConfirmed: "false", isShipped: "false" })
                );
              }}
            >
              За потврда
            </Button>
            <Button
              variant="danger"
              onClick={(e) =>
                navigate(
                  getFilterUrl({ isShipped: "false", isConfirmed: "true" })
                )
              }
            >
              За испорака
            </Button>
            <Button
              variant="danger"
              onClick={(e) =>
                navigate(
                  getFilterUrl({ isShipped: "true", isConfirmed: "true" })
                )
              }
            >
              Пристигнати
            </Button>
          </div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table
              className="table"
              style={{ marginTop: "20px", width: "90%", textAlign: "center" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Дата</th>
                  <th>Вкупно</th>
                  <th>Статус</th>
                  <th>Акции</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.substring(0, 7)}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>

                    <td>
                      {order.isDelivered ? (
                        <CheckIcon></CheckIcon>
                      ) : order.isShipped ? (
                        <LocalShippingIcon></LocalShippingIcon>
                      ) : order.isConfirmed ? (
                        <HourglassBottomIcon></HourglassBottomIcon>
                      ) : (
                        <PhonePausedIcon></PhonePausedIcon>
                      )}
                    </td>
                    <td>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          navigate(`/admin/order/${order._id}`);
                        }}
                      >
                        Детали
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
    </div>
  );
}

export default AdminOrdersScreen;
