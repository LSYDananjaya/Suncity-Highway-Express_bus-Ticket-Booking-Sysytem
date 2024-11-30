import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LuggageCard from './LuggageCard';
import { Button } from 'react-bootstrap';

const LuggageList = () => {
  const [luggages, setLuggages] = useState([]);
  const [filteredLuggages, setFilteredLuggages] = useState([]);
  const [startLocationFilter, setStartLocationFilter] = useState('');
  const [placeOfDeliveryFilter, setPlaceOfDeliveryFilter] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3000/api/luggages")
      .then((res) => {
        setLuggages(res.data);
        setFilteredLuggages(res.data); // Set filtered luggages initially to all luggages
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  const handleFilter = () => {
    // Filter luggages based on start location and place of delivery
    const filtered = luggages.filter(luggage => {
      return (
        luggage.startLoc.toLowerCase().includes(startLocationFilter.toLowerCase()) &&
        luggage.placeOfDelivery.toLowerCase().includes(placeOfDeliveryFilter.toLowerCase())
      );
    });
    setFilteredLuggages(filtered);
  };

  const handleDownloadReport = () => {
    // Convert filtered luggages into a downloadable format (e.g., CSV or PDF)
    // For simplicity, let's assume we're downloading a CSV file
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Sender Name,Receiver Name,Sender Phone,Receiver Phone,Starting Location,Place of Delivery,Weight,Contents\n" +
      filteredLuggages.map(luggage => 
        `${luggage.ownerName},${luggage.receverName},${luggage.ownerPhone},${luggage.receverPhone},${luggage.startLoc},${luggage.placeOfDelivery},${luggage.weight},${luggage.contents}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "luggage_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="showLuggageList">
      <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Start Location"
            value={startLocationFilter}
            onChange={(e) => setStartLocationFilter(e.target.value)}
            style={{ marginTop: '5px', marginRight: '10px', padding: '5px', borderRadius: ' 0px' }}
          />
           <input
            type="text"
            placeholder="Place of Delivery"
            value={placeOfDeliveryFilter}
            onChange={(e) => setPlaceOfDeliveryFilter(e.target.value)}
            style={{ marginTop: '5px', marginRight: '10px', padding: '5px', borderRadius: '0px'}}
          />
          <Button
            variant="primary"
            onClick={handleFilter}
            style={{ marginTop: '5px', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Filter
          </Button>
          <Button
            variant="success"
            onClick={handleDownloadReport}
            style={{ marginTop: '5px', marginLeft: '10px', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Download Report
          </Button>
        </div>
        <div className="list">
        {filteredLuggages.length === 0 ? 
            <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#000000' }}>No luggages found !!</p> : 
            filteredLuggages.map((luggage, index) =>
              (<LuggageCard key={index} luggage={luggage} />)
            )
          }
        </div>
      </div>
    </div>
  );
};

export default LuggageList;
