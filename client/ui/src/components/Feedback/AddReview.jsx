import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import React Bootstrap components
import { useNavigate } from 'react-router-dom';

function AddReview() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category:'',
    type:'',
    rating: 0,
    busNum:'',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for showing update modal
  const [updateFormData, setUpdateFormData] = useState({}); // State for update form data

  const { title, content, category,rating, type,busNum } = formData;

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const [busnum, setBusnum] = useState([]);
  
  useEffect(() => {
    // Fetch packages from your friend's API or database
    axios.get('http://localhost:3000/api/sheduleRoutes') // Adjust the URL according to your friend's API
      .then(response => {
        setBusnum(response.data);
      })
      .catch(error => {
        console.error('Error fetching packages:', error);
      });
  }, []);

  const handlePostReview = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/reviews", formData);

      if (response.data.msg === "Feedback added successfully") {
        setSuccessMessage("Review added successfully!");
        setTimeout(() => navigate("/ViewReview"), 1500); // Navigate after 1.5 seconds

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
      <h2 className="mt-4">Add Review</h2>
      <form>
      <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select className="form-control" id="category" name="category" value={category} onChange={handleInputChange} required>
                <option value="">Select a category</option>
                <option value="About Driving">About Driving</option>
                <option value="About Service">About Service</option>
                <option value="About Comfortability">About Comfortability</option>
                <option value="About Pricing">About Pricing</option>
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="busNum" className="form-label">Bus Number</label>
            <select className="form-control" id="busNum" name="busNum" value={busNum} onChange={handleInputChange} required>
                <option value="">Bus Number</option>
            {busnum.map(num => (
                        <option key={num.id} value={num.number}>{num.number}</option>
                              ))}
            </select>
        </div>
        <fieldset className="mb-3">
            <legend className="col-form-label pt-0">Review Type</legend>
            <div className="form-check">
                <input type="radio" id="positive" name="type" value="positive" checked={type === 'positive'} onChange={handleInputChange} className="form-check-input" />
                <label htmlFor="positive" className="form-check-label">Positive</label>
            </div>
            <div className="form-check">
                <input type="radio" id="negative" name="type" value="negative" checked={type === 'negative'} onChange={handleInputChange} className="form-check-input" />
                <label htmlFor="negative" className="form-check-label">Negative</label>
            </div>
        </fieldset>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={title} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" id="content" name="content" value={content} onChange={handleInputChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <input type="number" className="form-control" id="rating" name="rating" value={rating} onChange={handleInputChange} required />
        </div>
        <button type="button" className="btn btn-primary me-2" onClick={handlePostReview} style={{ backgroundColor: 'blue', color: 'white' }}>Post</button>
        <Link to="/AddReview" className="btn btn-secondary" style={{ backgroundColor: 'gray', color: 'white' }}>Cancel</Link>
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </form>

      {/* Update Review Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select className="form-control" id="category" name="category" value={updateFormData.category} onChange={handleInputChange} required>
                <option value="">Select a category</option>
                <option value="movies">About Driving</option>
                <option value="books">About Service</option>
                <option value="games">About Comfortability</option>
                <option value="electronics">About Pricing</option>
            </select>
        </div>
        <fieldset className="mb-3">
            <legend className="col-form-label pt-0">Review Type</legend>
            <div className="form-check">
                <input type="radio" id="positive" name="updateFormData.type" value="positive" checked={updateFormData.type === 'positive'} onChange={handleInputChange} className="form-check-input" />
                <label htmlFor="positive" className="form-check-label">Positive</label>
            </div>
            <div className="form-check">
                <input type="radio" id="negative" name="updateFormData.type" value="negative" checked={updateFormData.type === 'negative'} onChange={handleInputChange} className="form-check-input" />
                <label htmlFor="negative" className="form-check-label">Negative</label>
            </div>
        </fieldset>
          <div className="mb-3">
            <label htmlFor="update-title" className="form-label">Title</label>
            <input type="text" className="form-control" id="update-title" name="title" value={updateFormData.title} onChange={handleUpdateFormChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="update-content" className="form-label">Content</label>
            <textarea className="form-control" id="update-content" name="content" value={updateFormData.content} onChange={handleUpdateFormChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="update-rating" className="form-label">Rating</label>
            <input type="number" className="form-control" id="update-rating" name="rating" value={updateFormData.rating} onChange={handleUpdateFormChange} required />
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

export default AddReview;
