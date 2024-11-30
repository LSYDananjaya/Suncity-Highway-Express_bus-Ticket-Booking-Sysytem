import React from 'react';
import './UserCard.css'; // Import CSS for UserCard styling
import profileIcon from './icons/profile-icon.svg'; // Import profile icon image
import emailIcon from './icons/email-icon.svg'; // Import email icon image
import phoneIcon from './icons/phone-icon.svg'; // Import phone icon image

const UserCard = ({ user }) => {
  return (
    <div className="card text-center user-card">
      <div className="card-body">
        
        <div className="rounded bg-primary p-3 mb-4">
          <p className="card-text fs-5 text-white">
            <img src={profileIcon} alt="Profile" className="icon" style={{ width: '40px', height: '40px' }} /> {user.name}
          </p>
        </div>
        <div className="rounded bg-secondary p-3 mb-4">
          <p className="card-text fs-5 text-white">
            <img src={emailIcon} alt="Email" className="icon" style={{ width: '40px', height: '40px' }} /> {user.email}
          </p>
        </div>
        <div className="rounded bg-info p-3 mb-5">
          <p className="card-text fs-5 text-white">
            <img src={phoneIcon} alt="Phone Number" className="icon" style={{ width: '40px', height: '40px' }} /> {user.mNo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;