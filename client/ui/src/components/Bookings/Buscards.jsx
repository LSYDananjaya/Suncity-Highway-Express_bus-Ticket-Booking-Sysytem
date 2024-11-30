// BusTicketCard.jsx
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import React from 'react';



const BusCards = ({buscard,id}) => {
  const navigate = useNavigate();
  return (
    
    <div className="card mb-3" style={{ width: '250px',height:'250px', background: '#697a8a', border: '1px solid #697a8a', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
    <div className="row g-0">
      <div className="col-md-10">
        <div className="card-body">
          <h5  style={{color:'#fff'}} >{buscard.startLocation} - {buscard.endLocation}</h5>
          
          <h6 className="card-text"  style={{color:'#fff'}}>Time : {buscard.dtime}</h6>
          <p className="card-text"  style={{color:'#fff'}}>Bus Number : {buscard.number}</p>
          <div className="d-flex justify-content-between align-items-center">
          <br/><br/><br/><br/><br/><br/><br/>
          <a onClick={() =>  navigate(`./form/${buscard._id}`)}
              className="btn btn-primary" style={{ margin: '20px'}}>
                Book a seat
                </a>

             </div>
        </div>
      </div>
    </div>
  </div>

  );
};


export default BusCards;
