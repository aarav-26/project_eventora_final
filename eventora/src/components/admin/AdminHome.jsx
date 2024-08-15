import React from 'react';
import { Link } from 'react-router-dom';
import "./AdminNavbar.css";
import { useUser } from '../../context/UserContext';
const AdminHome = () => {
  const { user } = useUser();

  return (
    <div className="info-section">
      <h1>Welcome, {user.userName}!</h1>
      <p>Welcome to the admin dashboard. Here you can manage all the events, view statistics, and create new events.</p>
      <p>Use the navigation on the left to access different sections.</p>
      <div className="create-button-section">
        <button className="create-button"><Link to="/admin-dashboard/create-event" >Create Event</Link></button>
      </div>
    </div>
  );
};

export default AdminHome;
