import React, { useState } from 'react';
import axios from 'axios';

const InsertBus = () => {
    const [busData, setBusData] = useState({
        busNumber: '',
        numberOfSeats: '',
        manufactureYear: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusData({
            ...busData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!busData.busNumber || !busData.numberOfSeats || !busData.manufactureYear) {
            alert('Please fill in all fields');
            return;
        }

        if (window.confirm('Are you sure you want to add this bus?')) {
            axios.post('http://localhost:3000/api/busses/', busData).then(() => {
                setBusData({
                    busNumber: '',
                    numberOfSeats: '',
                    manufactureYear: ''
                });
                window.location.href = '/busses';
                // Redirect or show success message
            }).catch(error => {
                // Handle error
            });
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel?')) {
            window.location.href = '/busses';
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'center' }}>Bus Information Form</h2>
            <form id="busForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="busNumber">Bus Number:</label>
                    <input type="text" id="busNumber" name="busNumber" onChange={handleChange} value={busData.busNumber} className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfSeats">Number of Seats:</label>
                    <input type="number" id="numberOfSeats" name="numberOfSeats" onChange={handleChange} value={busData.numberOfSeats} className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="manufactureYear">Manufacture Year:</label>
                    <input type="text" id="manufactureYear" name="manufactureYear" onChange={handleChange} value={busData.manufactureYear} className="form-control" required />
                </div>
                <div className="form-group" style={{ textAlign: 'center' }}>
                    <button type="submit" style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', borderRadius: '5px', padding: '8px 16px', border: 'none', boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>Add</button>
                    <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px', padding: '8px 16px', border: 'none', boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default InsertBus;
