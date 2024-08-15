import React, { useState } from 'react';
import './Support.css';
import image1 from "../support.jpg";

const Support = () => {
    const [email, setEmail] = useState('');
    const [complaint, setComplaint] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("complaint", complaint);
        formData.append("access_key", "915fed79-aa4b-4348-818f-7d97cd19b869");

        const json = JSON.stringify(Object.fromEntries(formData));

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: json,
            });

            const result = await response.json();
            alert(result.message);

            if (response.ok) {
                setEmail('');
                setComplaint('');
            } else {
                alert('Error submitting complaint. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the complaint.');
        }
    };

    return (
      <div className="whole">
        <div className="support-container">
            <form onSubmit={handleSubmit} className="support-form">
                <h1>EVENTORA</h1>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="complaint">Complaint</label>
                    <textarea
                        id="complaint"
                        value={complaint}
                        onChange={(e) => setComplaint(e.target.value)}
                        placeholder="Describe your complaint"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Submit Complaint</button>
            </form>
        </div>
        <div>
          <img src={image1} className='supportimg' alt='support'></img>
        </div>
        </div>
    );
};

export default Support;
