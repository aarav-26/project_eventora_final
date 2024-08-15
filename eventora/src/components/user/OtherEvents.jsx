// src/components/user/OtherEvents.jsx
import React from 'react';

const OtherEvents = ({ events }) => {
  const otherEvents = events.filter(event => !event.isPopular);

  return (
    <div>
      <h2>Other Events</h2>
      <div className="events-grid">
        {otherEvents.map((event, index) => (
          <div key={index} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherEvents;
