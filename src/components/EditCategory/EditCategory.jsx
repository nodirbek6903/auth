import React, { useEffect, useState } from "react";
import "./EditCategory.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCategory = () => {
  const [nameEN, setNameEN] = useState("");
  const [nameRU, setNameRU] = useState("");
  const [images, setImage] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();


  const imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setNameEN(data?.data?.name_en);
        setNameRU(data?.data?.name_ru);
        setImage([imgUrl + data?.data?.image_src])
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  console.log(images);

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("name_en", nameEN);
      formData.append("name_ru", nameRU);
      images.forEach((image) => {
        formData.append("images", image);
      });
      await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      navigate("/");
      toast.success("Malumot muvaffaqqiyatli o'zgartirildi!",{
        autoClose:2000
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <div className="edit-container">
      <form action="" className="form-container" onSubmit={handleSaveClick}>
        <img src={images} className="img" alt="" />
        <input
          type="text"
          value={nameEN}
          onChange={(e) => setNameEN(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          value={nameRU}
          onChange={(e) => setNameRU(e.target.value)}
          className="input-field"
        />
        <input type="file" className="file-input" onChange={(e) => setImage([...e.target.files])} />
        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditCategory;
