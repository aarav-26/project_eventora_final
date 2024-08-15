// AllEvents.jsx
import React from 'react';
import './AllEvents.css';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';


const AllEvents = ({ events}) => {

  const {user} = useUser();

  return (
    <div className="all-events-container">
      <h2>All Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.eventId} className="event-card">
            <img src={event.eventImage} alt={event.title} className="event-image" />
            <div className="event-details">
              <h3>{event.eventName}</h3>
              <p>{event.startDate}</p>
              <p>{event.description}</p>
              {user.userId && <Link to={`/user-dashboard/register/${event.eventId}`} className="more-info">More Info</Link>}
            </div>
          </div>
        ))}
      </div>    
    </div>
  );
};

export default AllEvents;
