import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useUser } from '../../context/UserContext';

const ProfilePage = () => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState({
    userName: '',
    email: '',
    age: '',
    city: '',
    phoneNumber: '',
    profilePhoto: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem('userDetails');
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setProfileData({
        userName: parsedProfile.userName,
        email: parsedProfile.email,
        age: parsedProfile.age,
        city: parsedProfile.city,
        phoneNumber: parsedProfile.phoneNumber,
        profilePhoto: parsedProfile.profilePhoto || ''
      });
    }
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'profilePhoto') {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const { profilePhoto, ...dataToSend } = profileData; // Exclude profilePhoto
      const response = await fetch(`http://localhost:8084/users/updateDetails/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const message = await response.text(); // Get the response text
      console.log('Update message:', message);
      alert(message); // Display the message in a popup
      localStorage.setItem('userDetails', JSON.stringify({ ...profileData, profilePhoto })); // Preserve profilePhoto in local storage
      setIsEditing(false); // Exit editing mode on successful save
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  const handleButtonClick = () => {
    if (isEditing) {
      handleSubmit(); // Trigger form submission on save
    } else {
      setIsEditing(true); // Enter editing mode
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-info">
        {profileData.profilePhoto && (
          <img src={`data:image/png;base64,${profileData.profilePhoto}`} alt="Profile" className="profile-photo" />
        )}
        <form onSubmit={(e) => e.preventDefault()} className="profile-form">
          <div className="profile-row">
            <label>
              User Name:
              <input
                type="text"
                name="userName"
                value={profileData.userName}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </label>
          </div>
          <div className="profile-row">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </label>
          </div>
          <div className="profile-row">
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={profileData.age}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </label>
          </div>
          <div className="profile-row">
            <label>
              City:
              <input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </label>
          </div>
          <div className="profile-row">
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </label>
          </div>
          <button type="button" onClick={handleButtonClick}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
