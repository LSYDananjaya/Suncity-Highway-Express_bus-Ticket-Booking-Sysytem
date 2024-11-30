import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const PaymentForm = () => {
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiryDate: '', cvv: '' });

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to external payment gateway API
      const response = await axios.post('http://externalapi.com/payment', paymentInfo);
      console.log(response.data); // Handle successful payment
    } catch (error) {
      console.error('Error:', error);
      // Handle payment error
    }
  };

  return (
    <div className="container mt-5">
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Card Number</label>
          <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={paymentInfo.cardNumber} onChange={handleChange} />
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
            <input type="text" className="form-control" id="expiryDate" name="expiryDate" value={paymentInfo.expiryDate} onChange={handleChange} />
          </div>
          <div className="col">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input type="text" className="form-control" id="cvv" name="cvv" value={paymentInfo.cvv} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;