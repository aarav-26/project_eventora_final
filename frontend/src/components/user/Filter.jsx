import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Filter.css';

const Filter = () => {
    const [filters, setFilters] = useState({
        category: [],
        pricing: [],
        type: [],
        language: [], // Assuming you might have language in the future
    });

    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch events from the backend
        fetch('http://localhost:8084/events/getall')  // Replace with your actual API endpoint
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
                setFilteredEvents(data); // Initialize with all events
            })
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    const applyFilters = () => {
        const filtered = events.filter(event => {
            return (
                (filters.category.length === 0 || filters.category.includes(event.eventCategory) || filters.category.includes('all')) &&
                (filters.pricing.length === 0 || (filters.pricing.includes('free') && event.registrationFees === 0) || (filters.pricing.includes('paid') && event.registrationFees > 0)) &&
                (filters.type.length === 0 || filters.type.includes(event.eventType)) &&
                (filters.language.length === 0 || filters.language.includes(event.eventLanguage)) // Adjust based on your fields
            );
        });

        setFilteredEvents(filtered);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType].includes(value)
                ? prevFilters[filterType].filter((v) => v !== value)
                : [...prevFilters[filterType], value],
        }));
    };

    const handleCardClick = (eventId) => {
        navigate(`/user-dashboard/explore/${eventId}`); // Navigate to the event details page
    };

    return (
        <div>
            <div className="filter-section">
                <h4>Filter</h4>
                <div className="filter-group">
                    <h5>Category</h5>
                    <label><input type="checkbox" value="all" onChange={() => handleFilterChange('category', 'all')} /> All</label>
                    <label><input type="checkbox" value="trending" onChange={() => handleFilterChange('category', 'trending')} /> Trending</label>
                    <label><input type="checkbox" value="upcoming" onChange={() => handleFilterChange('category', 'upcoming')} /> Upcoming</label>
                    <label><input type="checkbox" value="music" onChange={() => handleFilterChange('category', 'music')} /> Music</label>
                </div>
                <div className="filter-group">
                    <h5>Pricing</h5>
                    <label><input type="checkbox" value="free" onChange={() => handleFilterChange('pricing', 'free')} /> Free</label>
                    <label><input type="checkbox" value="paid" onChange={() => handleFilterChange('pricing', 'paid')} /> Paid</label>
                </div>
                <div className="filter-group">
                    <h5>Type</h5>
                    <label><input type="checkbox" value="online" onChange={() => handleFilterChange('type', 'online')} /> Online</label>
                    <label><input type="checkbox" value="offline-indoor" onChange={() => handleFilterChange('type', 'offline-indoor')} /> Offline - Indoor</label>
                    <label><input type="checkbox" value="offline-outdoor" onChange={() => handleFilterChange('type', 'offline-outdoor')} /> Offline - Outdoor</label>
                </div>
                <div className="filter-group">
                    <h5>Language</h5>
                    <label><input type="checkbox" value="english" onChange={() => handleFilterChange('language', 'english')} /> English</label>
                    <label><input type="checkbox" value="german" onChange={() => handleFilterChange('language', 'german')} /> German</label>
                    <label><input type="checkbox" value="french" onChange={() => handleFilterChange('language', 'french')} /> French</label>
                </div>
                <button className="apply-btn" onClick={applyFilters}>Apply</button>
            </div>

            <div className="results-section">
                <h4>{filteredEvents.length} results</h4>
                {filteredEvents.map((event) => (
                    <div key={event.eventId} className="event-card" onClick={() => handleCardClick(event.eventId)}>
                        <img src={`data:image/jpeg;base64,${event.eventImage}`} alt={event.eventName} />
                        <div className="event-info">
                            <h5>{event.eventName}</h5>
                            <p><strong>From ${event.registrationFees || 'Free'}</strong></p>
                            <p>{event.startDate} | {event.endDate}</p>
                            <p>{event.location}</p>
                            <span className={`tag ${event.tag && event.tag.includes('OFF') ? 'discount' : ''}`}>{event.tag || 'No Tag'}</span>
                        </div>
                    </div>
                ))}
                <button className="view-more-btn">View more</button>
            </div>
        </div>
    );
}

export default Filter;
