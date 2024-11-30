import React, { useState , useEffect} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ScheduleForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        startLocation: '',
        endLocation: '',
        dtime: '',
        atime: '',
        number: '',
        profile: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const errors = {};
        if (!formData.startLocation) {
            errors.startLocation = "Starting location is required";
        }
        if (!formData.endLocation) {
            errors.endLocation = "End location is required";
        }
        if (!formData.dtime) {
            errors.dtime = "Departure time is required";
        }
        if (!formData.atime) {
            errors.atime = "Arrival time is required";
        }
        if (!formData.number) {
            errors.number = "Bus number is required";
        }
        if (!formData.profile) {
            errors.profile = "Profile is required";
        }

        if (Object.keys(errors).length === 0) {
            axios.post("http://localhost:3000/api/sheduleRoutes", formData)
                .then(() => {
                    alert ("Schedule added successfully");
                    setFormData({
                        startLocation: '',
                        endLocation: '',
                        dtime: '',
                        atime: '',
                        number: '',
                        profile: '',
                    });
                    navigate("/ViewSchedule");
                })
                .catch(error => {
                    console.error("Error adding schedule:", error);
                    // Optionally, you can show an error message to the user
                });
        } else {
            setErrors(errors);
        }
    };

    const [busnum, setbusnum] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/busses')
          .then(response => {
            setbusnum(response.data);
          })
          .catch(error => {
            console.error('Error fetching packages:', error);
          });
      }, []);

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card p-4" style={{ maxWidth: '400px', fontFamily: 'Arial, sans-serif' }}>
                <h2 className="text-center mb-4" style={{ color: '#333' }}>Bus Schedule Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="startLocation" className="form-label">Starting Location:</label>
                        <select name="startLocation" id="startLocation" value={formData.startLocation} onChange={handleChange} className="form-select">
                            <option value="">Select starting location</option>
                            <option value="Matara">Matara</option>
                            <option value="Kottawa">Kottawa</option>
                            <option value="Maharagama">Maharagama</option>
                            <option value="Fort">Fort</option>
                        </select>
                        {errors.startLocation && <p className="text-danger">{errors.startLocation}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="endLocation" className="form-label">End Location:</label>
                        <select name="endLocation" id="endLocation" value={formData.endLocation} onChange={handleChange} className="form-select">
                            <option value="">Select end location</option>
                            <option value="Matara">Matara</option>
                            <option value="Kottawa">Kottawa</option>
                            <option value="Maharagama">Maharagama</option>
                            <option value="Fort">Fort</option>
                        </select>
                        {errors.endLocation && <p className="text-danger">{errors.endLocation}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dtime" className="form-label">Departure Time:</label>
                        <input type="time" id="dtime" name="dtime" value={formData.dtime} onChange={handleChange} className="form-control" />
                        {errors.dtime && <p className="text-danger">{errors.dtime}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="atime" className="form-label">Arrival Time:</label>
                        <input type="time" id="atime" name="atime" value={formData.atime} onChange={handleChange} className="form-control" />
                        {errors.atime && <p className="text-danger">{errors.atime}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="number" className="form-label">Bus number</label>
                        <select name="number" id="number" value={formData.number} onChange={handleChange} className="form-select">
                            <option value="">Select bus number</option>
                            {busnum.map(sloc => (
                                <option key={sloc.id} value={sloc.busNumber}>{sloc.busNumber}</option>
                            ))}
                        </select>
                        {errors.number && <p className="text-danger">{errors.number}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="profile" className="form-label">Profile Picture:</label>
                        <input type="file" id="profile" name="profile" onChange={handleChange} className="form-control" />
                        {errors.profile && <p className="text-danger">{errors.profile}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ScheduleForm;
