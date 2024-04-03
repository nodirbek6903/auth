import React, { useState } from "react";

const Home = () => {
  const [name_EN, setName_EN] = useState("");
  const [name_RU, setName_RU] = useState("");
  const [images, setImages] = useState([]);

  const token = localStorage.getItem("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_en", name_EN);
    formData.append("name_ru", name_RU);
    images.forEach((image) => {
      formData.append("images", image);
    });

    await fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  };
  return (
    <div>
      <input
        type="text"
        value={name_EN}
        onChange={(e) => setName_EN(e.target.value)}
        placeholder="name_en"
      />
      <input
        type="text"
        value={name_RU}
        onChange={(e) => setName_RU(e.target.value)}
        placeholder="name_ru"
      />
      <input type="file" onChange={(e) => setImages([...e.target.files])} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Home;
