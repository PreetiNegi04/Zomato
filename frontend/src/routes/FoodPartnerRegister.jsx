import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const FoodPartnerRegister = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
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
            <h1 className="auth-title">Join as Partner</h1>
            <p className="auth-subtitle">Register your restaurant</p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label className="form-label">Restaurant Name</label>
              <input
                type="text"
                name="restaurantName"
                className="form-input"
                placeholder="Your Restaurant Name"
                value={formData.restaurantName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                className="form-input"
                placeholder="Full Name"
                value={formData.ownerName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="partner@restaurant.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Restaurant Address</label>
              <input
                type="text"
                name="address"
                className="form-input"
                placeholder="Street address"
                value={formData.address}
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
              Register Restaurant
            </button>
          </form>

          <div className="form-link">
            Already registered?{' '}
            <Link to="/partner/login">Sign in</Link>
          </div>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">OR</div>
            <div className="divider-line"></div>
          </div>

          <div className="form-link">
            Are you a customer?{' '}
            <Link to="/user/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
