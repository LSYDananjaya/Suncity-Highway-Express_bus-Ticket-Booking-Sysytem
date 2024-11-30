import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userId, setUserId] = useState('');
  const [userEntry, setUserEntry] = useState(0); // Default user entry type is 0

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(e.target.value.includes('@'));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the login route
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password
      });

      // Check if login was successful
      if (response.data.success) {
        // Display login success message
        setLoginSuccess(true);

        // Set user ID
        setUserId(response.data._id);

        // Set user entry type if available
        if (response.data.userEntry !== undefined) {
          setUserEntry(response.data.userEntry);
        }
        return; // Exit the function after setting user ID and entry type
      }
      // Show error message if user data is missing or login was unsuccessful
      setErrorMessage(response.data.msg || 'User data is missing.');
    } catch (error) {
      console.error("Error:", error);
      // Show generic error message
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="card p-4 bg-dark text-white" style={{ width: '75%', maxWidth: '300px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
        <div className="text-center mb-4">
          <img src="./public/icon.svg" alt="Icon" width="100" />
          <h2 className="mt-3">Welcome to Suncity Highway Express!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${!emailValid ? 'is-invalid' : ''}`}
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
              style={{ backgroundColor: '#343a40', color: 'white', border: 'none' }}
            />
            <label htmlFor="floatingInput">Email address</label>
            {!emailValid && (
              <div className="invalid-feedback">
                Please enter a valid email address.
              </div>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              style={{ backgroundColor: '#343a40', color: 'white', border: 'none' }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {loginSuccess && (
            <div>
              <p className="alert alert-success" role="alert">Login successful!</p>
              {userEntry === 0 && (
                <>
                  <Link to={`/MyProfile/${userId}`} className="btn btn-primary w-100 mb-3" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Go to My Profile</Link>
                  <p className="text-center text-white mb-3">OR</p>
                  <Link to="/Home" className="btn btn-secondary w-100 mb-3" style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}>Go to Home Page</Link>
                </>
              )}
              {userEntry === 1 && (
                <Link to="/Report" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Go to Reports</Link>
              )}
              {userEntry === 2 && (
                <Link to="/employees" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Go to Employees</Link>
              )}
              {userEntry === 3 && (
                <Link to="/AddPackage" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Go to Packages</Link>
              )}
              {userEntry === 4 && (
                <Link to="/InsertSchedule" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Go to Schedule</Link>
              )}
              {userEntry === 5 && (
                <Link to="/admin" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: 'green', color: 'white',fontFamily: 'Impact' }}>Go to Admin DashBoard</Link>
              )}
              {/* Add more conditional rendering for different user entry types */}
            </div>
          )}
          {!loginSuccess && (
            <button className="btn btn-primary w-100 mb-3" type="submit" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Sign in</button>
          )}
          <p className="text-center">Don't have an account? <Link to="/Register" className="text-white">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Sign;
