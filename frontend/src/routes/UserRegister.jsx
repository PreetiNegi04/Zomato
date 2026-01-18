import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

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
              <input
                type="text"
                name="fullName"
                className="form-input"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                className="checkbox-input"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
              />
              <label htmlFor="agreeTerms" className="checkbox-label">
                I agree to the <Link to="#">Terms and Conditions</Link>
              </label>
            </div>

            <button type="submit" className="auth-button">
              Create Account
            </button>
          </form>

          <div className="form-link">
            Already have an account?{' '}
            <Link to="/user/login">Sign in</Link>
          </div>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">OR</div>
            <div className="divider-line"></div>
          </div>

          <div className="form-link">
            Are you a food partner?{' '}
            <Link to="/partner/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
