// src/components/user/UserDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisteredEvents from '../components/user/RegisteredEvents';
import AllEvents from '../components/user/AllEvents';
import PopularEvents from '../components/user/PopularEvents';
import OtherEvents from '../components/user/OtherEvents';
import AboutUs from './AboutUs';
import UserNavbar from '../components/user/UserNavbar';
import Footer from './Footer';
import FloatingButton from '../components/user/FloatingButton';
import './UserDashboard.css';
import logo from './logo.png';
import { useUser } from '../context/UserContext';
import ProfileForm from '../components/user/ProfileForm';
import Register from '../components/user/Register';

const UserDashboard = () => {
  const { user } = useUser();
  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://localhost:8084/events/getall')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <UserNavbar />
      <div className="welcome-section">
        <div>
          <img className='logonav' src={logo} alt='logo'/>  
        </div>
        <div>
          <h1>Welcome, {user.userName}!</h1>
          <p className="quote">"The best way to predict the future is to create it." - Peter Drucker</p>
        </div>
      </div>
      <div className="events-section">
        <Routes>
          <Route path="registered-events" element={<RegisteredEvents userId={user.userId} />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="all-events" element={<AllEvents events={events} />} />
          <Route path="popular-events" element={<PopularEvents events={events} />} />
          <Route path="other-events" element={<OtherEvents events={events} />} />
          <Route path="profile" element={<ProfileForm />} />
          <Route path="register/:eventId" element={<Register />} />
          <Route path="*" element={<AllEvents events={events} />} />
        </Routes>
      </div>
      <Footer />
      <FloatingButton />
    </div>
  );
};

export default UserDashboard;
