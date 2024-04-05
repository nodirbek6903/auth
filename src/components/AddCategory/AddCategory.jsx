import React, { useState } from "react";
import "./AddCategory.css"
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const AddCategory = () => {
  const [name_EN, setName_EN] = useState("");
  const [name_RU, setName_RU] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate()

  const token = localStorage.getItem("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_en", name_EN);
    formData.append("name_ru", name_RU);
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response =  await fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if(response.status === 500){
      toast.error("Malumot saqlashda xatolik yuz berdi!!!")
    }else{
      toast.success("Malumot muvaffaqqiyatli saqlandi!!!",{
        autoClose:2000
      })
      navigate("/");
    }
  };
  return (
    <div className="container">
      <div className="add-container">
      <input
        type="text"
        value={name_EN}
        onChange={(e) => setName_EN(e.target.value)}
        placeholder="name_en"
        className="add-input"
      />
      <input
        type="text"
        value={name_RU}
        onChange={(e) => setName_RU(e.target.value)}
        placeholder="name_ru"
        className="add-input"
      />
      <input type="file" className="add-input fileInput" onChange={(e) => setImages([...e.target.files])} />
      <button type="submit" className="add-submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
    </div>
  );
};

export default AddCategory;
