import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { CiCalendarDate } from "react-icons/ci";
import { TfiTimer } from "react-icons/tfi";
import { GrLocation } from "react-icons/gr";
import { IoTicketOutline } from "react-icons/io5";

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [similarEvents, setSimilarEvents] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                // Fetch the current event details
                const response = await fetch(`http://localhost:8084/events/get/${eventId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEvent(data);
            
                // Fetch similar events based on the category of the current event
                const similarResponse = await fetch(`http://localhost:8084/events/category?category=${data.eventCategory}`);
                if (!similarResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const similarData = await similarResponse.json();
            
                // Filter out the current event from the similar events
                const filteredSimilarEvents = similarData.filter(event => event.eventId !== Number(eventId));
                setSimilarEvents(filteredSimilarEvents.slice(0, 3));
            
            } catch (error) {
                console.error('Error fetching event details or similar events:', error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (!event) {
        return <div>Loading...</div>;
    }

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const durationMs = end - start;

        const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
        const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${durationHours}h ${durationMinutes}m`;
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    };

    return (
        <div className="ed-content">
            <section className="ed-image" style={{ backgroundImage: `url(${event.eventImage})` }} >
                <div className="ed-image-content">
                    <div className="ed-image-text">
                        <h3>{formatDateTime(event.startDate)}</h3   >
                        <h1>{event.eventName}</h1>
                        <h5>{event.description}</h5>
                    </div>
                </div>
            </section>
            <section className="ed-event-info">
                <div className="ed-event-info1">
                    <h1 style={{ textAlign: "left" }}>Timing and Location</h1>
                    <div className="ed-event-time">
                        <div style={{ display: "flex" }}>
                            <div className="ed-event-icon"><CiCalendarDate className="icon-time" /></div>
                            <div className="ed-timec">
                                <h4>DATE AND TIME</h4>
                                <p>{formatDateTime(event.startDate)}</p>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div className="ed-event-icon"><GrLocation className="icon-time" /></div>
                            <div className="ed-timec">
                                <h4>LOCATION</h4>
                                <p>{event.location}</p>
                            </div>
                        </div>
                    </div>

                    {event.mapLink && (
                        <div className="ed-map-info">
                            <div className="ed-map-container">
                                <iframe
                                    src={event.mapLink}
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex="0"
                                    title="Event Location Map"
                                />
                            </div>
                        </div>
                    )}

                    <div className="ed-event-info2">
                        <h1>About the Event</h1>
                        <div className="ed-event-time">
                            <div style={{ display: "flex" }}>
                                <div className="ed-event-icon"><TfiTimer className="icon-time" /></div>
                                <div className="ed-timec">
                                    <h4>DURATION</h4>
                                    <p>{calculateDuration(event.startDate, event.endDate)}</p>
                                </div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div className="ed-event-icon"><IoTicketOutline className="icon-time" /></div>
                                <div className="ed-timec">
                                    <h4>REGISTRATIONS</h4>
                                    <p>{event.registrationCount} Registered</p>
                                </div>
                            </div>
                        </div>
                        <p>{event.description}</p>

                        <button onClick={() => setShowMore(!showMore)}>
                            {showMore ? "Read Less" : "Read More"}
                        </button>

                        {showMore && (
                            <div className="ed-more-info">
                                <div className="ed-grid">
                                    <div>
                                        {event.sponsors && (
                                            <>
                                                <p className="ed-infop"><b>Sponsors:</b></p>
                                                {event.sponsors.split(',').map((sponsor, index) => (
                                                    <p className="ed-infops" key={index}><b>•</b> {sponsor.trim()}</p>
                                                ))}
                                            </>
                                        )}
                                    </div>

                                    <div>
                                        {event.guest && (
                                            <>
                                                <p className="ed-infop"><b>Guests:</b></p>
                                                {event.guest.split(',').map((guest, index) => (
                                                    <p className="ed-infops" key={index}><b> • </b> {guest.trim()}</p>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="ed-row">
                                    <div className="ed-column">
                                        {event.activities && <p className="ed-infop"><b>Event Activities:</b></p>}
                                        <table className='ed-table'>
                                            <tbody>
                                                {event.activities.split('/').map((activity, index) => {
                                                    const [title, description] = activity.split(':');
                                                    return (
                                                        <tr className="ed-bullet" key={index}>
                                                            <td><b>•{"  " + (title.trim() || "Keynote Speech")}</b></td>
                                                            <td>: {description ? description.trim() : 'Introduction to the event'}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="ed-column">
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
                                                    const lastColonIndex = item.lastIndexOf(':');
                                                    const timeAndDetails = item.substring(0, lastColonIndex).trim();
                                                    const details = item.substring(lastColonIndex + 1).trim();
                                                    const [startTime, endTime] = timeAndDetails.split('-').map(time => time.trim());
                                                    return (
                                                        <tr className="ed-bullet" key={index}>
                                                            <td><b>{startTime || "10:00 AM"}</b></td>
                                                            <td><b>{endTime || "11:00 AM"}</b></td>
                                                            <td>{details || "Opening Ceremony"}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="ed-grid">
                                    <div>
                                        {event.accessibilityInformation && <p className="ed-infop"><b>Accessibility Information:</b> {event.accessibilityInformation}</p>}
                                    </div>
                                    <div>
                                        {event.accommodationInformation && <p className="ed-infop"><b>Accommodation Information:</b> {event.accommodationInformation}</p>}
                                    </div>
                                    <div>
                                        {event.registrationFees && <p className="ed-infop"><b>Registration Fees:</b> {event.registrationFees}</p>}
                                    </div>

                                    <div>
                                        {event.eventCategory && <p className="ed-infop"><b>Category:</b> {event.eventCategory}</p>}
                                    </div>

                                    <div>
                                        {event.ticketingInformation && <p className="ed-infop"><b>Ticketing Information:</b> {event.ticketingInformation}</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Similar Events Section */}
            <section className='lp-upcoming'>
                <div className='lp-upcoming-content'>
                    <div className='lp-upcoming-header'>
                        <h1 className='lp-upcoming-head'>
                            <span>Similar</span> Events
                        </h1>
                    </div>
                    <div className="lp-events-upcoming">
                        {similarEvents.length > 0 ? (
                            similarEvents.map((e) => (
                                <div className="lp-event-card-upcoming" key={e.id}>
                                    <img src={e.eventImage} alt={e.eventName} className='lp-event-image' />
                                    <div className="lp-event-details">
                                        <h3>{e.eventName}</h3>
                                        <p>{e.description}</p>
                                        <a href={`/user-dashboard/explore/details/${e.eventId}`}>View Details</a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No similar events found.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventDetails;
