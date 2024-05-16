import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./view/client/home/Home";
import Register from "./view/auth/Register";
import Login from "./view/auth/Login";
import ProductList from "./view/client/products/products"; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./provider/features/auth/AuthSlice";
import DasbhoardLayout from "./layout/DashboardLayout";
import CatalogIndex from "./view/catalog/CatalogIndex";
import ProductIndex from "./view/product/ProductIndex";
import DefaultLayout from "./layout/DefaultLayout";
import ProductDetail from "./view/client/products/productDetails";

function App() {
  const { user, isError, isSuccess, isLoading, getuser, message } = useSelector(
    (state) => state.auth

  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  if (isLoading) {
    return(
      <h1>loading</h1>
    )
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
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
