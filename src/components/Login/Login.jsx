import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import {toast} from "react-toastify"
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: login,
            password: password,
          }),
        }
      );
      const data = await response.json();
      //   token saqlash
      const token = data?.data?.tokens?.accessToken?.token;
      localStorage.setItem("access_token", token);
      //   tekshiruv
      if (data.success) {
        toast.success("Tizimga muvaffaqqiyatli kirdingiz!!!",{
          autoClose: 2000,
        })
        navigate("/");
      } else {
        toast.error("Login yoki parol xato kiritildi");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-container">
      <form action="" className="login">
        <h1>Login</h1>
        <input
          type="text"
          value={login}
          onChange={handleLogin}
          placeholder="login"
        />
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="password"
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
