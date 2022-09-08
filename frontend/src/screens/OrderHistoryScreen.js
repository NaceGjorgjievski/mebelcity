import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../components/utils";
import { Store } from "../Store";
import Button from "react-bootstrap/Button";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get("/api/orders/mine", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className="pageContainer shipPC">
      <Helmet>
        <title>Историја на нарачки</title>
      </Helmet>
      <h1 style={{ marginTop: "20px" }}>Историја на нарачки</h1>
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
                  ) : (
                    <ClearIcon></ClearIcon>
                  )}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
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
    </div>
  );
}

export default OrderHistoryScreen;
