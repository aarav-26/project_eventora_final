import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Popup.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose, onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  // const navigate = useNavigate();

  const handleLogin = async () => {
    const endpoint = isAdmin ? 'admins/login' : 'users/login';

    try {
      const response = await fetch(`http://localhost:8084/${endpoint}/${email}/${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const userData = await response.json();
      localStorage.setItem('userDetails', JSON.stringify(userData));
      navigate(isAdmin ? '/admin-dashboard' : '/user-dashboard');
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="popup-container" onClick={onClose}>
      <div className="popup-form-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-button close-btn" onClick={onClose}>×</button>
        <h2 className="popup-h2">{isAdmin ? 'Admin Login' : 'User Login'}</h2>
        <input type="email" className="popup-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="popup-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="popup-button" onClick={handleLogin}>Login</button>
        <button className="popup-button switch-btn" onClick={() => setIsAdmin(!isAdmin)}>Switch to {isAdmin ? 'User' : 'Admin'} Login</button>
        <p className="popup-navtosign">New user? <span className="signup-link" onClick={onSignupClick}>Sign up here</span></p>
      </div>
    </div>
  );
};

export default Login;
