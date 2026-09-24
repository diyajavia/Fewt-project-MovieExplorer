import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from './loginHelper';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const validation = validateLogin(username, password);
    if (!validation.success) {
      setError(validation.message);
      return;
    }

    // Success: update parent auth state and redirect to home
    onLoginSuccess(username);
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="text-center mb-4">
          <div className="login-logo mb-2">
            <i className="bi bi-film me-2"></i>CineVerse
          </div>
          <p className="text-secondary small">Login to access premium CineVerse features</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 mb-3 small" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">Username or Email</label>
            <div className="login-input-group">
              <i className="bi bi-person ms-2 text-secondary"></i>
              <input 
                type="text" 
                className="login-input-field" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Password</label>
            <div className="login-input-group">
              <i className="bi bi-lock ms-2 text-secondary"></i>
              <input 
                type="password" 
                className="login-input-field" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
