import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const PackageCard = ({ packageInfo, onUpdate, onDelete }) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({
        packageID: packageInfo.packageID,
        name: packageInfo.name,
        price: packageInfo.price,
        description: packageInfo.description,
        type: packageInfo.type,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name !== "packageID") { // Exclude packageID from being updated
            setUpdateFormData({
                ...updateFormData,
                [name]: value,
            });
        }
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:3000/api/packages/${packageInfo._id}`, updateFormData)
            .then(() => {
                setShowUpdateForm(false);
                onUpdate(); // Notify parent component to update package list
            })
            .catch(error => console.error("Error:", error));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            axios.delete(`http://localhost:3000/api/packages/${packageInfo._id}`)
                .then(() => {
                    onDelete(packageInfo._id); // Notify parent component to remove package
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div className="package-card" style={{ backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '10px', padding: '20px', marginBottom: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s' }}>
            <div className="card-content">
                <h2 className="card-title">{packageInfo.name}</h2>
                <p className="card-type">Type: {packageInfo.type}</p>
                <p className="card-id">ID: {packageInfo.packageID}</p>
                <p className="card-description">Description: {packageInfo.description}</p>
                <p className="card-price">Price: ${packageInfo.price}</p>
                <div className="button-container">
                    <button className="btn btn-info" onClick={() => setShowUpdateForm(true)}>Update</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>

            {showUpdateForm && (
                <div className="update-form" style={{ marginTop: '20px' }}>
                    <h3>Update Package</h3>
                    <label>Package ID:</label>
                    <input type="text" name="packageID" value={updateFormData.packageID} readOnly className="form-control" />
                    <label>Name:</label>
                    <input type="text" name="name" value={updateFormData.name} onChange={handleChange} className="form-control" />
                    <label>Type:</label>
                    <input type="text" name="type" value={updateFormData.type} onChange={handleChange} className="form-control" />
                    <label>Description:</label>
                    <input type="text" name="description" value={updateFormData.description} onChange={handleChange} className="form-control" />
                    <label>Price:</label>
                    <input type="number" name="price" value={updateFormData.price} onChange={handleChange} className="form-control" />
                    <div className="button-container">
                        <button className="btn btn-primary" onClick={handleUpdate}>Submit</button>
                        <button className="btn btn-secondary" onClick={() => setShowUpdateForm(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const PackageList = () => {
    const [packages, setPackages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get("http://localhost:3000/api/packages")
            .then(response => {
                setPackages(response.data);
            })
            .catch(error => console.error("Error:", error));
    }, []);

    const handleUpdate = () => {
        axios.get("http://localhost:3000/api/packages")
            .then(response => {
                setPackages(response.data);
            })
            .catch(error => console.error("Error:", error));
    };

    const handleDelete = (deletedPackageId) => {
        setPackages(packages.filter(pkg => pkg._id !== deletedPackageId));
    };

    const handleDownloadPDF = () => {
        const pdf = new jsPDF();
        let y = 10;
        packages.forEach(pkg => {
            pdf.text(10, y, `\n\nName: ${pkg.name}`);
            pdf.text(10, y + 10, `Type: ${pkg.type}`);
            pdf.text(10, y + 20, `Description: ${pkg.description}`);
            pdf.text(10, y + 30, `Price: ${pkg.price}`);
            y += 40;
        });
        pdf.save(`All packages.pdf`);
    };

    const filteredPackages = packages.filter(pkg =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="package-list">
            <h1>Package List</h1>
            <input
                className="form-control"
                type="text"
                placeholder="Search by name or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filteredPackages.map((pkg, index) => (
                <PackageCard
                    key={pkg._id}
                    packageInfo={pkg}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    style={{ marginBottom: '20px', boxShadow: index % 2 === 0 ? '0px 0px 10px rgba(0, 0, 0, 0.1)' : '0px 0px 10px rgba(0, 0, 0, 0.2)' }}
                />
            ))}

            <button className="btn btn-primary" onClick={handleDownloadPDF}>
                Download PDF
            </button>
        </div>
    );
};

export default PackageList;
