import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './App.css';
import jsPDF from 'jspdf'; // Importing jsPDF library

const FinancialReport = () => {
  const [reportData, setReportData] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [busNo, setBusNo] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amountCollected, setAmountCollected] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    const fetchFinancialReport = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/ReportRoutes');
        setReportData(response.data);
        setFilteredReports(response.data); // Set filtered reports initially
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFinancialReport();
  }, []);

  const handleUpdate = (report) => {
    setSelectedReport(report);
    setShowUpdateModal(true);
  };

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`http://localhost:3000/api/ReportRoutes/${reportId}`);
      const updatedReports = reportData.filter(report => report._id !== reportId);
      setReportData(updatedReports);
      setFilteredReports(updatedReports); // Update filtered reports after deletion
      console.log(`Report with ID ${reportId} deleted successfully`);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/ReportRoutes/${selectedReport._id}`, selectedReport);
      setShowUpdateModal(false);
      console.log(`Report with ID ${selectedReport._id} updated successfully`);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;
    const lineHeight = 10;

    const filename = `financial_report.pdf`;
    const headerText = `Financial Report:\n\n`;

    doc.text(headerText, 10, yOffset);

    const headerHeight = doc.getTextDimensions(headerText).h;

    if (headerHeight + lineHeight * 5 > doc.internal.pageSize.height) {
      doc.addPage();
      yOffset = 10;
    }

    filteredReports.forEach((report, index) => {
      const reportData = `Bus Number: ${report.busNo}\nDate: ${report.date}\nDescription: ${report.description}\nAmount Collected: ${report.amountCollected}\n`;

      if (yOffset + lineHeight * 5 > doc.internal.pageSize.height) {
        doc.addPage();
        yOffset = 10;
        doc.text(headerText, 10, yOffset);
      }

      doc.text(reportData, 10, yOffset);
      yOffset += lineHeight * 5;
    });

    doc.save(filename);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/ReportRoutes', {
        busNo,
        date,
        description,
        amountCollected
      });
      alert('Report generated successfully.');
      // Clear form fields after successful submission
      setBusNo('');
      setDate('');
      setDescription('');
      setAmountCollected('');
    } catch (error) {
      alert('Failed to generate report.');
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setShowUpdateModal(false);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredReports = reportData.filter(report =>
      report.busNo.toLowerCase().includes(query) ||
      report.date.toLowerCase().includes(query) ||
      report.description.toLowerCase().includes(query)
    );

    setFilteredReports(filteredReports);
  };

  return (
    <>
      <div className="grid-container">
        <div className="container mt-5">
          <h2>Financial Report</h2>
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between">
                <div>
                  <Button variant="primary" onClick={handleDownloadPDF}>
                    Download All Reports as PDF
                  </Button>
                </div>
                <div>
                  <Form.Control type="text" placeholder="Search by bus number, date, or description" value={searchQuery} onChange={handleSearchChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Report {index + 1}</h5>
                      <p className="card-text">Bus Number: {report.busNo}</p>
                      <p className="card-text">Date: {report.date}</p>
                      <p className="card-text">Description: {report.description}</p>
                      <p className="card-text">Amount Collected: {report.amountCollected}</p>
                      <button className="btn btn-primary me-2" onClick={() => handleUpdate(report)}>Update</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(report._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-md-12">
                <p>No reports found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={showUpdateModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Update Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formBusNo">
  <Form.Label>Bus Number</Form.Label>
  <Form.Control type="text" placeholder="Enter bus number" value={selectedReport?.busNo || ''} onChange={(e) => setSelectedReport({...selectedReport, busNo: e.target.value})} disabled />
</Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={selectedReport?.date || ''} onChange={(e) => setSelectedReport({...selectedReport, date: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={selectedReport?.description || ''} onChange={(e) => setSelectedReport({...selectedReport, description: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="formAmountCollected">
              <Form.Label>Amount Collected</Form.Label>
              <Form.Control type="text" placeholder="Enter amount collected" value={selectedReport?.amountCollected || ''} onChange={(e) => setSelectedReport({...selectedReport, amountCollected: e.target.value})} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FinancialReport;
