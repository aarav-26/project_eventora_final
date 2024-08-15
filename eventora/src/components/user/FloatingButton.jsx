// src/components/user/FloatingButton.jsx
import React, { useState, useEffect } from 'react';
import './FloatingButton.css';

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="floating-button">
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top">
          &#8593;
        </button>
      )}
    </div>
  );
};

export default FloatingButton;
