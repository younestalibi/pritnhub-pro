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
import ArticleIndex from "./view/admin/article/ArticleIndex";
import DefaultLayout from "./layout/DefaultLayout";
import ProductDetail from "./view/client/products/ProductDetail";
import CartIndex from "./view/client/cart/CartIndex";
import Loader from "./components/loader/Loader";
import Page404 from "./view/abort/404";
import ProfileIndex from "./view/client/profile/ProfileIndex";
import AdminRoute from "./components/route/AdminRoute";
import AuthRoute from "./components/route/AuthRoute";
import CheckoutIndex from "./view/client/checkout/CheckoutIndex";
function App() {
  const {getUserState } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  if (getUserState.isLoading) {
    return <Loader />;
  } else {
    const adminRoutes = [
      { path: "catalog", element: <CatalogIndex /> },
      { path: "product", element: <ProductIndex /> },
      { path: "article", element: <ArticleIndex /> },
    ];

    const authRoutes = [
      { path: "cart", element: <CartIndex /> },
      { path: "checkout", element: <CheckoutIndex /> },
      { path: "profile", element: <ProfileIndex /> },
    ];

    const publicRoutes = [
      { path: "/", element: <Home /> },
      { path: "category/:category", element: <ProductList /> },
      { path: "product/:product", element: <ProductDetail /> },
      { path: "product/:id/:productName", element: <ProductDetail /> },
      { path: "login", element: <Authentication /> },
    ];

    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="admin"
            element={
              <AdminRoute>
                <DasbhoardLayout />
              </AdminRoute>
            }
          >
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          <Route path="/" element={<DefaultLayout />}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            {authRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<AuthRoute>{route.element}</AuthRoute>}
              />
            ))}
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
