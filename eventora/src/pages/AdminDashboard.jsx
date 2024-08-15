import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './AdminDashboard.css';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminHome from '../components/admin/AdminHome';
import CreateEvent from '../components/admin/CreateEvent';
import HostedEvents from '../components/admin/HostedEvents';
import Statistics from '../components/admin/Statistics';
import EventDetails from '../components/admin/EventDetails';
import Participants from '../components/admin/Participants';

const AdminDashboard = () => {
   
  return (
    <div className="admin-dashboard-container">
      <AdminNavbar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/hosted-events" element={<HostedEvents />} />
          <Route path="hosted-events/event-details/:eventId" element={<EventDetails/>}/>
          <Route path="/hosted-events/event-details/participants/:eventId" element={<Participants/>}/>
          <Route path="/statistics" element={<Statistics />} />
          {/* Ensure that the path matches the links in AdminNavbar */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
