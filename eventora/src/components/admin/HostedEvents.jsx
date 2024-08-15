import React, { useState, useEffect } from 'react';
import './HostedEvents.css';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const HostedEvents = ({ adminId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8084/admins/get/list/${user.userId}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setError('Failed to fetch events.');
          console.error('Failed to fetch events:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching events.');
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, [adminId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="hosted-events-container">
      <h1>Hosted Events</h1>
      <div className="event-cards-container">
        {events.map((event) => (
          <div key={event.eventId} className="event-card">
            <img
              src={event.eventImage}
              alt={event.eventName}
              className="event-image"
            />
            <div className="event-details">
              <h2 className="event-name">{event.eventName}</h2>
              <p>{formatDate(new Date(event.startDate))} at {formatTime(new Date(event.startDate))}</p>
              <p className="event-location">Location: {event.location}</p>
              <p className="event-category">Category: {event.eventCategory}</p>
              <Link to={`event-details/${event.eventId}`} className="more-info">More Info</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostedEvents;
