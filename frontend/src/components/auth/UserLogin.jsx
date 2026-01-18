import { useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/auth/user/login",
      {
        email: email.current.value,
        password: password.current.value,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🍕</div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account</p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                ref={email}
                className="form-input"
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                ref={password}
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="auth-button"
            >
              Sign In
            </button>
          </form>

          <div className="form-link">
            Don't have an account? <Link to="/user/register">Create one</Link>
          </div>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">OR</div>
            <div className="divider-line"></div>
          </div>

          <div className="form-link">
            Are you a food partner?
            <Link to="/partner/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
