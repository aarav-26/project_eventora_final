import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = ({ onClose, onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

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
      setUser({ userName: userData.userName, userId: userData.userId || userData.adminId , role: isAdmin ? 'admin' : 'user' });
      navigate(isAdmin ? '/admin-dashboard' : '/user-dashboard');
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="popup-container" onClick={onClose}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <button className="switch-btn" onClick={() => setIsAdmin(!isAdmin)}>Switch to {isAdmin ? 'User' : 'Admin'} Login</button>
        <p className="navtosign">New user? <span className="signup-link" onClick={onSignupClick}>Sign up here</span></p>
      </div>
    </div>
  );
};

export default Login;
