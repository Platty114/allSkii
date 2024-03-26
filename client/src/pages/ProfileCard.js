import React from 'react';
import './ProfileCard.css';
import profileSkiing from '../media/profile-final-skii.png';
const ProfileCard = () => {
    return (
        <div className="profileContainer">
          <div className="profileBox">
            <img src={profileSkiing} alt="Skiing Profile" className="profileImage" />
            <div className="profileText">
              <h2>James Crusoe</h2>
              <p>Username: </p>
              <p>Password: </p>
            </div>
          </div>
        </div>
      );
};

export default ProfileCard;
