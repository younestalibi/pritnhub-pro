import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
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

function App() {
  const { user,getUserState } = useSelector(
    (state) => state.auth

  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  if (getUserState.isLoading) {
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
            <Route path="login" element={<Authentication/>} />
            <Route path="/detail" element={<ProductDetail/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
