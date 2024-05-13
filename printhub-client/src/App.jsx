import "./App.css";
import "./components/common/footer/footer.css";
import "./components/common/header/header.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./view/home/Home";
import Register from "./view/auth/Register";
import Login from "./view/auth/Login";
import ProductList from "./components/products/products"; 
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./provider/features/auth/AuthSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getUser());
  },[])
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
              <Route index element={<Home/>}/>
            </Route> */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
