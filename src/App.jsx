import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import AddCategory from "./components/AddCategory/AddCategory";
import Main from "./components/Main/Main";
import EditCategory from "./components/EditCategory/EditCategory";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

function App() {
  const [token,setToken] = useState(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken)
    if(!storedToken){
      navigate("/login")
    }
  },[token])
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/edit/:id" element={<EditCategory />} />
      </Routes>
    </>
  );
}

export default App;
