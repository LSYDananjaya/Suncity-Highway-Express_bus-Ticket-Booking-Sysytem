import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const EditModal = ({ show, handleClose, review, onSave }) => {
  const [formData, setFormData] = useState({ ...review });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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


  return (
    show ? (
      <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h5 className="modal-title" style={{ flexGrow: 1, paddingRight: '20px' }}>Edit Feedback</h5>
                            <button type="button" className="close" onClick={handleClose} style={{ marginLeft: '20px' }}>&times;</button>
                        </div>
            <div className="modal-body">
              <select className="form-control mb-2" name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select a category</option>
                <option value="About Driving">About Driving</option>
                <option value="About Service">About Service</option>
                <option value="About Comfortability">About Comfortability</option>
                <option value="About Pricing">About Pricing</option>
              </select>
              <div className="mb-3">
            <label htmlFor="busNum" className="form-label">Bus Number</label>
            <select className="form-control" id="busNum" name="busNum" value={formData.busNum} onChange={handleChange} required>
                <option value="">Bus Number</option>
            {busnum.map(num => (
                        <option key={num.id} value={num.number}>{num.number}</option>
                              ))}
            </select>
        </div>
              <div className="form-check">
                <input type="radio" id="positive" name="type" value="positive" checked={formData.type === 'positive'} onChange={handleChange} className="form-check-input" />
                <label htmlFor="positive" className="form-check-label">Positive</label>
              </div>
              <div className="form-check">
                <input type="radio" id="negative" name="type" value="negative" checked={formData.type === 'negative'} onChange={handleChange} className="form-check-input" />
                <label htmlFor="negative" className="form-check-label">Negative</label>
              </div>
              <input type="text" className="form-control mb-2" name="title" value={formData.title} onChange={handleChange} required/>
              <textarea className="form-control mb-2" name="content" value={formData.content} onChange={handleChange} required/>
              <input type="number" className="form-control mb-2" name="rating" value={formData.rating} onChange={handleChange} required/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => onSave(formData)}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
};

const FeedbackCard = ({ review }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (formData) => {
    try {
      await axios.put(`http://localhost:3000/api/reviews/${review._id}`, formData);
      window.alert("Review updated successfully!");
      window.location.reload(); // Consider updating the state instead
    } catch (error) {
      console.error("Error:", error);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/reviews/${review._id}`);
        window.alert("Review deleted successfully!");
        window.location.reload(); // Consider updating the state instead
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="card" style={{ width: '350px' }}>
        <img src="https://www.shutterstock.com/image-photo/customer-experience-concept-woman-hand-600nw-1576875433.jpg" className="card-img-top" alt="Feedback" />
      <div className="card-body">
        {!isEditing && (
          <>
            <h5 className="card-title">{review.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{review.type}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{review.category}</h6>
            <p className="card-text">{review.content}</p>
            <p className="card-text">{review.busNum}</p>
            <p className="card-text">Rating: {review.rating}</p>
            <p className="card-text">Submitted on: {new Date(review.createdAt).toLocaleDateString()}</p>
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
      <EditModal 
        show={isEditing} 
        handleClose={() => setIsEditing(false)} 
        review={review}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default FeedbackCard;
