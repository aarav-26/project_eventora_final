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

        // try {
        //   const response = await fetch('http://localhost:8084/admins/add_admin', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(newAdmin),
        //   });

        //   if (response.ok) {
        //     const result = await response.json();
        //     console.log('Admin signed up:', result);
        //     alert('Admin signed up successfully!');
        //     onSignupSuccess();
        //   } else {
        //     console.error('Failed to sign up admin:', response.statusText);
        //     alert('Failed to sign up admin.');
        //   }
        // } catch (error) {
        //   console.error('Error:', error);
        //   alert('An error occurred while signing up admin.');
        // }
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
      <div className="popup-form-container" onClick={e => e.stopPropagation()}>
        <button className="popup-button close-btn" onClick={onClose}>×</button>
        <h2 className="popup-h2">{isAdmin ? 'Admin Signup' : 'User Signup'}</h2>
        <input type="text" className="popup-input" placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
        <input type="email" className="popup-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="popup-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="number" className="popup-input" placeholder="Age" min={10} value={age} onChange={e => setAge(e.target.value)} />
        {isAdmin ? (
          <>
            <input type="text" className="popup-input" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
            <input type="text" className="popup-input" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
            <input type="file" className="popup-input" placeholder="ID Card Photo" onChange={e => setIdCardPhoto(e.target.files[0])} />
          </>
        ) : (
          <>
            <input type="file" className="popup-input" placeholder="Profile Photo" onChange={e => setProfilePhoto(e.target.files[0])} />
          </>
        )}
        <input type="text" className="popup-input" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        <button className="popup-button" onClick={handleSignup}>Sign Up</button>
        <button className="popup-button switch-btn" onClick={() => setIsAdmin(!isAdmin)}>Switch to {isAdmin ? 'User' : 'Admin'} Signup</button>
      </div>
    </div>
  );
};

export default Signup;
