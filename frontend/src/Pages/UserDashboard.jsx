import React from 'react';
import { assets } from '../assets/assets';
import { RiArrowDownWideFill } from 'react-icons/ri';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Explore from '../components/user/Explore';
import Filter from '../components/user/Filter';
import { FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import MapComponent from '../components/user/MapComponent';
import EventDetails from '../components/user/EventDetails';
import UserHome from '../components/user/UserHome';
const UserDashboard = () => {

    const navigate = useNavigate();

    const handleExplore = () => {
        navigate("/user-dashboard/explore");
    }

    

    return (
        <div className='userExplore' >
            <header className="ud-header">
                <div className="lp-logo">Eventora</div>
                <div className="ud-navbar">
                    <ul className="ud-navlist">
                        <li onClick={handleExplore} className="ud-li">Explore</li>
                        <li className="ud-li">Upcoming</li>
                        <li className="ud-li">My Events</li>
                    </ul>
                </div>
                <div className='ud-profile'>
                    <img className="ud-profile-img" src={assets.event7} alt="profile"></img>
                    <h3 className='ud-profile-h3'>Aravind < RiArrowDownWideFill /> </h3>
                </div>
            </header>
            <div className="ud-content">
                <Routes>
                    <Route path='filter' element={<Filter />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="mapkaro" element={<MapComponent/>}/>
                    <Route path="explore/details/:eventId" element={<EventDetails/>}/>
                    <Route path="" element={<UserHome/>}/>
                </Routes>
            </div>
            <footer>
                <section className="lp-footer" >
                    <div className='lp-footer-top'>
                        <div className='lp-footer-logo'>
                            <h1>Eventora</h1>
                        </div>
                        <div className='lp-footer-cat'>
                            <ul>
                                <h1>Categories</h1>
                                <li>All</li>
                                <li>Music</li>
                                <li>Sport</li>
                                <li>Exhibition</li>
                                <li>Business</li>
                                <li>Photography</li>
                            </ul>
                        </div>
                        <div className='lp-footer-res'>
                            <ul>
                                <h1>Resources</h1>
                                <li>User guides</li>
                                <li>Help Center</li>
                                <li>Partners</li>
                                <li>Taxes</li>
                            </ul>
                        </div>
                        <div className="lp-footer-com">
                            <ul>
                                <h1>Company</h1>
                                <li>About</li>
                                <li>Join us</li>
                            </ul>
                        </div>
                        <div className='lp-footer-sub'>
                            <h1>Stay in Loop</h1>
                            <p>For Announcement </p>
                        </div>
                    </div>
                    <div className='lp-footer-bottom'>
                        <p>&copy; Eventora Privacy Terms & Policy </p>
                        <div className='lp-icons-social' >
                            <FaInstagram />
                            <FaWhatsapp />
                            <FaXTwitter />
                            <FaYoutube />
                        </div>
                    </div>
                </section>
            </footer>
        </div>
    );
}

export default UserDashboard;