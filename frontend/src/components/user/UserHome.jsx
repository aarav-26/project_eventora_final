import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { CiCalendarDate } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { HiMusicNote } from "react-icons/hi";
import { FaVolleyballBall } from "react-icons/fa";
import { GiVideoConference } from "react-icons/gi";
import { GrCompliance } from "react-icons/gr";
import { FaSquarePollVertical } from "react-icons/fa6";
import { BiCalendarHeart } from "react-icons/bi";

const UserHome = () => {

    const images = [
        assets.event3,
        assets.event11,
        assets.event3,
        assets.event6
      ];
    
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      useEffect(() => {
        const slideInterval = setInterval(() => {
          nextSlide();
        }, 1500);
    
        // Cleanup interval on component unmount
        return () => clearInterval(slideInterval);
      }, [currentIndex, 1500]);
    
      const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      };

    return (
        <div>
            {/* NEW EVENTS BY PLACE */}
            <section className="lp-new-events-section">
                <div className='lp-line-new'>
                    <h2 className='lp-new-events' >New events in <span>NYC</span></h2>
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
            {/* CATEGORIES */}
            <section className='lp-categories'>
                <div className='lp-cat'>
                    <h1 className='lp-explore-categories'>
                        Explore by <span className='lp-span-categories'>categories</span>
                    </h1>
                    <div className='lp-categories-icons'>
                        <ul className='lp-ul-categories'>
                            <li className='lp-li-categories'><HiMusicNote /><span className='lp-ul-text'>Concert</span></li>
                            <li className='lp-li-categories'><FaVolleyballBall /><span className='lp-ul-text'>Sports</span></li>
                            <li className='lp-li-categories'><BiCalendarHeart /><span className='lp-ul-text'>Technical Events</span></li>
                            <li className='lp-li-categories'><GiVideoConference /><span className='lp-ul-text'>Conferences</span></li>
                            <li className='lp-li-categories'><GrCompliance /><span className='lp-ul-text'>Competitions</span></li>
                            <li className='lp-li-categories'><FaSquarePollVertical /><span className='lp-ul-text'>Political Events</span></li>

                        </ul>
                    </div>
                </div>
            </section>
            {/* UPCOMING EVENTS */}
            <section className='lp-upcoming'>
                <div className='lp-upcoming-content'>
                    <div className='lp-upcoming-header'>
                        <h1 className='lp-upcoming-head'>
                            Upcoming in <span className='lp-span-categories' >24h</span>
                        </h1>
                        <button className="lp-view-more-button">View more</button>
                    </div>
                    <div className="lp-events-upcoming">
                        <div className="lp-event-card-upcoming">
                            <img src={assets.event5} alt="event" className='lp-event-image'></img>
                            <div className="lp-event-details">
                                <h3>Urban Marathon</h3>
                                <p>From $20</p>
                                <p className='lp-date'><CiCalendarDate /> Monday, June 06 | 06:00 AM</p>
                                <p><GrLocation /> New York, NY</p>

                            </div>
                        </div>
                        <div className="lp-event-card-upcoming">
                            <img src={assets.event6} alt="event" className='lp-event-image'></img>
                            <div className="lp-event-details">
                                <h3>Melody Mania</h3>
                                <p>Free ticket</p>
                                <p className='lp-date'><CiCalendarDate /> Wednesday, June 24 | 07:00 PM</p>
                                <p><GrLocation /> New York, NY</p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* CAROUSEL */}
            <section className='lp-c'>
                <div className='lp-upcoming-header'>
                    <h1 className='lp-upcoming-head'>
                        Highlights <span className='lp-span-categories' >this week</span>
                    </h1>
                    <button className="lp-view-more-button">View more</button>
                </div>
                <div className="carousel">
                    <button className="carousel-button prev" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <div className="carousel-slide">
                        <div className="carousel-background" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
                            <div className='carousel-content'>
                                <div className="">
                                    <h1>EVENTORA</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-button next" onClick={nextSlide}>
                        &#10095;
                    </button>
                </div>
            </section>
            {/* MORE EVENTS */}
            <section className="lp-new-events-section">
                <div className='lp-line-new'>
                    <h2 className='lp-new-events' >More <span>  EVENTS</span></h2>
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
        </div>
    );
}
export default UserHome;