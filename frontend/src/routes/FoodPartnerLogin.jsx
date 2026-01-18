import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const FoodPartnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rememberMe"
                className="checkbox-input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="checkbox-label">
                Remember me
              </label>
            </div>

            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>

          <div className="form-link">
            New to partner program?{' '}
            <Link to="/partner/register">Apply now</Link>
          </div>

          <div className="form-link">
            <Link to="#">Forgot password?</Link>
          </div>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">OR</div>
            <div className="divider-line"></div>
          </div>

          <div className="form-link">
            Are you a customer?{' '}
            <Link to="/user/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
