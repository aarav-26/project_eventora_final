import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">YourEvent</div>
        <div className="auth-buttons">
          <button className="login-button">Log in</button>
          <button className="signup-button">Sign up</button>
        </div>
      </header>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Pick up your </h1>
          <h1><span>wonderful</span></h1>
          <h1>plans</h1>
          <div className="search-bar">
            <input type="text" placeholder="Find the event you're interested in" />
            <input type="text" placeholder="New York, NY" />
            <button>Search</button>
          </div>
        </div>
      </section>
      <section className="events-section">
        <h2>New events in <span>NYC</span></h2>
        <div className="events">
          <div className="event-card">
            <div className="event-image brown-placeholder"></div>
            <div className="event-details">
              <h3>Urban Marathon</h3>
              <p>Monday, June 06 | 06:00 AM</p>
              <p>New York, NY</p>
              <p>From $20</p>
            </div>
          </div>
          <div className="event-card">
            <div className="event-image brown-placeholder"></div>
            <div className="event-details">
              <h3>Melody Mania</h3>
              <p>Wednesday, June 24 | 07:00 PM</p>
              <p>New York, NY</p>
              <p>Free ticket</p>
            </div>
          </div>
          <div className="event-card">
            <div className="event-image brown-placeholder"></div>
            <div className="event-details">
              <h3>Rockin' the Stage</h3>
              <p>Monday, March 14 | 04:00 PM</p>
              <p>New York, NY</p>
              <p>From $120</p>
            </div>
          </div>
        </div>
        <button className="view-more-button">View more</button>
      </section>
    </div>
  );
}

export default LandingPage;
