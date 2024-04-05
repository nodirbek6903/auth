import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import AddCategory from "./components/AddCategory/AddCategory";
import Main from "./components/Main/Main";
import EditCategory from './components/EditCategory/EditCategory';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify";

function App() {
  

  return (
    <>
    <ToastContainer />
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path='/login' exact  element={<Login />} />
      <Route path="/addcategory" element={<AddCategory />} />
      <Route path="/edit/:id" element={<EditCategory />} />
      {/* <Route path="/addcategory" element={<AddCategory />} /> */}
      </Routes>
    </>
  );
}

export default App;
