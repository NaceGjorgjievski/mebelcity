import "./App.css";
import Home from "./screens/HomeWithJumbo";
import ProductScreen from "./screens/ProductScreen";
import Test from "./screens/ProductScreenBootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Store } from "./Store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartScreen from "./screens/CartScreen";
import CategoryScreen from "./screens/CategoryScreen";
import SigninScreen from "./screens/SigninScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import CardPaymentScreen from "./screens/CardPaymentScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <Header />

      <Routes>
        <Route path="/product/:slug" element={<Test />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/shipping" element={<ShippingAddressScreen />} />
        <Route path="/payment" element={<PaymentMethodScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="placeorder/payment" element={<CardPaymentScreen />} />
        <Route path="/orderhistory" element={<OrderHistoryScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/products" element={<CategoryScreen />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
