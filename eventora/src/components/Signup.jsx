import React, { useState } from 'react';
import './Popup.css'; // Shared CSS for popup

const Signup = ({ onClose, onSignupSuccess }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [idCardPhoto, setIdCardPhoto] = useState(null);
  const [preferredEvent, setPreferredEvent] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = async () => {
    if (isAdmin) {
      if (!userName || !email || !password || !age || !role || !company || !idCardPhoto || !phoneNumber) {
        alert('Please fill out all fields.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64IdCardPhoto = reader.result.split(',')[1];

        const newAdmin = {
          userName,
          email,
          password,
          age: parseInt(age),
          role,
          company,
          idCardPhoto: base64IdCardPhoto,
          phoneNumber
        };

        try {
          const response = await fetch('http://localhost:8084/admins/add_admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAdmin),
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Admin signed up:', result);
            alert('Admin signed up successfully!');
            onSignupSuccess();
          } else {
            console.error('Failed to sign up admin:', response.statusText);
            alert('Failed to sign up admin.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while signing up admin.');
        }
      };

      reader.readAsDataURL(idCardPhoto);
    } else {
      if (!userName || !email || !password || !age || !profilePhoto || !phoneNumber) {
        alert('Please fill out all fields.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64ProfilePhoto = reader.result.split(',')[1];

        const newUser = {
          userName,
          email,
          password,
          age: parseInt(age),
          profilePhoto: base64ProfilePhoto,
          phoneNumber
        };

        try {
          const response = await fetch('http://localhost:8084/users/users_value', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          });

          if (response.ok) {
            const result = await response.json();
            console.log('User signed up:', result);
            alert('User signed up successfully!');
            onSignupSuccess();
          } else {
            console.error('Failed to sign up user:', response.statusText);
            alert('Failed to sign up user.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while signing up user.');
        }
      };

      reader.readAsDataURL(profilePhoto);
    }
  };

  return (
    <div className="popup-container" onClick={onClose}>
      <div className="form-container" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isAdmin ? 'Admin Signup' : 'User Signup'}</h2>
        <input type="text" placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="number" placeholder="Age" min={10} value={age} onChange={e => setAge(e.target.value)} />
        {isAdmin ? (
          <>
            <input type="text" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
            <input type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
            <input type="file" placeholder="IDCard Photo" accept="image/*" onChange={e => setIdCardPhoto(e.target.files[0])} />
            <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </>
        ) : (
          <>
            <input type="text" placeholder="Preferred Event" value={preferredEvent} onChange={e => setPreferredEvent(e.target.value)} />
            <input type="file" accept="image/*" onChange={e => setProfilePhoto(e.target.files[0])} />
            <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </>
        )}
        <button onClick={handleSignup}>Sign Up</button>
        <button className="switch-btn" onClick={() => setIsAdmin(!isAdmin)}>Switch to {isAdmin ? 'User' : 'Admin'} Signup</button>
      </div>
    </div>
  );
};

export default Signup;
