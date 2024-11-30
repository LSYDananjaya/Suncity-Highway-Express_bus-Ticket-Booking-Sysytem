import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import React Bootstrap components
import { useNavigate } from 'react-router-dom';

function UpdatePackage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for showing update modal
  const [updateFormData, setUpdateFormData] = useState({}); // State for update form data

  const { name, price, description } = formData;

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handlePostReview = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/reviews", formData);

      if (response.data.msg === "Feedback added successfully") {
        setSuccessMessage("Review added successfully!");
        setTimeout(() => navigate("/ViewReview"), 1500);//Navigate after 1.5 seconds
      } else {
        setSuccessMessage("Failed to add review");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("An error occurred. Please try again later.");
    }
  };

  const handleUpdateModalShow = () => setShowUpdateModal(true); // Show update modal
  const handleUpdateModalClose = () => setShowUpdateModal(false); // Close update modal

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/reviews/${updateFormData._id}`, updateFormData);

      if (response.data.msg === "Update successfully") {
        setSuccessMessage("Review updated successfully!");
        setShowUpdateModal(false); // Close update modal after successful update
      } else {
        setSuccessMessage("Failed to update review");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("An error occurred. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/reviews/${id}`);

      if (response.data.msg === "Delete successfully") {
        setSuccessMessage("Review deleted successfully!");
      } else {
        setSuccessMessage("Failed to delete review");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("An error occurred. Please try again later.");
    }
  };

  const handleUpdateFormChange = e => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateButtonClick = (review) => {
    setUpdateFormData(review);
    handleUpdateModalShow();
  };

  return (
    <div className="container">
      <h2 className="mt-4">Package information form</h2>
      <form>
      <div className="form-group">
                        <label htmlFor="PackageID">PackageID:</label>
                        <input
                            disabled
                            type="text"
                            id="PackageID"
                            name="packageID"
                            required
                            onChange={handleChange}
                            value={Datax?.packageID}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            onChange={handleChange}
                            value={packagesData.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            min="0"
                            step="0.01"
                            required
                            onChange={handleChange}
                            value={packagesData.price}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            required
                            onChange={handleChange}
                            value={packagesData.description}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Update"
                            className="submit-button"
                        />
                    </div>
        <button type="button" className="btn btn-primary me-2" onClick={handlePostReview} style={{ backgroundColor: 'blue', color: 'white' }}>Post</button>
        <Link to="/AddReview" className="btn btn-secondary" style={{ backgroundColor: 'gray', color: 'white' }}>Cancel</Link>
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </form>

      {/* Update Package Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="update-name" className="form-label">Name</label>
            <input type="text" className="form-control" id="update-name" name="name" value={updateFormData.name} onChange={handleUpdateFormChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="update-price" className="form-label">Price</label>
            <textarea className="form-control" id="update-price" name="pricee" value={updateFormData.price} onChange={handleUpdateFormChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="update-description" className="form-label">Description</label>
            <input type="text" className="form-control" id="update-description" name="description" value={updateFormData.description} onChange={handleUpdateFormChange} required />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdatePackage;