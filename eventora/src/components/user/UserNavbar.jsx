// UserNavbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserNavbar.css';
import { CgProfile } from "react-icons/cg";
import { useUser } from '../../context/UserContext';

const UserNavbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const profile = localStorage.getItem('userDetails');
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setProfilePic(parsedProfile.profilePhoto);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const navigateToProfile = () => {
    navigate('/user-dashboard/profile');
  };

  return (
    <nav className="user-navbar">
      <ul>
        <li>
          <Link to="/user-dashboard">Home</Link>
        </li>
        <li>
          <Link to="/user-dashboard/registered-events">Registered Events</Link>
        </li>
        <li>
          <Link to="/user-dashboard/all-events">All Events</Link>
        </li>
        <li>
          <Link to="/user-dashboard/popular-events">Popular Events</Link>
        </li>
        <li>
          <Link to="/user-dashboard/about-us">About Us</Link>
        </li>
        <li>
          <Link to="/support">Support</Link>
        </li>
        <li className="profile-container" onClick={toggleProfile}>
          <CgProfile className="profile-icon" />
          {profileOpen && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <img 
                  src={`data:image/png;base64,${profilePic}`} 
                  alt="Profile" 
                  className="profile-photo-1" 
                  onClick={navigateToProfile} // Navigate to ProfilePage on click
                />
                <span className="profile-name">{user.userName}</span>
              </div>
              <ul>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
