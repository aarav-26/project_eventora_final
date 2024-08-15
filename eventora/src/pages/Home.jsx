// Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllEvents from '../components/user/AllEvents';
import FloatingButton from '../components/user/FloatingButton';
import Modal from '../components/Modal';
import Login from '../components/Login';
import Signup from '../components/Signup';
import './UserDashboard.css';
import Footer from './Footer';
import logo from './eventora_logo.png';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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

  useEffect(() => {
    if (!user.userId) {
      setShowLoginModal(true);
    }
  }, [user]);

  const handleEventClick = (event) => {
    if (user.userId) {
      navigate(`/user-dashboard/register/${event.eventId}`, { state: { event } });
    } else {
      setShowLoginModal(true);
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="welcome-section" id="Home">
        <div>
          <img className='logonav' src={logo} alt='logo' />
        </div>
        <div>
          <h1>Welcome to Eventora!</h1>
          <p className="quote">"The best way to predict the future is to create it." - Peter Drucker</p>
        </div>
      </div>
      <div className="events-section" onClick={handleEventClick}>
        <AllEvents events={events} />
      </div>
      <FloatingButton />
      <Modal show={showLoginModal} onClose={handleCloseLoginModal}>
        <Login onClose={handleCloseLoginModal} onSignupClick={() => setShowSignupModal(true)} />
      </Modal>
      <Modal show={showSignupModal} onClose={handleCloseSignupModal}>
        <Signup onClose={handleCloseSignupModal} onSignupSuccess={handleSignupSuccess} />
      </Modal>
      <Footer />
    </div>
  );
};

export default Home;
