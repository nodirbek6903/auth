import { Link } from "react-router-dom";


function App() {


  return (
    <div className="container">
      <h1>Main Page</h1>
      <Link to="/login">
      <button className="log-btn">Login Page</button>
      </Link>
    </div>
  );
}

export default App;
