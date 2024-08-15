import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="container">
        <h1>About Us</h1>
        <p>
          Welcome to Eventora, your premier event management platform. At Eventora, we are dedicated to providing a seamless and enjoyable experience for both event organizers and attendees. Our platform offers a range of features designed to make event planning, management, and participation as effortless as possible.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to revolutionize the way events are managed and attended. We aim to empower organizers with the tools they need to create successful events and provide attendees with a straightforward way to discover and participate in events that interest them.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li>Comprehensive event management tools</li>
          <li>Easy event discovery and registration</li>
          <li>Secure and reliable platform</li>
          <li>24/7 customer support</li>
          <li>Customizable event pages</li>
        </ul>
        <h2>Our Team</h2>
        <p>
          Eventora is powered by a team of passionate individuals who are experts in event management, technology, and customer service. We are committed to ensuring that your experience with Eventora is nothing short of exceptional.
        </p>
        <h2>Contact Us</h2>
        <p>
          Have questions or need support? Reach out to our team at <a href="mailto:support@eventora.com">support@eventora.com</a> or call us at +123-456-7890.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
