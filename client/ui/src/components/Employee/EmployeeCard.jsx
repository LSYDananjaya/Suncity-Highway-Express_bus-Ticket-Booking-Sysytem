import React, { useState } from 'react';
import axios from 'axios';

const EmployeeCard = ({ employee }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    axios.put(`http://localhost:3000/api/employees/${employee._id}`, editedEmployee)
      .then((response) => {
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
      });
  };

  const handleDelete = () => {
    setIsEditing(false);
    axios.delete(`http://localhost:3000/api/employees/${employee._id}`)
      .then(() => window.location.reload())
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {isEditing ? (
          <>
            <input type="text" name="name" value={editedEmployee.name} onChange={handleChange} className="form-control mb-3" placeholder="Enter name" />
            <input type="text" name="employeeID" value={editedEmployee.employeeID} disabled className="form-control mb-3" placeholder="Employee ID" />
            <input type="text" name="mobile" value={editedEmployee.mobile} onChange={handleChange} className="form-control mb-3" placeholder="Enter mobile number" />
            <select id="employeeType" name="employeeType" onChange={handleChange} className="form-select mb-3">
              <option disabled value="">Select Employee Type</option>
              <option value="Driver">Driver</option>
              <option value="Conductor">Conductor</option>
            </select>
            <button type="button" onClick={handleSave} className="btn btn-success me-2">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
          </>
        ) : (
          <>
            <h2 className="card-title">{editedEmployee.name}</h2>
            <p className="card-text">{editedEmployee.employeeID}<br />{editedEmployee.mobile}<br />{editedEmployee.employeeType}</p>
            <div className="d-flex justify-content-between">
              <button type="button" onClick={handleUpdate} className="btn btn-primary me-2">Update</button>
              <button type="button" onClick={handleDelete} className="btn btn-danger">Delete</button>
            </div>
          </>
        )}
      </div>
      {updateSuccess && <div className="alert alert-success mt-3">Update successful</div>}
    </div>
  );
};

export default EmployeeCard;
