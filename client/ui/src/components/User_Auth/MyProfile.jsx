import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import './App.css';
import profileIcon from './icons/profile-icon.svg'; // Import profile icon image
import emailIcon from './icons/email-icon.svg'; // Import email icon image
import phoneIcon from './icons/phone-icon.svg'; // Import phone icon image
import editIcon from './icons/edit-icon.svg'; // Import edit icon image
import logoutIcon from './icons/logout-icon.svg'; // Import logout icon image
import deleteIcon from './icons/delete-icon.svg'; // Import delete icon image


function MyProfile() {
    const { id } = useParams(); // Extract the user ID from the URL
    const [name, setName] = useState(''); // Initialize name state variable
    const [email, setEmail] = useState(''); // Initialize email state variable
    const [mNo, setMNo] = useState(''); // Initialize mNo state variable
    const [errorMessage, setErrorMessage] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false); // State variable to control visibility of update modal
    const [selectedProfile, setSelectedProfile] = useState({}); // State variable to hold selected profile data

    // useEffect to fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Make a GET request to fetch user details
                const response = await axios.get(`http://localhost:3000/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // Check if request was successful
                if (response.data.success) {
                    // Update state variables with received data
                    const { name, email, mNo } = response.data.user;
                    setName(name);
                    setEmail(email);
                    setMNo(mNo);
                } else {
                    // Show error message if request failed
                    setErrorMessage(response.data.msg);
                }
            } catch (error) {
                console.error("Error:", error);
                // Show generic error message if request failed
                setErrorMessage('An error occurred. Please try again later.');
            }
        };

        // Fetch user profile data when component mounts
        fetchUserProfile();
    }, [id]); // Fetch user profile whenever the user ID changes

    // Function to handle logout
    const handleLogout = () => {
        // Redirect to the specified route
        window.location.href = '/';
    };

    // Function to handle updating profile information
    const handleEditProfile = () => {
        setSelectedProfile({ name, mNo });
        setShowUpdateModal(true);
    };

    // Function to handle update profile submit
    const handleUpdateProfileSubmit = async () => {
        try {
            // Make a PUT request to update user details
            await axios.put(`http://localhost:3000/api/users/${id}`, {
                name: selectedProfile.name,
                mNo: selectedProfile.mNo
            });
            // Update name and mobile number with new values
            setName(selectedProfile.name);
            setMNo(selectedProfile.mNo);
            // Close the modal
            setShowUpdateModal(false);
        } catch (error) {
            console.error("Error:", error);
            // Show error message if update failed
            setErrorMessage('Update failed. Please try again later.');
        }
    };

    // Function to handle deleting user account
    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                // Make a DELETE request to delete user account
                await axios.delete(`http://localhost:3000/api/users/${id}`);
                // Redirect to the specified route after deletion
                window.location.href = '/';
            } catch (error) {
                console.error("Error:", error);
                // Show error message if deletion failed
                setErrorMessage('Deletion failed. Please try again later.');
            }
        }
    };

    return (
        <div className="grid-container" style={{ backgroundImage: `url('/background-image.jpg')` }}>
            <div className="bg-dark py-5">
                <div className="container-lg">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card bg-body-tertiary" data-bs-theme="dark" style={{ fontFamily: 'Arial, sans-serif' }}> {/* darker background color */}
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                                <div className="card-body text-center">
                                    <h5 className="card-title mb-4 fs-3" style={{ fontFamily: 'Impact', color: 'white' }}>My Profile</h5>
                                    <img
                                        src={profileIcon}
                                        alt="Profile"
                                        className="img-fluid mb-3 rounded-circle"
                                        style={{ width: '90px', height: '90px', border: '4px solid black' }}
                                    />

                                    <div className="rounded bg-primary p-3 mb-4">
                                        <p className="card-text fs-5 text-white">
                                            <img src={profileIcon} alt="Profile" className="icon" style={{ width: '40px', height: '40px' }} /> {name}
                                        </p>
                                    </div>
                                    <div className="rounded bg-secondary p-3 mb-4">
                                        <p className="card-text fs-5 text-white">
                                            <img src={emailIcon} alt="Email" className="icon" style={{ width: '40px', height: '40px' }} /> {email}
                                        </p>
                                    </div>
                                    <div className="rounded bg-info p-3 mb-5">
                                        <p className="card-text fs-5 text-white">
                                            <img src={phoneIcon} alt="Phone Number" className="icon" style={{ width: '40px', height: '40px' }} /> {mNo}
                                        </p>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <div className="d-grid gap-2">
                                            <div className="mb-2 d-flex justify-content-between">
                                                <button className="btn btn-sm me-2" style={{ width: 'calc((100% - 10px) / 2)', backgroundColor: 'blue', color: 'white', fontFamily: 'Impact' }} onClick={handleEditProfile}>
                                                    <img src={editIcon} alt="Edit Profile" className="icon" style={{ width: '40px', height: '40px' }} /> Edit Profile
                                                </button>
                                                <button className="btn btn-sm" style={{ width: 'calc((100% - 10px) / 2)', backgroundColor: 'orange', color: 'white', fontFamily: 'Impact' }} onClick={handleDeleteAccount}>
                                                    <img src={deleteIcon} alt="Delete Account" className="icon" style={{ width: '40px', height: '40px' }} /> Delete Account
                                                </button>
                                            </div>
                                            <div className="mb-2">
                                                <button className="btn btn-lg w-100" style={{ backgroundColor: 'red', color: 'white', fontFamily: 'Impact' }} onClick={handleLogout}>
                                                    <img src={logoutIcon} alt="Logout" className="icon me-2" style={{ width: '40px', height: '40px' }} /> Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
            <Modal.Header closeButton style={{ backgroundColor: '#343a40' }}>
                <Modal.Title style={{ fontFamily: 'Impact',color: 'white' }}>Edit Profile</Modal.Title>
            </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#343a40' }}>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>
                                <img src={profileIcon} alt="Name" className="icon me-2" style={{ width: '24px', height: '24px' }} />
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={selectedProfile.name || ''} onChange={(e) => setSelectedProfile({ ...selectedProfile, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>
                                <img src={phoneIcon} alt="Phone Number" className="icon me-2" style={{ width: '24px', height: '24px' }} />
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter phone number" value={selectedProfile.mNo || ''} onChange={(e) => setSelectedProfile({ ...selectedProfile, mNo: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#343a40' }}>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)} style={{ color: 'white',fontFamily: 'Impact' }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProfileSubmit} style={{ backgroundColor: 'green', color: 'white',fontFamily: 'Impact' }}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MyProfile;
