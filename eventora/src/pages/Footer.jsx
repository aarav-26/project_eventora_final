import React from 'react';
import './Footer.css';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
  <div className="footer-content">
    <div className="footer-left">
      <div className="footer-about">
        <h2>Eventora</h2>
        <p>Managing your events with ease</p>
        <p>Eventora provides comprehensive solutions for organizing, managing, and promoting events.</p>
        <p>Connect with us to make your next event a success.</p>
      </div>
    </div>
    <div className="footer-right">
      <div className="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#about">About Us</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </div>
      <div className="footer-services">
        <h3>Our Services</h3>
        <ul>
          <li><a href="#event-planning">Event Planning</a></li>
          <li><a href="#venue-booking">Venue Booking</a></li>
          <li><a href="#ticketing">Ticketing</a></li>
          <li><a href="#promotion">Event Promotion</a></li>
          <li><a href="#virtual-events">Virtual Events</a></li>
        </ul>
      </div>
      <div className="footer-resources">
        <h3>Resources</h3>
        <ul>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#help">Help Center</a></li>
          <li><a href="#terms">Terms of Service</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="footer-contact">
        <h3>Contact Us</h3>
        <p>Email: contact@eventora.com</p>
        <p>Phone: +1 (123) 456-7890</p>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <div className="footer-social">
    <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/Eventora" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.twitter.com/Eventora" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://www.linkedin.com/company/eventora" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://www.instagram.com/Eventora" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
    </div>
    <p>&copy; 2024 Eventora. All rights reserved.</p>
  </div>
</footer>

  );
};

export default Footer;
