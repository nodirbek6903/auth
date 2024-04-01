import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
      setError(null);
      const data = await response.json();
    //   token saqlash
      const token = data?.data?.tokens?.accessToken?.token;
      localStorage.setItem("access_token",token)
    //   tekshiruv
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  return (
    <div className="login-container">
      <form action="" onSubmit={handleSubmit}>
        <h1>Kirish</h1>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={handleLogin}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
