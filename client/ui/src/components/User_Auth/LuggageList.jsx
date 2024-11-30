import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LuggageCards from './LuggageCards';
import axios from 'axios';
import searchIcon from './icons/search-icon.svg';
import downloadIcon from './icons/download-icon.svg';
import jsPDF from 'jspdf';

function LuggageList() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [filteredLuggages, setFilteredLuggages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [headingText, setHeadingText] = useState('Luggage Details');
    const [luggageData, setLuggageData] = useState([]);

    useEffect(() => {
        handleViewLuggages();
    }, []);

    const handleViewLuggages = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/luggages");
            const luggageData = response.data;

            setLuggageData(luggageData);
            setFilteredLuggages(luggageData);
            setSelectedOption('viewLuggages');
        } catch (error) {
            console.error("Error fetching luggage data:", error);
        }
    };

    const handleLuggageSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredLuggages = luggageData.filter(luggage => luggage.ownerName.toLowerCase().includes(query) || luggage.receverName.toLowerCase().includes(query));

        setFilteredLuggages(filteredLuggages);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        let yOffset = 10;
        const lineHeight = 10;

        const filename = `luggage_report.pdf`;
        const headerText = `Luggage Report:\n\n`;

        doc.text(headerText, 10, yOffset);

        const headerHeight = doc.getTextDimensions(headerText).h;

        if (headerHeight + lineHeight * 5 > doc.internal.pageSize.height) {
            doc.addPage();
            yOffset = 10;
        }

        filteredLuggages.forEach((luggage, index) => {
            const luggageData = `\n\nOwner Name: ${luggage.ownerName}\nReceiver Name: ${luggage.receverName}\nOwner Phone: ${luggage.ownerPhone}\nReceiver Phone: ${luggage.receverPhone}\nPlace of Delivery: ${luggage.placeOfDelivery}\nWeight: ${luggage.weight}\nHeight: ${luggage.height}\nLength: ${luggage.length}\nWidth: ${luggage.width}\nContents: ${luggage.contents}\n`;

            if (yOffset + lineHeight * 5 > doc.internal.pageSize.height) {
                doc.addPage();
                yOffset = 10;
                doc.text(headerText, 10, yOffset);
            }

            doc.text(luggageData, 10, yOffset);
            yOffset += lineHeight * 5;
        });

        doc.save(filename);
    };

    return (
        <>
            <div className="icon-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: '#343a40', borderRadius: '8px', border: '1px solid #ccc' }}>
                <div className="search-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={searchIcon} alt="Search" className="icon" style={{ width: '24px', height: '24px' }} />
                    <input type="text" placeholder="Search Luggages" value={searchQuery} onChange={handleLuggageSearchChange} style={{ border: 'none', outline: 'none', background: 'transparent', color: '#fff', fontSize: '16px', marginLeft: '10px', padding: '5px' }} />
                </div>
                <button onClick={handleDownloadPDF} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }}>
                    <img src={downloadIcon} alt="Download PDF" className="icon" style={{ width: '24px', height: '24px' }} />
                    <span style={{ color: '#fff', marginLeft: '5px' }}>Download Luggage Report PDF</span>
                </button>
            </div>
            
                <>
                    <h2 style={{ fontFamily: 'Impact', textAlign: 'center', margin: '20px 0', color: 'white' }}>Luggage Details</h2>
                    <Container fluid>
                        <Row>
                            {filteredLuggages.map((luggage, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                                    <LuggageCards luggagecard={luggage} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <hr style={{ backgroundColor: 'white', margin: '30px auto', width: '90%' }} />
                </>
            
        </>
    );
}

export default LuggageList;
