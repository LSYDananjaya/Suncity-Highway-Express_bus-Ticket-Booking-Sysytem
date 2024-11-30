import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusCard from './BusCard';
//import './BusList.css'; // Make sure to import the CSS file for styling

const BusList = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/busses/")
      .then((res) => {
        setBuses(res.data);
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  const downloadReport = () => {
    // Generate the report content for all buses
    const reportContent = buses.map(bus => (
      `Bus Number: ${bus.busNumber}, Number of Seats: ${bus.numberOfSeats}, Manufacture Year: ${bus.manufactureYear}`
    )).join('\n');

    // Create a blob with the report content
    const blob = new Blob([reportContent], { type: 'text/plain' });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element and click it to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'bus_report.txt');
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="Show_BusList">
      <div className="container">
        <button className="btn btn-primary" onClick={downloadReport}>Download Report</button>
        <div className="list">
          {buses.length === 0 ? (
            <div>No buses found!</div>
          ) : (
            buses.map((bus, index) => (
              <BusCard key={index} bus={bus} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BusList;
