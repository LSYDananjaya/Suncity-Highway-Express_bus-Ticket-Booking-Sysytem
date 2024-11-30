import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from './EmployeeCard';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/employees/')
      .then((res) => {
        setEmployees(res.data);
        setFilteredEmployees(res.data); // Initially set filtered employees to all employees
      })
      .catch(() => {
        console.log('Error while getting data');
      });
  }, []);

  const employeesList = filteredEmployees.length === 0 ? 'No employees found!' : (
    filteredEmployees.map((employee, index) => (
      <EmployeeCard key={index} employee={employee} />
    ))
  );

  const downloadReport = () => {
    // Filtered employees to be included in the report
    const reportContent = filteredEmployees.map((employee) => (
      `Name: ${employee.name}, Employee ID: ${employee.employeeID}, Mobile: ${employee.mobile}, Employee Type: ${employee.employeeType}`
    )).join('\n');

    // Create a blob with the report content
    const blob = new Blob([reportContent], { type: 'text/plain' });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element and click it to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'employee_report.txt');
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Filter employees by employeeID
  const filterEmployeesById = (employeeID) => {
    if (employeeID === '') {
      // If the input is empty, reset filtered employees to all employees
      setFilteredEmployees(employees);
    } else {
      // Otherwise, filter employees by employeeID
      const filtered = employees.filter((employee) => employee.employeeID === employeeID);
      setFilteredEmployees(filtered);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="container">
        <input
          type="text"
          placeholder="Filter by Employee ID"
          onChange={(e) => filterEmployeesById(e.target.value)}
          className="form-control mb-3"
        />
        <button className="btn btn-primary me-3" onClick={downloadReport}>Download Report</button>
        <div className="list">{employeesList}</div>
      </div>
    </div>
  );
};

export default EmployeeList;
