import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { assets } from "../../assets/assets";
import { GrLocation } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Explore = () => {
    const [filters, setFilters] = useState({
        category: [],
        pricing: [],
        type: [],
        language: [],
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [showMoreCategories, setShowMoreCategories] = useState(false);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const navigate = useNavigate();

    const categories = [
        'all', 'Cultural', 'Competitions', 'PoliticalEvent', 'Concert', 'Expo', 
        'BusinessEvent', 'StartupEvent', 'TechnicalEvent', 'MedicalCamp', 'BookFair', 
        'Conference', 'Seminars', 'CharityEvent', 'PublicCeremony', 'Sports'
    ];

    useEffect(() => {
        // Fetch events from backend on component mount
        fetch('http://localhost:8084/events/getall')
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                setFilteredEvents(data); // Initialize filtered events with fetched data
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const applyFilters = () => {
        const filtered = events.filter(event => {
            const matchesSearchQuery = event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) &&
                event.location.toLowerCase().includes(locationQuery.toLowerCase());
            const matchesCategory = filters.category.length === 0 || filters.category.includes(event.eventCategory) || filters.category.includes('all');
            const matchesPricing = filters.pricing.length === 0 || (filters.pricing.includes('free') && event.registrationFees === 0) || (filters.pricing.includes('paid') && event.registrationFees > 0);
            const matchesType = filters.type.length === 0 || filters.type.includes(event.type);
            const matchesLanguage = filters.language.length === 0 || filters.language.includes(event.language);

            return matchesSearchQuery && matchesCategory && matchesPricing && matchesType && matchesLanguage;
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
        navigate(`/user-dashboard/explore/details/${eventId}`);
    };

    const visibleCategories = showMoreCategories ? categories : categories.slice(0, 6);

    return (
        <>
            <div className="ep-content">
                <h1 className="ep-search" >Search Event</h1>
                <div className="ep-search-bar">
                    <div className="ep-search-contain">
                        <div className="ep-search-icon">
                            <BiSearch />
                        </div>
                        <input
                            className="ep-input"
                            type="text"
                            placeholder="Find the event you're interested in"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <input
                            className="ep-input"
                            type="text"
                            placeholder="New York, NY"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                        />
                        <button className="ep-search-btn" onClick={applyFilters}>Search</button>
                    </div>
                </div>
            </div>
            {/* Filter of Events */}
            <section className="ep-filter">
            <div className="ep-filter-section">
                <h4>Filter</h4>
                <div className="ep-filter-group">
                <h5>Category</h5>
                    {visibleCategories.map((cat) => (
                        <label key={cat}>
                            <input type="checkbox" value={cat} onChange={() => handleFilterChange('category', cat)} /> {cat}
                        </label>
                    ))}
                    {categories.length > 6 && (
                        <button onClick={() => setShowMoreCategories(!showMoreCategories)}>
                            {showMoreCategories ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                </div>
                <div className="ep-filter-group">
                    <h5>Pricing</h5>
                    <label><input type="checkbox" value="free" onChange={() => handleFilterChange('pricing', 'free')} /> Free</label>
                    <label><input type="checkbox" value="paid" onChange={() => handleFilterChange('pricing', 'paid')} /> Paid</label>
                </div>
                <div className="ep-filter-group">
                    <h5>Type</h5>
                    <label><input type="checkbox" value="online" onChange={() => handleFilterChange('type', 'online')} /> Online</label>
                    <label><input type="checkbox" value="offline-indoor" onChange={() => handleFilterChange('type', 'offline-indoor')} /> Offline - Indoor</label>
                    <label><input type="checkbox" value="offline-outdoor" onChange={() => handleFilterChange('type', 'offline-outdoor')} /> Offline - Outdoor</label>
                </div>
                <div className="ep-filter-group">
                    <h5>Language</h5>
                    <label><input type="checkbox" value="english" onChange={() => handleFilterChange('language', 'english')} /> English</label>
                    <label><input type="checkbox" value="german" onChange={() => handleFilterChange('language', 'german')} /> German</label>
                    <label><input type="checkbox" value="french" onChange={() => handleFilterChange('language', 'french')} /> French</label>
                </div>
                <button className="ep-apply-btn" onClick={applyFilters}>Apply</button>
            </div>

            <div className="ep-results">
                <h4 className="ep-results-section-header">{filteredEvents.length} results</h4>
                <div className="ep-results-section">
                    {filteredEvents.map((event) => (
                        <div key={event.eventId} className="ep-event-card" onClick={() => handleCardClick(event.eventId)}>
                            <img src={event.eventImage} alt={event.eventName} />
                            <div className="ep-event-info">
                                <h5>{event.eventName}</h5>
                                <p><strong>From {event.registrationFees ? event.registrationFees : 'Free'}</strong></p>
                                <p>{event.startDate} - {event.endDate}</p>
                                <p>{event.location}</p>
                                <span className={`ep-tag ${event.registrationFees > 0 ? 'paid' : 'free'}`}>
                                    {event.registrationFees > 0 ? 'Paid' : 'Free'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        {/* Recommended for You  */}
            <section className="lp-new-events-section">
                <div className='lp-line-new'>
                    <h2 className='lp-new-events' ><span>Recommended</span> for YOU</h2>
                    <button className="lp-view-more-button">View more</button>
                </div>
                <div className="lp-events">
                    <div className="lp-event-card">
                        <img src={assets.event2} alt="event" className='lp-event-image'></img>
                        <div className="lp-event-details">
                            <div className='lp-firstrow'>
                                <h3>Urban Marathon</h3><p className='lp-price'>From $20</p>
                            </div>
                            <p className='lp-date'><CiCalendarDate /> Monday, June 06 | 06:00 AM</p>
                            <p><GrLocation /> New York, NY</p>
                        </div>
                    </div>
                    <div className="lp-event-card">
                        <img src={assets.event3} alt="event" className='lp-event-image'></img>
                        <div className="lp-event-details">
                            <h3>Melody Mania</h3>
                            <p>Free ticket</p>
                            <p className='lp-date'><CiCalendarDate /> Wednesday, June 24 | 07:00 PM</p>
                            <p><GrLocation /> New York, NY</p>
                        </div>
                    </div>
                    <div className="lp-event-card">
                        <img src={assets.event4} alt="event" className='lp-event-image'></img>
                        <div className="lp-event-details">
                            <h3>Rockin' the Stage</h3>
                            <p>From $120</p>
                            <p className='lp-date'><CiCalendarDate /> Monday, March 14 | 04:00 PM</p>
                            <p><GrLocation /> New York, NY</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Explore;
