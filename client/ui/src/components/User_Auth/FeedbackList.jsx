import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FeedbackCards from './FeedbackCards';
import axios from 'axios';
import searchIcon from './icons/search-icon.svg';
import filterIcon from './icons/filter-icon.svg';
import downloadIcon from './icons/download-icon.svg';
import jsPDF from 'jspdf';

function FeedbackList() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [headingText, setHeadingText] = useState('Feedbacks');
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        handleViewFeedbacks();
    }, []);

    const handleViewFeedbacks = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/reviews");
            const feedbackData = response.data;

            setFeedbackData(feedbackData);
            setFilteredUsers(feedbackData);
            setSelectedOption('viewFeedbacks');
        } catch (error) {
            console.error("Error fetching feedback data:", error);
        }
    };

    const handleFeedbackFilterChange = (selectedOption) => {
        let sortedFeedbacks = [...feedbackData];

        switch (selectedOption) {
            case "highestRated":
                sortedFeedbacks.sort((a, b) => b.rating - a.rating);
                break;
            case "lowestRated":
                sortedFeedbacks.sort((a, b) => a.rating - b.rating);
                break;
            case "newest":
                sortedFeedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "oldest":
                sortedFeedbacks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            default:
                break;
        }

        setFilteredUsers(sortedFeedbacks);
        setSelectedOption(selectedOption);
        setHeadingText('Feedbacks');
    };

    const handleFeedbackSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredFeedbacks = feedbackData.filter(feedback => feedback.title.toLowerCase().includes(query) || feedback.type.toLowerCase().includes(query));

        setFilteredUsers(filteredFeedbacks);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        let yOffset = 10;
        const lineHeight = 10;

        const filename = `feedback_report.pdf`;
        const headerText = `Feedback Report:\n\n`;

        doc.text(headerText, 10, yOffset);

        const headerHeight = doc.getTextDimensions(headerText).h;

        if (headerHeight + lineHeight * 5 > doc.internal.pageSize.height) {
            doc.addPage();
            yOffset = 10;
        }

        filteredUsers.forEach((feedback, index) => {
            const feedbackData = `\n\nTitle: ${feedback.title}\nContent: ${feedback.content}\nRating: ${feedback.rating}\n`;

            if (yOffset + lineHeight * 5 > doc.internal.pageSize.height) {
                doc.addPage();
                yOffset = 10;
                doc.text(headerText, 10, yOffset);
            }

            doc.text(feedbackData, 10, yOffset);
            yOffset += lineHeight * 5;
        });

        doc.save(filename);
    };

    return (
        <>
            <div className="icon-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: '#343a40', borderRadius: '8px', border: '1px solid #ccc' }}>
                <div className="search-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={searchIcon} alt="Search" className="icon" style={{ width: '24px', height: '24px' }} />
                    <input type="text" placeholder={selectedOption === 'manageUsers' ? "Search Users" : "Search Feedbacks"} value={searchQuery} onChange={handleFeedbackSearchChange} style={{ border: 'none', outline: 'none', background: 'transparent', color: '#fff', fontSize: '16px', marginLeft: '10px', padding: '5px' }} />
                </div>
                <div className="filter-container" style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                    <img src={filterIcon} alt="Filter" className="icon" style={{ width: '24px', height: '24px' }} />
                    <select
                        value={selectedOption}
                        onChange={(event) => handleFeedbackFilterChange(event.target.value)} // Pass selected option
                        style={{
                            border: 'none',
                            outline: 'none',
                            background: '#343a40',
                            color: '#fff',
                            fontSize: '16px',
                            marginLeft: '10px',
                            cursor: 'pointer',
                            padding: '5px'
                        }}
                    >
                        <option value="highestRated">Highest Rated</option>
                        <option value="lowestRated">Lowest Rated</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                <button onClick={handleDownloadPDF} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }}>
                    <img src={downloadIcon} alt="Download PDF" className="icon" style={{ width: '24px', height: '24px' }} />
                    <span style={{ color: '#fff', marginLeft: '5px' }}>Download Feedback Report PDF</span>
                </button>
            </div>
            <h3 style={{ fontFamily: 'Impact', textAlign: 'center', margin: '20px 0', color: 'white' }}>{headingText}</h3>
            <Container fluid>
                <Row>
                    {filteredUsers.map((feedback, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <FeedbackCards feedbackcard={feedback} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <hr style={{ backgroundColor: 'white', margin: '30px auto', width: '90%' }} />
        </>
    );
}

export default FeedbackList;
