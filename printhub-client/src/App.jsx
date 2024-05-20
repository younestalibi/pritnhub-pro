import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./view/client/home/Home";
import Authentication from "./view/auth/Authentication";
import ProductList from "./view/client/products/products";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./provider/features/auth/AuthSlice";
import DasbhoardLayout from "./layout/DashboardLayout";
import CatalogIndex from "./view/admin/catalog/CatalogIndex";
import ProductIndex from "./view/admin/product/ProductIndex";
import DefaultLayout from "./layout/DefaultLayout";
import ProductDetail from "./view/client/products/ProductDetail";
import CartIndex from "./view/client/cart/CartIndex";
import useAuth from "./hooks/useAuth";
import Loader from "./components/loader/Loader";
function App() {
  const { user, getUserState } = useSelector((state) => state.auth);
  const isAuthenticated = useAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  if (getUserState.isLoading) {
    return <Loader/>;
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<DasbhoardLayout />}>
            <Route path="catalog" element={<CatalogIndex />} />
            <Route path="product" element={<ProductIndex />} />
          </Route>

          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<ProductList />} />
            <Route path="/product/:product" element={<ProductDetail />} />
            <Route path="login" element={<Authentication />} />
            <Route path="/product/:id/:productName" element={<ProductDetail />} />  {/* the path of this route must be changed */}
            {isAuthenticated && <Route path="/cart" element={<CartIndex />} />}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
