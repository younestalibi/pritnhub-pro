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
import ContactApp from "./view/client/contact/contact";
import ContactIndex from "./view/admin/contact/contactIndex";
import OrderIndex from "./view/admin/order/OrderIndex";
import { getSettings } from "./provider/features/setting/SettingSlice";
import SettingIndex from "./view/admin/setting/SettingIndex";
import PayPal from "./components/PaymentMethods/Paypal";
import CheckoutSuccess from "./view/client/checkout/CheckoutSuccess";
import OrderIndexUser from "./view/client/order/OrderIndexUser";
import OverViewIndex from "./view/admin/overview/OverViewIndex";
import UserIndex from "./view/admin/user/UserIndex";

function App() {
  const { getUserState } = useSelector((state) => state.auth);
  const { settings } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSettings());
    dispatch(getUser());
  }, []);

  if (getUserState.isLoading) {
    return <Loader />;
  } else {
    const adminRoutes = [
      { path: "catalog", element: <CatalogIndex /> },
      { path: "product", element: <ProductIndex /> },
      { path: "article", element: <ArticleIndex /> },
      { path: "contact", element: <ContactIndex /> },
      { path: "order", element: <OrderIndex /> },
      { path: "setting", element: <SettingIndex /> },
      { path: "user", element: <UserIndex /> },
      { path: '', element: <OverViewIndex /> },
    ];

    const authRoutes = [
      { path: "cart", element: <CartIndex /> },
      { path: "checkout", element: <CheckoutIndex /> },
      { path: "profile", element: <ProfileIndex /> },
      { path: "order", element: <OrderIndexUser /> },
    ];

    const publicRoutes = [
      { path: "/", element: <Home /> },
      { path: "category/:category", element: <ProductList /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "login", element: <Authentication /> },
      { path: "contact", element: <ContactApp /> },
      { path: "paypal", element: <PayPal /> },
      { path: "success-payment", element: <CheckoutSuccess /> },
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
