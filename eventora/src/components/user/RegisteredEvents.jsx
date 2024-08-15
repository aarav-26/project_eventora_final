import React, { useEffect, useState } from 'react';

const RegisteredEvents = ({ userId }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch(`http://localhost:8084/users/registered/${userId}`);
        if (!response.ok) {
          throw new Error('Error fetching events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='registered-events'>
      <h2>Registered Events</h2>
      <div className='events-grid'>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className='event-card'>
              <img src={event.eventImage} alt={event.eventName} className='event-image' />
              <div className='event-info'>
                <h3>{event.eventName}</h3>
                <p>{event.description}</p>
                <p>{event.eventDate}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No registered events found.</p>
        )}
      </div>
    </div>
  );
};

export default RegisteredEvents;
