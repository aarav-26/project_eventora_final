// src/components/user/PopularEvents.jsx
import React from 'react';

const PopularEvents = ({ events }) => {
  const popularEvents = events.filter(event => event.isPopular);

  return (
    <div>
      <h2>Popular Events</h2>
      <div className="events-grid">
        {popularEvents.map((event, index) => (
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

export default PopularEvents;
