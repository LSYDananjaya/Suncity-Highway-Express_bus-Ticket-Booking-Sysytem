import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleItem from './schedule';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ScheduleList = () => {
    const [scheduleItems, setScheduleItems] = useState([]);
    const [filteredScheduleItems, setFilteredScheduleItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/api/sheduleRoutes')
            .then(response => {
                setScheduleItems(response.data);
                setFilteredScheduleItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching schedule items:', error);
            });
    }, []);

    const handleDeleteItem = id => {
        setScheduleItems(scheduleItems.filter(item => item._id !== id));
        setFilteredScheduleItems(filteredScheduleItems.filter(item => item._id !== id));
    };

    const handleSearch = e => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = scheduleItems.filter(item =>
            item.startLocation.toLowerCase().includes(query) ||
            item.endLocation.toLowerCase().includes(query) ||
            item.dtime.toLowerCase().includes(query) ||
            item.atime.toLowerCase().includes(query) ||
            item.number.toLowerCase().includes(query) ||
            (item.profile && item.profile.toLowerCase().includes(query))
        );
        setFilteredScheduleItems(filtered);
    };

    const handleDownloadReport = () => {
        const doc = new jsPDF();
        doc.text('Bus time Schedule Report', 10, 10);

        const columns = ['Start Location', 'End Location', 'Departure Time', 'Arrival Time', 'Bus Number'];
        const data = filteredScheduleItems.map(item => [
            item.startLocation,
            item.endLocation,
            item.dtime,
            item.atime,
            item.number || ''
        ]);

        doc.autoTable({
            head: [columns],
            body: data
        });

        doc.save('schedule_report.pdf');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Schedule List</h2>
            <div className="mb-3 d-flex align-items-center">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button onClick={handleDownloadReport} className="btn btn-primary">Download Report</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Start Location</th>
                        <th>End Location</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Bus Number</th>
                        <th>Profile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredScheduleItems.map(scheduleItem => (
                        <ScheduleItem
                            key={scheduleItem._id}
                            scheduleItem={scheduleItem}
                            onDelete={handleDeleteItem}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleList;
