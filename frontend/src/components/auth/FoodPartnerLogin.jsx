import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";

const FoodPartnerLogin = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/auth/food-partner/login",
      {
        email: email.current.value,
        password: password.current.value,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
    navigate("/create-food");
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🍕</div>
            <h1 className="auth-title">Partner Portal</h1>
            <p className="auth-subtitle">Sign in to manage your restaurant</p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="partner@restaurant.com"
                ref={email}
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
            New to partner program?{" "}
            <Link to="/partner/register">Apply now</Link>
          </div>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">OR</div>
            <div className="divider-line"></div>
          </div>

          <div className="form-link">
            Are you a customer? <Link to="/user/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
