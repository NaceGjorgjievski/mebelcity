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

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/product/:slug" element={<Test />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/products" element={<CategoryScreen />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
