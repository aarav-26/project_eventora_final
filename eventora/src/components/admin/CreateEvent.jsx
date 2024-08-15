import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import "./CreateEvent.css";

const CreateEvent = () => {
    const { user } = useUser();
    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [mapLink, setMapLink] = useState('');
    const [description, setDescription] = useState('');
    const [eventImage, setEventImage] = useState(null);
    const [eventPoster, setEventPoster] = useState(null);
    const [activities, setActivities] = useState('');
    const [registrationDeadline, setRegistrationDeadline] = useState('');
    const [registrationFees, setRegistrationFees] = useState('');
    const [contactDetails, setContactDetails] = useState('');
    const [capacity, setCapacity] = useState('');
    const [schedule, setSchedule] = useState('');
    const [guest, setGuest] = useState('');
    const [specialRequirements, setSpecialRequirements] = useState('');
    const [socialMediaLinks, setSocialMediaLinks] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [organizers, setOrganizers] = useState('');
    const [sponsors, setSponsors] = useState('');
    const [ticketingInformation, setTicketingInformation] = useState('');
    const [accessibilityInformation, setAccessibilityInformation] = useState('');
    const [parkingInformation, setParkingInformation] = useState('');
    const [accommodationInformation, setAccommodationInformation] = useState('');
    const [healthAndSafetyGuidelines, setHealthAndSafetyGuidelines] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const categories = [
        'Cultural', 'Competitions', 'PoliticalEvent', 'Concert', 'Expo',
        'BusinessEvent', 'StartupEvent', 'TechnicalEvent', 'MedicalCamp',
        'BookFair', 'Conference', 'Seminars', 'CharityEvent', 'PublicCeremony',
        'Sports'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'eventName':
                setEventName(value);
                break;
            case 'startDate':
                setStartDate(value);
                break;
            case 'endDate':
                setEndDate(value);
                break;
            case 'location':
                setLocation(value);
                break;
            case 'mapLink':
                setMapLink(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'activities':
                setActivities(value);
                break;
            case 'registrationDeadline':
                setRegistrationDeadline(value);
                break;
            case 'registrationFees':
                setRegistrationFees(value);
                break;
            case 'contactDetails':
                setContactDetails(value);
                break;
            case 'capacity':
                setCapacity(value);
                break;
            case 'schedule':
                setSchedule(value);
                break;
            case 'guest':
                setGuest(value);
                break;
            case 'specialRequirements':
                setSpecialRequirements(value);
                break;
            case 'socialMediaLinks':
                setSocialMediaLinks(value);
                break;
            case 'eventCategory':
                setEventCategory(value);
                break;
            case 'organizers':
                setOrganizers(value);
                break;
            case 'sponsors':
                setSponsors(value);
                break;
            case 'ticketingInformation':
                setTicketingInformation(value);
                break;
            case 'accessibilityInformation':
                setAccessibilityInformation(value);
                break;
            case 'parkingInformation':
                setParkingInformation(value);
                break;
            case 'accommodationInformation':
                setAccommodationInformation(value);
                break;
            case 'healthAndSafetyGuidelines':
                setHealthAndSafetyGuidelines(value);
                break;
            default:
                break;
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setEventImage(file);
    };

    const handlePosterUpload = (e) => {
        const file = e.target.files[0];
        setEventPoster(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!eventName || !startDate || !endDate || !description || !eventPoster) {
            alert('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        const adminId = user.userId; // Replace with actual admin ID

        try {
            const newEvent = {
                eventName,
                startDate,
                endDate,
                location,
                mapLink,
                description,
                activities,
                registrationDeadline,
                registrationFees,
                contactDetails,
                capacity,
                schedule,
                guest,
                specialRequirements,
                socialMediaLinks,
                eventCategory,
                organizers,
                sponsors,
                ticketingInformation,
                accessibilityInformation,
                parkingInformation,
                accommodationInformation,
                healthAndSafetyGuidelines,
                eventImage: eventImage ? await convertImageToBase64(eventImage) : null,
                eventPoster: eventPoster ? await convertImageToBase64(eventPoster) : null,
            };

            const response = await fetch(`http://localhost:8084/events/add_event/${adminId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            const text = await response.text();
            if (response.ok) {
                setSuccessMessage('Event Created Successfully!');
                setEventName('');
                setStartDate('');
                setEndDate('');
                setLocation('');
                setMapLink('');
                setDescription('');
                setActivities('');
                setRegistrationDeadline('');
                setRegistrationFees('');
                setContactDetails('');
                setCapacity('');
                setSchedule('');
                setGuest('');
                setSpecialRequirements('');
                setSocialMediaLinks('');
                setEventCategory('');
                setOrganizers('');
                setSponsors('');
                setTicketingInformation('');
                setAccessibilityInformation('');
                setParkingInformation('');
                setAccommodationInformation('');
                setHealthAndSafetyGuidelines('');
                setEventImage(null);
                setEventPoster(null);
                setTimeout(() => {
                    navigate('/admin-dashboard/hosted-events');
                }, 2000);
            } else {
                console.error('Error response:', text);
                alert('Failed to create event: ' + text);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the event.');
        } finally {
            setLoading(false);
        }
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className='overall-create'>
            <div className="event-info-container">
                <h2>Hosting Events</h2>
                <p>Welcome to the event creation page. Before you proceed with filling out the form, please review the following guidelines and steps:</p>
                <h3>Event Hosting Guidelines:</h3>
                <ul>
                    <li>Ensure all event details are accurately provided.</li>
                    <li>Upload a clear and relevant event image and poster.</li>
                    <li>Double-check the date and time for any conflicts with other scheduled events.</li>
                    <li>Specify all categories and guest information correctly to ensure a smooth event planning process.</li>
                </ul>
                <h3>Steps to Create an Event:</h3>
                <ol>
                    <li><strong>Event Name:</strong> Enter the title of your event. This should be brief but descriptive enough to attract attendees.</li>
                    <li><strong>Event Start Date:</strong> Select the start date of the event. Make sure this is a date that works for all key participants and venues.</li>
                    <li><strong>Event End Date:</strong> Choose the end date for the event. This should be the final day of the event.</li>
                    <li><strong>Location:</strong> Provide the location where the event will take place. Include the venue name and address.</li>
                    <li><strong>Map Link:</strong> Enter the URL for an embedded map (e.g., Google Maps) to help attendees find the event location. You can use the iframe code provided by Google Maps.</li>
                    <li><strong>Event Description:</strong> Write a detailed description of the event. Include key activities, objectives, and any special instructions for attendees.</li>
                    <li><strong>Activities:</strong> List the activities planned for the event, separated by commas. This helps in outlining the event schedule and agenda.</li>
                    <p><b>Activity Format: </b>Each activity should be entered in the format <br/><b>" Title: Description,"</b> Separate multiple activities with commas.</p>
                    <p><b>Sample :: </b>" Keynote Speech: Opening remarks by the chief guest, Networking Session: Opportunity for attendees to connect,.. " </p>
                    <li><strong>Registration Deadline:</strong> Provide the last date when attendees can register for the event.</li>
                    <li><strong>Registration Fees:</strong> Specify any fees associated with registering for the event.</li>
                    <li><strong>Contact Details:</strong> Provide contact information for attendees to reach out with any questions or concerns.</li>
                    <li><strong>Capacity:</strong> Indicate the maximum number of attendees the event can accommodate.</li>
                    <li><strong>Event Schedule:</strong> Enter the schedule of the event, including start and end times for different activities</li>
                    <p>e.g., "9:00 AM - 10:00 AM: Keynote Speech, 10:00AM - 11:00AM : Refreshments for Participants ,..etc" </p>
                    <p>Comma Separates the points and  "-" separates the Time.</p>
                    <li><strong>Guest List:</strong> List the names of key guests or speakers attending the event, separated by commas.</li>
                    <li><strong>Special Requirements:</strong> Note any special requirements for the event, such as equipment needs or accessibility considerations.</li>
                    <li><strong>Social Media Links:</strong> Provide links to social media pages or events related to the event, separated by commas.</li>
                    <li><strong>Event Category:</strong> Choose the category that best describes the event (e.g., conference, seminar, workshop).</li>
                    <li><strong>Organizers:</strong> List the names of the event organizers.</li>
                    <li><strong>Sponsors:</strong> List any sponsors supporting the event.</li>
                    <li><strong>Ticketing Information:</strong> Provide details on how attendees can purchase tickets, including any relevant links or pricing information.</li>
                    <li><strong>Accessibility Information:</strong> Include information on how the event is accessible to attendees with disabilities.</li>
                    <li><strong>Parking Information:</strong> Provide details about parking arrangements and any relevant instructions for attendees.</li>
                    <li><strong>Accommodation Information:</strong> Offer information about nearby accommodations for attendees traveling from out of town.</li>
                    <li><strong>Health and Safety Guidelines:</strong> Outline any health and safety guidelines attendees need to follow during the event.</li>
                    <li><strong>Event Image:</strong> Upload a high-quality image that represents the event. This image will be used for promotional purposes and should be relevant to the event.</li>
                    <li><strong>Event Poster:</strong> Upload a high-quality image related to the event.</li>
                </ol>
                <p>If you have any questions or need assistance while filling out the form, please contact our support team for help.</p>
            </div>
            <div className="create-event-page">
                <h2>Create a New Event</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="create-event-form">
                    <label>
                        Event Name:
                        <input
                            type="text"
                            name="eventName"
                            value={eventName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Event Start Date and Time:
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={startDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Event End Date and Time:
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={endDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Event Location:
                        <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Event Map Link:
                        <input
                            type="url"
                            name="mapLink"
                            value={mapLink}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Event Category:
                        <input
                            type="text"
                            name="eventCategory"
                            list="categories"
                            value={eventCategory}
                            onChange={handleChange}
                            className="dropdown-input"
                        />
                        <datalist id="categories">
                            {categories.map((category) => (
                                <option key={category} value={category} />
                            ))}
                        </datalist>
                    </label>
                    <label>
                        Event Capacity:
                        <input
                            type="number"
                            name="capacity"
                            value={capacity}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Last Date for Registration:
                        <input
                            type="date"
                            name="registrationDeadline"
                            value={registrationDeadline}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Registration Fees:
                        <input
                            type="number"
                            name="registrationFees"
                            value={registrationFees}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="event-poster">Event Poster
                        <input
                            type="file"
                            id="event-poster"
                            onChange={handlePosterUpload}
                            accept="image/*"
                            required
                        />
                        {eventPoster && <img src={URL.createObjectURL(eventPoster)} alt="Preview of the event poster" className="event-preview-image" />}
                    </label>
                    <label htmlFor="event-image">Event Image
                        <input
                            type="file"
                            id="event-image"
                            onChange={handleImageUpload}
                            accept="image/*"
                            required
                        />
                        {eventImage && <img src={URL.createObjectURL(eventImage)} alt="Preview of the event image" className="event-preview-image" />}
                    </label>
                    <label>
                        Event Description:
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Event Activities:
                        <textarea
                            name="activities"
                            value={activities}
                            onChange={handleChange}
                        />
                    </label>


                    <label>
                        Contact Details:
                        <textarea
                            name="contactDetails"
                            value={contactDetails}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Event Schedule:
                        <textarea
                            name="schedule"
                            value={schedule}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Event guest:
                        <textarea
                            name="guest"
                            value={guest}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Special Requirements:
                        <textarea
                            name="specialRequirements"
                            value={specialRequirements}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Social Media Links:
                        <textarea
                            name="socialMediaLinks"
                            value={socialMediaLinks}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Organizers:
                        <textarea
                            name="organizers"
                            value={organizers}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Sponsors:
                        <textarea
                            name="sponsors"
                            value={sponsors}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Ticketing Information:
                        <textarea
                            name="ticketingInformation"
                            value={ticketingInformation}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Accessibility Information:
                        <textarea
                            name="accessibilityInformation"
                            value={accessibilityInformation}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Parking Information:
                        <textarea
                            name="parkingInformation"
                            value={parkingInformation}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Accommodation Information:
                        <textarea
                            name="accommodationInformation"
                            value={accommodationInformation}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Health and Safety Guidelines:
                        <textarea
                            name="healthAndSafetyGuidelines"
                            value={healthAndSafetyGuidelines}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
