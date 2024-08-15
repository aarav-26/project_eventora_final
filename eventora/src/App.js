// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Support from './pages/Support';
import Home from './pages/Home';
import Signup from './components/Signup';
import VideoUpload from './context/VideoUpload';
import VideoPlayer from './context/VideoPlayer';
import LandingPage from './pages/LandingPage';

const App = () => {

  window.onload = function() {
    // Clear specific items
    // localStorage.removeItem('userData');
    // localStorage.removeItem('userDetails');

    // Or clear all items
    localStorage.clear();
};

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-dashboard/*" element={<UserDashboard />} />
          <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/logout" element={<Home />} />
          <Route path="/video" element={<VideoUpload/>}/>
          <Route path="/videoplay" element={<VideoPlayer/>}/>
          <Route path="/land" element={<LandingPage/>}/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
