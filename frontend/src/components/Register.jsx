import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabledRegBtn, setDisabledRegBtn] = useState(true);
  const [error, setError] = useState("");
  const [success,setSuccess] = useState("");

 

  //set register button as disabled until user not added anything in any field
  useEffect(() => {
    let anyFieldFilled = false;
    if (email.trim() || password.trim() || confirmPassword.trim()) {
      anyFieldFilled = true;
    }

    setDisabledRegBtn(!anyFieldFilled);
  }, [email, password, confirmPassword]);

  //check user entered email is valid or not
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    //vakidations before proceeding to register
    //1.check emai id is valid
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    //2.check both password fields are added value or not
    if (password.trim() === "" || confirmPassword.trim() === "") {
      setError("Please enter password and confirm password.");
      return;
    }

    //3.check both password are same or not
    if (password !== confirmPassword) {
      setError("Passwords and Confirm Passwords must be same.");
      return;
    }

    //4.try to register user
    try {
      await axios.post("http://localhost:5000/api/register", { email, password });

      // Show success message
      setSuccess("Registration successful! Redirecting to login...");

       // Delay navigation to login page
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 seconds

    } catch (e) {
      setError("Registration failed contact to admin.");
    }
  };

  return (
    <div className="centered-container">
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/> 

      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
      
      <button onClick={handleRegister} disabled={disabledRegBtn}>Register</button>

      {/* Login button */}
      <p style={{ marginTop: "1rem" }}>
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          style={{ border: "none", background: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
        >
          Login here
        </button>
      </p>
    </div>
  );
}

export default Register;
