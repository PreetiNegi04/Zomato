import { useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const UserRegister = () => {
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/api/auth/user/register', {
      fullName: fullName.current.value,
      email: email.current.value,
      password: password.current.value,

      
    },{
      withCredentials: true,
    });
    console.log(response.data)
    navigate('/');


  }

  /*const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    }); 
  };*/

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🍕</div>
            <h1 className="auth-title">Join Us</h1>
            <p className="auth-subtitle">Create your account</p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input ref ={fullName}
                type="text"
                name="fullName"
                className="form-input"
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input ref={email}
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input ref={password}
                type="password"
                name="password"
                className="form-input"
                placeholder="Create a strong password"
              />
            </div>

            <button type="submit" className="auth-button" onClick={handleSubmit}>
              Create Account
            </button>
          </form>

          <div className="form-link">
            Already have an account? <Link to="/user/login">Sign in</Link>
          </div>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">OR</div>
            <div className="divider-line"></div>
          </div>

          <div className="form-link">
            Are you a food partner?
            <Link to="/partner/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
