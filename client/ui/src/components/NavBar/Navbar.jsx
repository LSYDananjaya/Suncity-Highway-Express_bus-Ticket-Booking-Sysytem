import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import profileIcon from './icons/profile-icon.svg';
import feedbackIcon from './icons/feedback-icon.svg';
import ticketIcon from './icons/ticket-icon.svg';
import homeIcon from './icons/home-icon.svg';
import luggageIcon from './icons/luggage-icon.svg';
import logoutIcon from './icons/logout-icon.svg';

const Navbar = () => {
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: '1rem' }}>
            <div className="container-fluid">
            <img src="./public/icon.svg" alt="Icon" width="100" />
                <Link className="navbar-brand" to="/" style={{ fontSize: '1.5rem' }}>Sun City</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${activeItem === 'home' ? 'active' : ''}`} 
                                to="/Home"
                                onClick={() => handleItemClick('home')}
                            >
                                <img src={homeIcon} alt="Home" className="icon" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
                                Home
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a 
                                className={`nav-link dropdown-toggle ${activeItem === 'tickets' ? 'active' : ''}`} 
                                href="#" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                                onClick={() => handleItemClick('tickets')}
                            >
                                <img src={ticketIcon} alt="Buy Tickets" className="icon" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
                                Buy Tickets
                            </a>
                            <ul className="dropdown-menu" style={{ backgroundColor: '#343a40' }}>
                                <li><Link className="dropdown-item" to="/buslist" style={{ color: 'white' }}>Available Buses</Link></li>
                                <li><Link className="dropdown-item" to="/form" style={{ color: 'white' }}>Book Seat</Link></li>
                                <li><hr className="dropdown-divider" style={{ borderColor: 'white' }} /></li>
                                <li><Link className="dropdown-item" to="/read" style={{ color: 'white' }}>My Reservations</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a 
                                className={`nav-link dropdown-toggle ${activeItem === 'luggages' ? 'active' : ''}`} 
                                href="#" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                                onClick={() => handleItemClick('luggages')}
                            >
                                <img src={luggageIcon} alt="Add Luggages" className="icon" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
                                Add Luggages
                            </a>
                            <ul className="dropdown-menu" style={{ backgroundColor: '#343a40' }}>
                                <li><Link className="dropdown-item" to="/insert" style={{ color: 'white' }}>Register Luggages</Link></li>
                                <li><Link className="dropdown-item" to="/luggage" style={{ color: 'white' }}>View Luggages</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a 
                                className={`nav-link dropdown-toggle ${activeItem === 'reviews' ? 'active' : ''}`} 
                                href="#" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                                onClick={() => handleItemClick('reviews')}
                            >
                                <img src={feedbackIcon} alt="Reviews" className="icon" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
                                Reviews
                            </a>
                            <ul className="dropdown-menu" style={{ backgroundColor: '#343a40' }}>
                                <li><Link className="dropdown-item" to="/AddReview" style={{ color: 'white' }}>Add Reviews</Link></li>
                                <li><Link className="dropdown-item" to="/ViewReview" style={{ color: 'white' }}>View Reviews</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeItem === 'profile' ? 'active' : ''}`} href="#" onClick={() => handleItemClick('profile')}>
                                <img src={profileIcon} alt="View Profile" className="icon" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
                                View Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeItem === 'logout' ? 'active' : ''}`} href="/" onClick={() => handleItemClick('logout')}>
                                <img src={logoutIcon} alt="Log Out" className="icon" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
                                Log Out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
