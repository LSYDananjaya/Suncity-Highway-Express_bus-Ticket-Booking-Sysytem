    import React, { useState } from 'react';
    import axios from 'axios';
    import { Button, Form, Modal } from 'react-bootstrap';
    import QRCode from 'qrcode.react';
    import DownloadLink from 'react-download-link';

    const EditFormPopup = ({ show, handleClose, formData, handleChange, handleUpdate }) => {
      const [errors, setErrors] = useState({});
    
      const validateForm = () => {
        const newErrors = {};
    
        // Validation logic for each form field
        if (!formData.ownerName.trim()) {
          newErrors.ownerName = 'Sender Name is required';
        }
        if (!formData.receverName.trim()) {
          newErrors.receverName = 'Recever Name is required';
        }
        if (!formData.ownerPhone.trim()) {
          newErrors.ownerPhone = 'Sender Phone Number is required';
        }
        if (!formData.receverPhone.trim()) {
          newErrors.receverPhone = 'Recever Phone Number is required';
        }
        if (!formData.busNum1.trim()) {
          newErrors.busNum1 = 'Bus Number is required';
        } 
        if (!formData.startLoc.trim()) {
          newErrors.startLoc = 'Starting Location is required';
        }
        if (!formData.placeOfDelivery.trim()) {
          newErrors.placeOfDelivery = 'Ending Location is required';
        }
        if (!formData.weight.trim()) {
          newErrors.weight = 'Weight is required';
        }
        if (!formData.contents.trim()) {
          newErrors.contents = 'Contents is required';
        }
        
        
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if there are no errors
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          handleUpdate();
        }
      };
    
      return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Luggage</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Sender Name</Form.Label>
                  <Form.Control type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required />
                  {errors.ownerName && <Form.Text className="text-danger">{errors.ownerName}</Form.Text>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Receiver Name</Form.Label>
                  <Form.Control type="text" name="receverName" value={formData.receverName} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Sender Phone Number</Form.Label>
                  <Form.Control type="tel" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} required />
                  {errors.ownerPhone && <Form.Text className="text-danger">{errors.ownerPhone}</Form.Text>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Receiver Phone Number</Form.Label>
                  <Form.Control type="tel" name="receverPhone" value={formData.receverPhone} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bus Number</Form.Label>
                  <Form.Control type="text" name="busNum1" value={formData.busNum1} onChange={handleChange} required />
                  {errors.busNum1 && <Form.Text className="text-danger">{errors.busNum1}</Form.Text>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Departure Time</Form.Label>
                  <Form.Control type="text" name="dptTime" value={formData.dptTime} onChange={handleChange} required />
                  {errors.dptTime && <Form.Text className="text-danger">{errors.dptTime}</Form.Text>}
                </Form.Group>
                <Form.Group></Form.Group>
                <Form.Group>
                  <Form.Label>Starting Location</Form.Label>
                  <Form.Control type="text" name="startLoc" value={formData.startLoc} onChange={handleChange} required />
                  {errors.startLoc && <Form.Text className="text-danger">{errors.startLoc}</Form.Text>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ending Location</Form.Label>
                  <Form.Control type="text" name="placeOfDelivery" value={formData.placeOfDelivery} onChange={handleChange} required />
                  {errors.placeOfDelivery && <Form.Text className="text-danger">{errors.placeOfDelivery}</Form.Text>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Arival Time</Form.Label>
                  <Form.Control type="text" name="arivalTime" value={formData.arivalTime} onChange={handleChange} required />
                  {errors.arivalTime && <Form.Text className="text-danger">{errors.arivalTime}</Form.Text>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Weight of luggage</Form.Label>
                  <Form.Control type="number" name="weight" value={formData.weight} onChange={handleChange} required />
                  {errors.weight && <Form.Text className="text-danger">{errors.weight}</Form.Text>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contents</Form.Label>
                  <Form.Control type="text" name="contents" value={formData.contents} onChange={handleChange} required />
                  {errors.contents && <Form.Text className="text-danger">{errors.contents}</Form.Text>}
                </Form.Group>
                <br></br>
            <div className="update-form-buttons">
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" type="submit">Save Changes</Button>
            </div>
          </Form>
          </Modal.Body>
          </Modal>
      );
    };
    

    const LuggageCard = ({ luggage, onDelete, reloadPage }) => {
      const [editMode, setEditMode] = useState(false);
      const [formData, setFormData] = useState({
        ownerName: luggage.ownerName,
        receverName: luggage.receverName,
        ownerPhone: luggage.ownerPhone,
        receverPhone: luggage.receverPhone,
        ownerEmail: luggage.ownerEmail,
        busNum1: luggage.busNum1,
        dptTime: luggage.dptTime,
        startLoc: luggage.startLoc,
        placeOfDelivery: luggage.placeOfDelivery,
        arivalTime: luggage.arivalTime,
        weight: luggage.weight,
        contents: luggage.contents
      });
      const [showQR, setShowQR] = useState(false);
      const [qrData, setQRData] = useState('');

      const generateQRCode = () => {
        const data = `
        Luggage ID : ${luggage.luggageID}
        Sender Name : ${luggage.ownerName}
        Phone Number : ${luggage.ownerPhone}
        Email : ${luggage.ownerEmail}
        Bus Number : ${luggage.busNum1}
        Departure Time : ${luggage.dptTime}
        Starting Location : ${luggage.startLoc}
        Ending Location : ${luggage.placeOfDelivery}
        Arrival Time : ${luggage.arivalTime}
        Weight : ${luggage.weight} kg
        Contents : ${luggage.contents}
        Delivery Fee : Rs.${price}.00`;
      
        setQRData(data);
        setShowQR(true);
      };

      const closeQRCode = () => {
        setShowQR(false);
      };

      const handleUpdate = async () => {
        try {
          await axios.put(`http://localhost:3000/api/luggages/${luggage._id}`, formData);
          console.log(`Luggage with ID ${luggage._id} updated successfully`);
          setEditMode(false); // Exit edit mode after successful update
          window.location.reload(); // Reload the page after update
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:3000/api/luggages/${luggage._id}`);
          onDelete(); // Call the onDelete function passed from the parent component to update the UI
          console.log(`Luggage with ID ${luggage._id} deleted successfully`);
          navigateBack(); // Navigate back to LuggageCard component after deletion
        } catch (error) {
          console.error('Error:', error);
        }
        window.location.reload();
      };
      

      const navigateBack = () => {
        // Reload the page
        window.location.reload();
      };
      

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const price = 500 + luggage.weight * 50; // Calculate price based on weight

      return (
        <div className="luggage-card" style={{ 
          border: '1px solid #ccc', 
          borderRadius: '5px', 
          padding: '20px', 
          margin: '20px', 
          maxWidth: '400px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
        }}>
          <h2 style={{ 
    marginBottom: '20px',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontWeight: 'bold',
    fontFamily: 'Courier, monospace' // Example font family
  }}>
    Luggage Details
  </h2>

  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div style={{ width: '75%' }}>
          <p><span style={{ fontWeight: 'bold' }}>Sender Name</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Receiver Name</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Sender Phone Number</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Receiver Phone Number</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Bus Number</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Departure Time</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Starting Location</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Ending Location</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Arival Time</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Weight</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Contents</span></p>
        </div>
        <div style={{ width: '3%' }}>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
          <p><span style={{ fontWeight: 'bold' }}>:</span></p>
        </div>
        <div style={{ width: '35%' }}>
          <p>{luggage.ownerName}</p>
          <p>{luggage.receverName}</p>
          <p>{luggage.ownerPhone}</p>
          <p>{luggage.receverPhone}</p>
          <p>{luggage.busNum1}</p>
          <p>{luggage.dptTime}</p>
          <p>{luggage.startLoc}</p>
          <p>{luggage.placeOfDelivery}</p>
          <p>{luggage.arivalTime}</p>
          <p>{luggage.weight} kg</p>
          <p>{luggage.contents}</p>
        </div>
      </div>
          <p>____________________________________________</p>
          {editMode ? (
            <Form>
            </Form>
          ) : (
            <>
              <p style={{ fontWeight: 'bold', color: 'darkblue' }}>Delivery Fee: Rs. {price}</p>

              <div className="button-container">
              <button 
      className="btn" 
      style={{
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginRight: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
      onClick={generateQRCode}
    >
      View QR Code
    </button>

                <br /><br />
                <Button variant="primary" onClick={() => setEditMode(true)}>Edit</Button>
                <br /><br />
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
              </div>
            </>
          )}
          {showQR && (
            <div className="qr-code-container" style={{ 
              textAlign: 'center', 
              margin: '20px 0', 
              padding: '20px', 
              backgroundColor: '#f0f0f0', 
              borderRadius: '5px', 
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
            }}>
              <QRCode value={qrData}style={{
      display: 'block',
      margin: '0 auto' // Centering the QR code horizontally
    }} />
              <br></br>
              <button 
    className="btn" 
    style={{
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      cursor: 'pointer',
      margin: '0 auto', // Centering the button horizontally
      display: 'block', // Ensure button takes full width
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}
    onClick={closeQRCode}
  >
    Close QR Code
  </button>

    <br></br>

              <DownloadLink
                label="Download QR Code"
                filename={`QR_Code_${luggage.luggageID}.png`}
                exportFile={() => qrData}
              />
            </div>
          )}
          <EditFormPopup
            show={editMode}
            handleClose={() => setEditMode(false)}
            formData={formData}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />
          <style jsx>{`
  .update-form-buttons {
    display: flex;
    margin-top: 20px;
  }
  
  .update-form-buttons button {
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .update-form-buttons button:first-child {
    background-color: #6c757d; /* Bootstrap's secondary color */
    color: #fff;
    border: none;
    margin-right: 10px;
  }
  
  .update-form-buttons button:last-child {
    background-color: #007bff; /* Bootstrap's primary color */
    color: #fff;
    border: none;
  }
`}</style>
        </div>
      );
    };

    export default LuggageCard;
