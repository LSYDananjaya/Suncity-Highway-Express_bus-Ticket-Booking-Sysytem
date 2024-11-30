import React, { useState } from 'react';
import axios from 'axios';

const BusCard = ({ bus }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBus, setEditedBus] = useState({ ...bus });
    const [updateSuccess, setUpdateSuccess] = useState(false); // State for update success message
    const [isDeleting, setIsDeleting] = useState(false);

    const handleUpdate = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        console.log('Edited bus details:', editedBus);
        setIsEditing(false);
        axios.put(`http://localhost:3000/api/busses/${bus._id}`, editedBus)
            .then((response) => {
                console.log(response);
                setUpdateSuccess(true); // Set update success message to true
                setTimeout(() => setUpdateSuccess(false), 3000); // Hide message after 3 seconds
                // You may also handle the response or reload the data if needed
            })
            .catch((error) => {
                console.error('Error updating bus:', error);
                // Handle error if needed
            });
    };

    const handleDelete = () => {
        setIsDeleting(true);
        axios.delete(`http://localhost:3000/api/busses/${bus._id}`)
            .then((response) => {
                console.log(response);
                setIsDeleting(false);
                window.location.reload(); // Refresh the page after deletion
            })
            .catch((error) => {
                console.error('Error deleting bus:', error);
                setIsDeleting(false);
                // Handle error if needed
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBus(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <>
                    <h5 className="card-title">{editedBus.busNumber}</h5>
                    {isEditing ? (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Number of Seats:</label>
                                <input type="number" name="numberOfSeats" value={editedBus.numberOfSeats} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Manufacture Year:</label>
                                <input type="number" name="manufactureYear" value={editedBus.manufactureYear} onChange={handleChange} className="form-control" />
                            </div>
                            <button type="button" onClick={handleSave} className="btn btn-success me-2">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
                        </>
                    ) : (
                        <>
                            <p className="card-text">{editedBus.numberOfSeats} Seats<br />Manufactured in {editedBus.manufactureYear}</p>
                            <div className="d-flex justify-content-between">
                                <button type="button" onClick={handleUpdate} className="btn btn-primary">Update</button>
                                <button type="button" onClick={handleDelete} className="btn btn-danger" disabled={isDeleting}>
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </>
                    )}
                </>
            </div>
            {updateSuccess && <div className="alert alert-success mt-3" role="alert">Update is successful</div>}
        </div>
    );
};

export default BusCard;
