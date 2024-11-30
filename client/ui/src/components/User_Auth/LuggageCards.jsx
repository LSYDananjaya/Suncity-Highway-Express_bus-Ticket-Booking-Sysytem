import React from 'react';

const LuggageCards = ({ luggagecard }) => {
  return (
    <div className="luggage-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '20px', backgroundColor: 'white' }}>
      <h2>Luggage Details</h2>
      <p>Sender Name           : {luggagecard.ownerName}</p>
      <p>Recever Name          : {luggagecard.receverName}</p>
      <p>Sender Phone Number   : {luggagecard.ownerPhone}</p>
      <p>Recever Phone Number : {luggagecard.receverPhone} </p>
      <p>Starting Location     : {luggagecard.startLoc}</p>
      <p>Ending Location       : {luggagecard.placeOfDelivery}</p>
      <p>Contents              : {luggagecard.contents}</p>
      
    </div>
  );
};

export default LuggageCards;
