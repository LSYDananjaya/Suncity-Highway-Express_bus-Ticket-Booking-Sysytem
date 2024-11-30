import React from 'react';

const FeedbackCards = ({ feedbackcard }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: '18rem' }}>
      <img src="https://www.shutterstock.com/image-photo/customer-experience-concept-woman-hand-600nw-1576875433.jpg" className="card-img-top" alt="Feedback" />
      <div className="card-body">
        <h5 className="card-title">{feedbackcard.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{feedbackcard.type}</h6>
        <p className="card-text">Category: {feedbackcard.category}</p>
        <p className="card-text">Feedback: {feedbackcard.rating}</p>
        <p className="card-text">{feedbackcard.content}</p>
    
        <p className="card-text">Bus Number: {feedbackcard.busNum}</p>
       
      </div>
    </div>
  );
};

export default FeedbackCards;
