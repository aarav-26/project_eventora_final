import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./EventDetails.css";

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleButtonClick = () => {
        navigate(`/admin-dashboard/hosted-events/event-details/participants/${eventId}`);
    };

    useEffect(() => {
        fetch(`http://localhost:8084/events/get/${eventId}`)
            .then(response => response.json())
            .then(data => {
                setEvent(data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching event details.');
                console.error('Error fetching event details:', error);
                setLoading(false);
            });
    }, [eventId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="event-details-container">
            <div className='ed-eventhead'>
                <h1>{event.eventName}</h1>
            </div>
            <div className='ed-images'>
                <img className="ed-image" src={event.eventImage} alt={event.eventName} />
                {event.eventPoster && (
                    <img className="ed-image" src={event.eventPoster} alt={event.eventName} />
                )}
            </div>
            <div className="ed-container">
                <h2 className='ed-h2'>Event Name: {event.eventName}</h2>
                <h3 className='ed-regc'>Registration Count: {event.registrationCount || 0}</h3>
            </div>
            <p className='ed-desc'><b>Event Description : </b>{event.description}</p>
            {event.location && <p className="ed-infop"><b>Location:</b> {event.location}</p>}
            {event.eventCategory && <p className="ed-infop"><b>Category:</b> {event.eventCategory}</p>}
            {event.guest && (
                <>
                    <p className="ed-infop"><b>Guests:</b></p>
                    {event.guest.split(',').map((guest, index) => (
                        <p className="ed-infops" key={index}><b> • </b> {guest.trim()}</p>
                    ))}
                </>
            )}
            {event.startDate && <p className="ed-infop"><b>Date:</b> {formatDate(event.startDate)} - {formatDate(event.endDate)}</p>}
            {event.startDate && <p className="ed-infop"><b>Time:</b> {formatTime(event.startDate)}</p>}
            {event.activities && <p className="ed-infop"><b>Event Activities:</b></p>}

            <table className='ed-table'>
                <tbody>
                    {event.activities.split('/').map((activity, index) => {
                        const [title, description] = activity.split(':');
                        return (
                            <tr className="ed-bullet" key={index}>
                                <td><b>•{"  " + title.trim()}</b></td>
                                <td>:   {description ? description.trim() : ''}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {event.schedule && <p className="ed-infop"><b>Event Schedule:</b></p>}

            <table className='ed-tschedule'>
                <thead>
                    <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {event.schedule.split('/').map((item, index) => {
                        // Find the last colon in the string for splitting
                        const lastColonIndex = item.lastIndexOf(':');
                        const timeAndDetails = item.substring(0, lastColonIndex).trim();
                        const details = item.substring(lastColonIndex + 1).trim();

                        // Split the time range into start and end times
                        const [startTime, endTime] = timeAndDetails.split('-').map(time => time.trim());

                        return (
                            <tr className="ed-bullet" key={index}>
                                <td><b>{startTime}</b></td>
                                <td><b>{endTime}</b></td>
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
                    {event.sponsors.split(',').map((sponsor, index) => (
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

            <button onClick={handleButtonClick} >Get Registered Participants</button>
        </div>
    );
};

export default EventDetails;
