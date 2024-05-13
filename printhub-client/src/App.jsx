import "./App.css";
import "./components/common/footer/footer.css";
import "./components/common/header/header.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./view/home/Home";
import Register from "./view/auth/Register";
import Login from "./view/auth/Login";
import ProductList from "./components/products/products"; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./provider/features/auth/AuthSlice";
import DasbhoardLayout from "./layout/DashboardLayout";
import CatalogIndex from "./view/catalog/CatalogIndex";
import ProductIndex from "./view/product/ProductIndex";

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

          <Route path="/" element={<Home />} />
           <Route path="/products/:category" element={<ProductList/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
