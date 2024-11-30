import React, { useState, useEffect } from 'react';
import axios from "axios";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Reservations from './Reservations';
import "./Reservationlist.css";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

const Reservationlist = () => {
  const [reservations, setRes] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startLocations, setStartLocations] = useState([]);
  const [endLocations, setEndLocations] = useState([]);
  const [date, setDate] = useState('');
  const [dates, setDates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/books")
      .then((res) => {
        setRes(res.data);
        const uniqueStartLocations = [...new Set(res.data.map(item => item.startLocation))];
        const uniqueEndLocations = [...new Set(res.data.map(item => item.endLocation))];
        const uniqueDates = [...new Set(res.data.map(item => item.date))];
        setStartLocations(uniqueStartLocations);
        setEndLocations(uniqueEndLocations);
        setDates(uniqueDates);
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  useEffect(() => {
    const filtered = reservations.filter(reservation => {
      return reservation.startLocation.toLowerCase().includes(startLocation.toLowerCase()) &&
             reservation.endLocation.toLowerCase().includes(endLocation.toLowerCase()) 
             
    });
    setFilteredReservations(filtered);
  }, [reservations, startLocation, endLocation]);

  const handleStartLocationChange = (e) => {
    setStartLocation(e.target.value);
  };

  const handleEndLocationChange = (e) => {
    setEndLocation(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const reslist = filteredReservations.length === 0
    ? "No reservations found !!!"
    : filteredReservations.map((reservation, index) => (
      <Reservations key={index} reservation={reservation} id={reservation._id} />
    ));

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>My Reservations</Text>
        <View>
          {filteredReservations.map((reservation, index) => (
            <View key={index}>
              <Text>{reservation.startLocation}-{reservation.endLocation}</Text>
              <Text>{reservation.seats} Seats</Text>
              <Text>Date: {reservation.date}</Text>
              <Text>Time: {reservation.time}</Text>
              <Text>Selected Seats: {reservation.SelectedSeats.join(', ')} </Text>
              <Text>   </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="Show_Reservationlist">
      <div className="container">
        <h1>My Reservations</h1>
        <br />
        <div className="list">{reslist}</div>
        <br />
        <div className="location-selectors">
  <div className="location-selector">
    <label htmlFor="startLocation">Start Location : </label>
    <select id="startLocation" value={startLocation} onChange={handleStartLocationChange}>
      <option value="">All Locations</option>
      {startLocations.map((location, index) => (
        <option key={index} value={location}>{location}</option>
      ))}
    </select>
     
    <label htmlFor="endLocation">End Location : </label>
    <select id="endLocation" value={endLocation} onChange={handleEndLocationChange}>
      <option value="">All Locations</option>
      {endLocations.map((location, index) => (
        <option key={index} value={location}>{location}</option>
      ))}
    </select>

  </div>
</div>

        <br />
        <PDFDownloadLink document={<MyDocument />} fileName="reservations.pdf"
          style={{
            textDecoration: 'none',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#ffffff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
          }}
          className="download-pdf-btn">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
        <br/><br/>
        
      </div>
    </div>
  );
};

export default Reservationlist;
