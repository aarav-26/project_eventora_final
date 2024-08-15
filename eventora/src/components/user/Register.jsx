import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Register.css';
import { useUser } from '../../context/UserContext';

const Register = () => {
  const { eventId } = useParams(); // Get eventId from URL params
  const { user } = useUser();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkIfRegistered = useCallback(async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8084/users/registered/${user.userId}`);
      if (response.ok) {
        const registeredEvents = await response.json();
        console.log('Registered Events:', registeredEvents);
        const isEventRegistered = registeredEvents.some(regEvent => regEvent.eventId === parseInt(eventId));
        setIsRegistered(isEventRegistered);
      } else {
        console.error('Failed to fetch registered events');
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);
    } finally {
      setIsChecking(false);
    }
  }, [user, eventId, navigate]);

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`http://localhost:8084/events/get/${eventId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Event Data:', data);
            setEvent(data);
            checkIfRegistered();
          } else {
            throw new Error('Failed to fetch event details');
          }
        } catch (error) {
          setError(error.message);
          console.error('Error fetching event details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    } else {
      setError('No event ID provided.');
      setLoading(false);
    }
  }, [eventId, checkIfRegistered]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsChecking(true);

    try {
      const response = await fetch(`http://localhost:8084/users/register/${user.userId}/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Registered Successfully');
        setIsRegistered(true);
      } else {
        throw new Error('Failed to register for the event');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    } finally {
      setIsChecking(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="register-details-container">
      {event ? (
        <>
          <div className='register-eventhead'>
            <h1>{event.eventName}</h1>
          </div>
          <div className='register-images'>
            {event.eventImage && <img className="register-image" src={event.eventImage} alt={event.eventName} />}
            {event.eventPoster && (
              <img className="register-image" src={event.eventPoster} alt={event.eventName} />
            )}
          </div>
          <div className="register-container">
            <h2 className='register-h2'>Event Name: {event.eventName}</h2>
            <h3 className='register-regc'>Registration Count: {event.registrationCount || 0}</h3>
          </div>
          <p className='register-desc'><b>Event Description:</b> {event.description}</p>
          {event.location && <p className="register-infop"><b>Location:</b> {event.location}</p>}
          {event.eventCategory && <p className="register-infop"><b>Category:</b> {event.eventCategory}</p>}
          {event.guest && (
            <>
              <p className="register-infop"><b>Guests:</b></p>
              {event.guest.split('/').map((guest, index) => (
                <p className="register-infops" key={index}><b> • </b> {guest.trim()}</p>
              ))}
            </>
          )}
          {event.startDate && <p className="register-infop"><b>Date:</b> {new Date(event.startDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })} - {new Date(event.endDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}</p>}
          {event.startDate && <p className="register-infop"><b>Time:</b> {new Date(event.startDate).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })}</p>}
          {event.activities && <p className="register-infop"><b>Event Activities:</b></p>}

          <table className='register-table'>
            <tbody>
              {event.activities.split('/').map((activity, index) => {
                const [title, description] = activity.split(':');
                return (
                  <tr className="register-bullet" key={index}>
                    <td><b>•{"  " + title.trim()}</b></td>
                    <td>: {description ? description.trim() : ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {event.schedule && <p className="register-infop"><b>Event Schedule:</b></p>}

          <table className='register-tschedule'>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {event.schedule.split('/').map((item, index) => {
                const lastColonIndex = item.lastIndexOf(':');
                const timeAndDetails = item.substring(0, lastColonIndex).trim();
                const details = item.substring(lastColonIndex + 1).trim();

                const [startTime, endTime] = timeAndDetails.split('-').map(time => time.trim());

                return (
                  <tr className="register-bullet" key={index}>
                    <td>{startTime}</td>
                    <td>{endTime}</td>
                    <td>{details}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {event.accessibilityInformation && <p className="ed-infop"><b>Accessibility Information :</b> {event.accessibilityInformation}</p>}
            {event.accommodationInformation && <p className="ed-infop"><b>Accommodation Information :</b> {event.accommodationInformation}</p>}
            {event.registrationFees && <p className="ed-infop"><b>Registration Fees :</b> {event.registrationFees}</p>}
            {event.socialMediaLinks && (
                <>
                    <p className="ed-infop"><b>Guests:</b></p>
                    {event.socialMediaLinks.split(',').map((socialMediaLink, index) => (
                        <p className="ed-infops" key={index}><b> • </b> {socialMediaLink.trim()}</p>
                    ))}
                </>
            )}
            {event.sponsors && (
                <>
                    <p className="ed-infop"><b>Sponsors:</b></p>
                    {event.sponsors.split('/').map((sponsor, index) => (
                        <p className="ed-infops" key={index}><b>•</b> {sponsor.trim()}</p>
                    ))}
                </>
            )}
            {event.ticketingInformation && <p className="ed-infop"><b>Ticketing Information :</b> {event.ticketingInformation}</p>}
            {event.mapLink && (
                <div className="ed-map-info">
                    <p className="ed-infop"><b>Event Location:</b></p>
                    <div className="ed-map-container">
                        {event.mapLink && (
                            <iframe
                                src={event.mapLink}
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                title="Event Location Map" // Added title attribute
                            />
                        )}
                    </div>
                </div>
            )}
            {event.contactDetails && <p className="ed-infop"><b>Contact :</b> {event.contactDetails}</p>}

          <div className='register-btn-container'>
            <button 
              className='register-btn'
              onClick={handleRegister}
              disabled={isRegistered || isChecking}
            >
              {isChecking ? 'Checking...' : isRegistered ? 'Registered' : 'Register'}
            </button>
          </div>
        </>
      ) : (
        <p>No event data available</p>
      )}
    </div>
  );
};

export default Register;
