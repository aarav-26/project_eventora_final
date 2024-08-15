import React, { useEffect, useState } from 'react';
import "../Styles/event.css";
import { assets } from '../assets/assets';
import { CiCalendarDate } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { HiMusicNote } from "react-icons/hi";
import { FaVolleyballBall, FaWhatsapp } from "react-icons/fa";
import { GiVideoConference } from "react-icons/gi";
import { GrCompliance } from "react-icons/gr";
import { FaSquarePollVertical, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { BiCalendarHeart } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa6";
import Modal from '../components/common/Modal';
import Login from '../components/login/Login';
import Signup from '../components/login/Signup';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const images = [
        assets.event4,
        assets.event8,
        assets.event9,
        assets.event7
  ];

  const [events, setEvents] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8084/events/getall')  // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.slice(0,3));
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 1500);

    return () => clearInterval(slideInterval);
  }, [currentIndex, 1500]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
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

  const handleLoginClick = () => {
    console.log("Login button clicked");
    setShowLoginModal(true);
  };
  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const handleViewMoreClick = () => {
    if (user.userId) {
      navigate('/user-dashboard');
    } else {
      setShowLoginModal(true);
    }
  };


  return (
    <div className="landing-page">
      {/* NAVBAR*/}
      <header className="lp-header">
        <div className="lp-logo">Eventora</div>
        <div className="lp-auth-buttons">
          <button onClick={handleLoginClick} className="lp-login-button">Log in</button>
          <button onClick={handleSignupClick} className="lp-signup-button">Sign up</button>
        </div>
      </header>
      {/* HERO SECTION TITLE */}
      <section className="lp-hero-section">
        <div className="lp-hero-content">
          <h1 className='lp-pick'>Pick up your </h1>
          <h1><span className='lp-wonder'>wonderful</span></h1>
          <h1 className='lp-pick'>plans</h1>
          <br></br>
          <br></br>
          <div className="lp-search-bar">
            <img src={assets.logo} alt="logo" className='lp-logo-search'></img>
            <input type="text" placeholder="Find the event you're interested in" />
            <input type="text" placeholder="New York, NY" />
            <button>Search</button>
          </div>
        </div>
      </section>
      {/* NEW EVENTS BY PLACE */}
      <section className="lp-new-events-section">
      <div className='lp-line-new'>
        <h2 className='lp-new-events'>New events in <span>NYC</span></h2>
        <button onClick={handleViewMoreClick} className="lp-view-more-button">View more</button>
      </div>
      <div className="lp-events">
        {events.map((event) => (
          <div key={event.eventId} className="lp-event-card">
            <img
              src={event.eventImage}
              alt="event"
              className='lp-event-image'
            />
            <div className="lp-event-details">
              <div className='lp-firstrow'>
                <h3>{event.eventName}</h3>
                <p className='lp-price'>From ${event.registrationFees || 'Free'}</p>
              </div>
              <p className='lp-date'><CiCalendarDate /> {formatDate(event.startDate)} | {event.endDate}</p>
              <p><GrLocation /> {event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
      {/* CATEGORIES */}
      <section className='lp-categories'>
        <div className='lp-cat'>
          <h1 className='lp-explore-categories'>
            Explore by <span className='lp-span-categories'>categories</span>
          </h1>
          <div className='lp-categories-icons'>
            <ul className='lp-ul-categories'>
              <li className='lp-li-categories'><HiMusicNote /><span className='lp-ul-text'>Concert</span></li>
              <li className='lp-li-categories'><FaVolleyballBall /><span className='lp-ul-text'>Sports</span></li>
              <li className='lp-li-categories'><BiCalendarHeart /><span className='lp-ul-text'>Technical Events</span></li>
              <li className='lp-li-categories'><GiVideoConference /><span className='lp-ul-text'>Conferences</span></li>
              <li className='lp-li-categories'><GrCompliance /><span className='lp-ul-text'>Competitions</span></li>
              <li className='lp-li-categories'><FaSquarePollVertical /><span className='lp-ul-text'>Political Events</span></li>

            </ul>
          </div>
        </div>
      </section>
      {/* UPCOMING EVENTS */}
      <section className='lp-upcoming'>
        <div className='lp-upcoming-content'>
          <div className='lp-upcoming-header'>
            <h1 className='lp-upcoming-head'>
              Upcoming in <span className='lp-span-categories' >24h</span>
            </h1>
            <button onClick={handleViewMoreClick} className="lp-view-more-button">View more</button>
          </div>
          <div className="lp-events-upcoming">
            <div className="lp-event-card-upcoming">
              <img src={assets.event5} alt="event" className='lp-event-image'></img>
              <div className="lp-event-details">
                <h3>Urban Marathon</h3>
                <p>From $20</p>
                <p className='lp-date'><CiCalendarDate /> Monday, June 06 | 06:00 AM</p>
                <p><GrLocation /> New York, NY</p>

              </div>
            </div>
            <div className="lp-event-card-upcoming">
              <img src={assets.event6} alt="event" className='lp-event-image'></img>
              <div className="lp-event-details">
                <h3>Melody Mania</h3>
                <p>Free ticket</p>
                <p className='lp-date'><CiCalendarDate /> Wednesday, June 24 | 07:00 PM</p>
                <p><GrLocation /> New York, NY</p>

              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CAROUSEL */}
      <section className='lp-c'>
        <div className='lp-upcoming-header'>
          <h1 className='lp-upcoming-head'>
            Highlights <span className='lp-span-categories' >this week</span>
          </h1>
          <button onClick={handleViewMoreClick} className="lp-view-more-button">View more</button>
        </div>
        <div className="carousel">
          <button className="carousel-button prev" onClick={prevSlide}>
            &#10094;
          </button>
          <div className="carousel-slide">
            <div className="carousel-background" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
              <div className='carousel-content'>
                <div className="">
                  <h1>EVENTORA</h1>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-button next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </section>
      {/* MORE EVENTS */}
      <section className="lp-new-events-section">
        <div className='lp-line-new'>
          <h2 className='lp-new-events' >More <span>  EVENTS</span></h2>
          <button onClick={handleViewMoreClick} className="lp-view-more-button">View more</button>
        </div>
        <div className="lp-events">
          <div className="lp-event-card">
            <img src={assets.event2} alt="event" className='lp-event-image'></img>
            <div className="lp-event-details">
              <div className='lp-firstrow'>
                <h3>Urban Marathon</h3><p className='lp-price'>From $20</p>
              </div>
              <p className='lp-date'><CiCalendarDate /> Monday, June 06 | 06:00 AM</p>
              <p><GrLocation /> New York, NY</p>
            </div>
          </div>
          <div className="lp-event-card">
            <img src={assets.event3} alt="event" className='lp-event-image'></img>
            <div className="lp-event-details">
              <h3>Melody Mania</h3>
              <p>Free ticket</p>
              <p className='lp-date'><CiCalendarDate /> Wednesday, June 24 | 07:00 PM</p>
              <p><GrLocation /> New York, NY</p>
            </div>
          </div>
          <div className="lp-event-card">
            <img src={assets.event4} alt="event" className='lp-event-image'></img>
            <div className="lp-event-details">
              <h3>Rockin' the Stage</h3>
              <p>From $120</p>
              <p className='lp-date'><CiCalendarDate /> Monday, March 14 | 04:00 PM</p>
              <p><GrLocation /> New York, NY</p>
            </div>
          </div>
        </div>
      </section>
      <section className="lp-footer" >
        <div className='lp-footer-top'>
          <div className='lp-footer-logo'>
            <h1>Eventora</h1>
          </div>
          <div className='lp-footer-cat'>
            <ul>
              <h1>Categories</h1>
              <li>All</li>
              <li>Music</li>
              <li>Sport</li>
              <li>Exhibition</li>
              <li>Business</li>
              <li>Photography</li>
            </ul>
          </div>
          <div className='lp-footer-res'>
            <ul>
              <h1>Resources</h1>
              <li>User guides</li>
              <li>Help Center</li>
              <li>Partners</li>
              <li>Taxes</li>
            </ul>
          </div>
          <div className="lp-footer-com">
            <ul>
              <h1>Company</h1>
              <li>About</li>
              <li>Join us</li>
            </ul>
          </div>
          <div className='lp-footer-sub'>
            <h1>Stay in Loop</h1>
            <p>For Announcement </p>
          </div>
        </div>
        <div className='lp-footer-bottom'>
          <p>&copy; Eventora Privacy Terms & Policy </p>
          <div className='lp-icons-social' >
            <FaInstagram />
            <FaWhatsapp />
            <FaXTwitter />
            <FaYoutube />
          </div>
        </div>
      </section>
      <Modal show={showLoginModal} onClose={handleCloseLoginModal}>
        <Login onClose={handleCloseLoginModal} onSignupClick={() => setShowSignupModal(true)} />
      </Modal>
      <Modal show={showSignupModal} onClose={handleCloseSignupModal}>
        <Signup onClose={handleCloseSignupModal} onSignupSuccess={handleSignupSuccess} />
      </Modal>
    </div>
  );
}

export default LandingPage;
