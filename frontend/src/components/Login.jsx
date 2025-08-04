import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    //1.check emai id is valid
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    //2.check password is not blank
    if (password.trim() === "" ) {
      setError("Please enter password.");
      return;
    }

    //3.try to login
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/tasks");
    } catch {
      setError("Invalid username/password.");
    }
  };

  return (
     <div className="centered-container">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

      <button onClick={handleLogin}>Login</button>

      {/* Register button */}
      <p style={{ marginTop: "1rem" }}>
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          style={{ border: "none", background: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
        >
          Register here
        </button>
      </p>
    </div>
  );
}

export default Login;