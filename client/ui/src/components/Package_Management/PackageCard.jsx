import React, { useState } from 'react';
import axios from 'axios';

const PackageCard = ({ packages }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: packages.name,
    description: packages.description,
    price: packages.price
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({
      ...updateFormData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/api/packages/${packages._id}`, updateFormData)
      .then(() => {
        setShowUpdateForm(false);
        // Reload packages after update
        window.location.reload();
      })
      .catch(error => console.error("Error:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
        axios.delete(`http://localhost:3000/api/packages/${packages._id}`)
            .then((response) => {
                console.log(response.data);
                // Optionally, you can update the UI after successful deletion
                // For example, you can filter out the deleted package from the list of packages
                // Or you can reload the package list from the server
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error, show alert, or any other action you want to take
            });
    }
  };

  return (
    <div className="package-card" style={{ maxWidth: '300px', margin: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <img
        src="https://images.pexels.com/photos/2377915/pexels-photo-2377915.jpeg?auto=compress&cs=tinysrgb&w=600.png"
        alt="Product"
        className="card-image"
        style={{ width: '100%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
      />

      <div className="card-content" style={{ padding: '20px' }}>
        <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{packages.name}</h2>
        <p className="card-id" style={{ fontSize: '1rem', color: '#666' }}>{packages.packageID}</p>
        <p className="card-type" style={{ fontSize: '1rem', color: '#666' }}>{packages.type}</p>
        <p className="card-description" style={{ fontSize: '1rem', marginBottom: '10px' }}>{packages.description}</p>
        <p className="card-price" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px' }}>{packages.price}</p>
        <button className="btn btn-info m-2" style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px', border: 'none' }} onClick={() => setShowUpdateForm(true)}>Update</button>
        <button className="btn btn-danger m-2" style={{ backgroundColor: 'red', color: 'white', border: 'none' }} onClick={() => handleDelete(packages._id)}>Delete</button>
      </div>

      {/* Update Form */}
      {showUpdateForm && (
        <div className="update-form" style={{ padding: '20px', borderTop: '1px solid #ccc' }}>
          <h3 style={{ marginBottom: '20px' }}>Update Package</h3>
          <label style={{ display: 'block', marginBottom: '10px' }}>Name:</label>
          <input type="text" name="name" value={updateFormData.name} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <label style={{ display: 'block', marginBottom: '10px' }}>Description:</label>
          <input type="text" name="description" value={updateFormData.description} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <label style={{ display: 'block', marginBottom: '10px' }}>Price:</label>
          <input type="number" name="price" value={updateFormData.price} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <button className="btn btn-primary" style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', border: 'none' }} onClick={handleUpdate}>Submit</button>
          <button className="btn btn-secondary" style={{ backgroundColor: 'gray', color: 'white', border: 'none' }} onClick={() => setShowUpdateForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
