import React, { useState , useEffect } from 'react';
//import './MyForm.css'; // Import CSS file for styling
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const MyForm = () => {
    const [preBookedSeats, setPreBookedSeats] = useState([]); // Tracks seats that came from the database

    const [formData, setFormData] = useState({
        startLocation: '',
        endLocation: '',
        time: '',
        seats: '',
        package:'',
        SelectedSeats:[],
        date:'',
        
    });
    
    const {id}  = useParams();
    const [seats, setSeats] = useState(Array.from({ length: 54 }, (_, index) => ({ id: index + 1, isBooked: false })));
    const [pricePerSeat] = useState(1000); // Assuming the price per seat is 1000

    useEffect(() => {
        axios.get(`http://localhost:3000/api/sheduleRoutes/${id}`)
            .then(res => {
                const routeData = res.data;
                setFormData(prev => ({
                    ...prev,
                    startLocation: routeData.startLocation || '',
                    endLocation: routeData.endLocation || '',
                    time: routeData.dtime || '',
                    seats: routeData.seats || '',
                    package: routeData.package || '',
                    SelectedSeats: routeData.SelectedSeats || [],
                    date: routeData.date || '',

                }));
    
                // Set pre-booked seats
                setPreBookedSeats(routeData.SelectedSeats || []);
                // Set seats data
                setSeats(Array.from({ length: 54 }, (_, index) => ({
                    id: index + 1,
                    isBooked: routeData.SelectedSeats ? routeData.SelectedSeats.includes(index + 1) : false
                })));
            })
            .catch(error => {
                console.error("Error while getting data", error);
            });
    }, [id]);
    

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
       
      // Calculate newly selected seats
      const newSelectedSeats = formData.SelectedSeats.filter(seat => !preBookedSeats.includes(seat));

      // Prepare data to be posted to the database
     
       // Prepare data to be posted to the database
    const postData = {
        startLocation: formData.startLocation,
        endLocation: formData.endLocation,
        time: formData.time,
        seats: newSelectedSeats.length, // Update the number of seats
        package: formData.package,
        SelectedSeats: newSelectedSeats, // Update the selected seats
        date: formData.date,
    };

        axios.post("http://localhost:3000/api/books", postData).then(() => {
            setFormData({
                startLocation: '',
                endLocation: '',
                time: '',
                seats: '',
                package:'',
                SelectedSeats:[],
                date:'',
                
            });
        });

        axios.put("http://localhost:3000/api/sheduleRoutes/"+id, formData).then(() => {
            setFormData({
                
                SelectedSeats:[routeData.SelectedSeats],
                
            });
        });
        navigate('/read');
    };

    
    


    const [packages, setPackages] = useState([]);
    useEffect(() => {
        // Fetch packages from your friend's API or database
        axios.get('http://localhost:3000/api/packages') // Adjust the URL according to your friend's API
          .then(response => {
            setPackages(response.data);
          })
          .catch(error => {
            console.error('Error fetching packages:', error);
          });
      }, []);


      const [startlocs, setstartlocs] = useState([]);
      useEffect(() => {
        // Fetch locks from your friend's API or database
        axios.get('http://localhost:3000/api/sheduleRoutes') // Adjust the URL according to your friend's API
          .then(response => {
            setstartlocs(response.data);
          })
          .catch(error => {
            console.error('Error fetching location:', error);
          });
      }, []);

    
      const handleSeatClick = (id) => {
        const seatIndex = id - 1;
        const updatedSeats = [...seats];
        // Toggle seat selection for non-pre-booked seats
        if (!preBookedSeats.includes(id)) {
            updatedSeats[seatIndex].isBooked = !updatedSeats[seatIndex].isBooked;
            setSeats(updatedSeats);
            // Update form data
            const selectedSeats = updatedSeats.filter(seat => seat.isBooked).map(seat => seat.id);
            setFormData(prev => ({
                ...prev,
                SelectedSeats: selectedSeats.filter(seat => !preBookedSeats.includes(seat)),
                seats: selectedSeats.filter(seat => !preBookedSeats.includes(seat)).length
            }));
        }
    };
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
    
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
    
        return year + '-' + month + '-' + day;
    };
   

    const totalAmount = pricePerSeat * formData.seats;

    return (
        <div className="form-container">
            <h2 className="form-heading">Bus Seat Reservation</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="startLocation" className="form-label">Starting Location:</label>
                <select name="startLocation" id="startLocation" value={formData.startLocation}  onChange={handleChange} className="form-select" required>
                <option value="">Select start location</option>
                          {startlocs.map(sloc => (
                        <option key={sloc.id} value={sloc.startLocation}>{sloc.startLocation}</option>
                              ))}

                </select>

                
                <label htmlFor="endLocation" className="form-label">End Location:</label>
                <select name="endLocation" id="endLocation" value={formData.endLocation}  onChange={handleChange} className="form-select" required>
                    <option value="">Select end location</option>
                    {startlocs.map(sloc => (
                        <option key={sloc.id} value={sloc.endLocation}>{sloc.endLocation}</option>
                              ))}
                </select>

                <label htmlFor="time" className="form-label">Time :</label>
                <select name="time" id="time" value={formData.time}  onChange={handleChange} className="form-select" >
                    <option value="">-Select-</option>
                    {startlocs.map(sloc => (
                        <option key={sloc.id} value={sloc.dtime}>{sloc.dtime}</option>
                              ))}

                    </select>

                <label htmlFor="Date" className="form-label" required>Date:</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="form-input" placeholder="Enter date"  required min={getCurrentDate()}/>

                
                <label htmlFor="package" className="form-label">Package :</label>
                 <select name="package" id="package" value={formData.package} onChange={handleChange} className="form-select" required>
                       <option value="">No package</option>
                          {packages.map(pkg => (
                        <option key={pkg.id} value={pkg.name}>{pkg.name}</option>
                              ))}
              </select>

                <label htmlFor="seats" className="form-label">Number of Seats:</label>
                <input type="number" id="seats" name="seats" min="1" value={formData.seats} onChange={handleChange} className="form-input" placeholder="Enter number of seats" required/>

                <div className="container">
                    
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h3 className="text-center mb-4">Left Side</h3>
                            <div className="row justify-content-center">
                                {seats.slice(0, 30).map(seat => (
                                    <div
                                        key={seat.id}
                                        className={`seat col-3 mb-4 d-flex justify-content-center align-items-center`}
                                        style={{ width: '150px', height: '80px', margin: '8px',fontSize:"20px", textAlign: 'center', color:"#fff",backgroundColor: seat.isBooked ? '#0a0a0a' : '#636161' }} 
                                        onClick={() => handleSeatClick(seat.id)}
                                      
                                    >
                                        {seat.id}
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h3 className="text-center mb-4">Right Side</h3>
                            <div className="row justify-content-center">
                                {seats.slice(30, 50).map(seat => (
                                    <div
                                    key={seat.id}
                                    className={`seat col-3 mb-4 d-flex justify-content-center align-items-center`}
                                    style={{ width: '180px', height: '80px', margin: '8px',fontSize:"20px", textAlign: 'center', color:"#fff",backgroundColor: seat.isBooked ?  '#0a0a0a' : '#636161' }} 
                                    onClick={() => handleSeatClick(seat.id)}
                                  
                                    >
                                        {seat.id}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {seats.slice(50, 54).map(seat => (
                                    <div
                                    key={seat.id}
                                    className={`seat col-3 mb-4 d-flex justify-content-center align-items-center`}
                                    style={{ width: '130px', height: '80px', margin: '8px',fontSize:"20px", textAlign: 'center', color:"#fff",backgroundColor: seat.isBooked ?  '#0a0a0a' : '#636161' }} 
                                    onClick={() => handleSeatClick(seat.id)}
                                  
                                    >
                                        {seat.id}
                                    </div>
                                ))}
                    </div>
                    <input type="hidden" name="SelectedSeats" value={formData.SelectedSeats} onChange={handleChange} required /> 
                </div>
<label className="form-label total-label">Total Price:</label>
<div className="total-price">
    <span className="price-amount">{totalAmount} LKR</span>
</div>
<br/>
                <input type="submit" value="Submit" className="submit-btn" />
            </form>
        </div>
    );
};

export default MyForm;
