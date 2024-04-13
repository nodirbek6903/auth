import React, { useEffect, useState } from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Main = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/categories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.data);
        setData(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  useEffect(() => {
    fetchData();
  }, []);

  const DeleteData = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Malumot muvaffaqqiyatli o'chirildi!", {
        autoClose: 2000,
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearch(searchText)
    const filteredSearch = data.filter((item) =>
      item.name_en.toLowerCase().includes(searchText)
    );
    if(searchText.length > 0){
      setData(filteredSearch)
    }else{
      fetchData()
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <div className="add-search">
        <a href="/addcategory" className="add">
          <button className="add-buttons">Add+</button>
        </a>
        <input
          type="text"
          className="search-input"
          value={search}
          onChange={handleSearch}
          placeholder="Search Here..."
        />
      </div>
      <div className="table-container">
        <table className="table-row">
          <thead>
            <tr>
              <th>№</th>
              <th>Avatar</th>
              <th>ID</th>
              <th>Name EN</th>
              <th>Name RU</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      width={60}
                      height={40}
                      src={`${imgUrl}${item.image_src}`}
                      alt=""
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.name_en}</td>
                  <td>{item.name_ru}</td>
                  <td>
                    <Link to={`/edit/${item.id}`}>
                      <button className="btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => DeleteData(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ color: "red", textTransform: "uppercase" }}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
