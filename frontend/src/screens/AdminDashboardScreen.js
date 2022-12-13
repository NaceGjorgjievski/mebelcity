import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/AdminDashboard.css";
import AddProductForm from "../components/AddProductForm";
import { Store } from "../Store";
import { useNavigate, Link } from "react-router-dom";
import ListProducts from "../components/ListProducts";
import { Helmet } from "react-helmet-async";

function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      return navigate("/");
    }
  }, [userInfo, navigate]);

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
    </div>
  );
}

export default AdminDashboardScreen;
