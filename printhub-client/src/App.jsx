import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./view/home/Home";
import Register from "./view/auth/Register";
import Login from "./view/auth/Login";
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
