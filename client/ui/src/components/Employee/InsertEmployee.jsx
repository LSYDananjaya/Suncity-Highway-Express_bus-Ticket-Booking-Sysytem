import React, { useState } from 'react';
import axios from 'axios';

const InsertEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        employeeID: '',
        name: '',
        mobile: '',
        employeeType: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!employeeData.employeeID || !employeeData.name || !employeeData.mobile || !employeeData.employeeType) {
            alert('Please fill in all fields');
            return;
        }

        if (window.confirm('Are you sure you want to add this employee?')) {
            axios.post('http://localhost:3000/api/employees/', employeeData).then(() => {
                setEmployeeData({
                    employeeID: '',
                    name: '',
                    mobile: '',
                    employeeType: '',
                });
                window.location.href = '/employees'; // Redirect to the home page
            });
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel?')) {
            window.location.href = '/employees'; // Redirect to the home page
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Employee Information Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="employeeID" className="form-label">Employee ID:</label>
                    <input type="text" id="employeeID" name="employeeID" onChange={handleChange} value={employeeData.employeeID} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" id="name" name="name" onChange={handleChange} value={employeeData.name} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile:</label>
                    <input type="text" id="mobile" name="mobile" onChange={handleChange} value={employeeData.mobile} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="employeeType" className="form-label">Employee Type:</label>
                    <select id="employeeType" name="employeeType" onChange={handleChange} value={employeeData.employeeType} className="form-select" required>
                        <option value="">Select Employee Type</option>
                        <option value="Driver">Driver</option>
                        <option value="Conductor">Conductor</option>
                    </select>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button type="submit" className="btn btn-success me-md-2">Add</button>
                    <button type="button" onClick={handleCancel} className="btn btn-danger mt-2 mt-md-0">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default InsertEmployee;
