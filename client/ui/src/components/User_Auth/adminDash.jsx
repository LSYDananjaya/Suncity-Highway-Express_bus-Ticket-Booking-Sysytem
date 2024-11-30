import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Container,
  Alert,
  Toast,
} from "react-bootstrap";
import axios from "axios";
import jsPDF from "jspdf";
import AdminCard from "./AdminCard";
import UserCard from "./UserCard";
import FeedbackCards from "./FeedbackCards";
import LuggageCards from "./LuggageCards";
import profileIcon from "./icons/profile-icon.svg";
import feedbackIcon from "./icons/feedback-icon.svg";
import addAdminIcon from "./icons/add-admin-icon.svg";
import emailIcon from "./icons/email-icon.svg";
import phoneIcon from "./icons/phone-icon.svg";
import editIcon from "./icons/edit-icon.svg";
import logoutIcon from "./icons/logout-icon.svg";
import deleteIcon from "./icons/delete-icon.svg";
import passIcon from "./icons/password-icon.svg";
import luggageIcon from "./icons/luggage-icon.svg";
import filterIcon from "./icons/filter-icon.svg";
import searchIcon from "./icons/search-icon.svg";
import downloadIcon from "./icons/download-icon.svg";
import FeedbackList from "./FeedbackList";
import LuggageList from "./LuggageList";

function AdminDashboard() {
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [adminRole, setAdminRole] = useState("");
  const [userEntry, setUserEntry] = useState("");
  const [adminUsers, setAdminUsers] = useState([]);
  const [customerUsers, setCustomerUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [headingText, setHeadingText] = useState("Users");
  const [luggagecards, setLuggageCards] = useState([]);

  useEffect(() => {
    handleManageUsers();
  }, []);

  const handleAddAdmin = async () => {
    try {
      // Switch statement to convert admin role to number
      let roleEntry;
      switch (newAdmin.adminRole) {
        case "Financial Admin":
          roleEntry = 1;
          break;
        case "Employee Admin":
          roleEntry = 2;
          break;
        case "Package Admin":
          roleEntry = 3;
          break;
        case "Schedule Admin":
          roleEntry = 4;
          break;
        case "Main Admin":
          roleEntry = 5;
          break;
        case "Customer":
        default:
          roleEntry = 0;
          break;
      }

      const { name, email, phoneNumber, password } = newAdmin;

      const response = await axios.post("http://localhost:3000/api/users", {
        name,
        email,
        mNo: phoneNumber,
        password,
        userEntry: roleEntry,
      });

      console.log(response.data); // Log the response data
      setShowAddAdminModal(false);
      setMessage("Admin added successfully!");
      handleManageUsers();
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add admin");
    }
  };

  const handleManageUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const userData = await response.json();

      const admins = userData.filter((user) =>
        [1, 2, 3, 4, 5].includes(user.userEntry)
      );
      const customers = userData.filter((user) => user.userEntry === 0);

      setAdminUsers(admins);
      setCustomerUsers(customers);
      setSelectedOption("manageUsers");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleViewFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reviews");
      const feedbackData = response.data;

      // Update state or perform other operations with feedback data
      setFilteredUsers(feedbackData);
      setSelectedOption("viewFeedbacks");
      setHeadingText("Feedbacks");
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  const handleViewLuggages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/luggages");
      const luggageData = response.data;

      setLuggageCards(luggageData);
      setSelectedOption("viewLuggages");
      setHeadingText("Luggage Details");
    } catch (error) {
      console.error("Error fetching luggage data:", error);
    }
  };

  const handleLogout = () => {
    console.log("Log Out clicked");
    window.location.href = "/";
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredAdmins = adminUsers.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    const filteredCustomers = customerUsers.filter((user) =>
      user.name.toLowerCase().includes(query)
    );

    setFilteredUsers([...filteredAdmins, ...filteredCustomers]);
  };

  const handleFilterChange = (event) => {
    const roleFilter = event.target.value;
    setAdminRole(roleFilter);

    if (roleFilter === "") {
      setFilteredUsers([...adminUsers, ...customerUsers]);
      setHeadingText("Users");
    } else {
      const filteredAdmins = adminUsers.filter((user) => {
        switch (user.userEntry) {
          case 0:
            return roleFilter === "Customer";
          case 1:
            return roleFilter === "Financial Admin";
          case 2:
            return roleFilter === "Employee Admin";
          case 3:
            return roleFilter === "Package Admin";
          case 4:
            return roleFilter === "Schedule Admin";
          case 5:
            return roleFilter === "Main Admin";
          default:
            return false;
        }
      });
      const filteredCustomers = roleFilter === "Customer" ? customerUsers : [];
      setFilteredUsers([...filteredAdmins, ...filteredCustomers]);
      setHeadingText(
        roleFilter === "Customer" ? "Customers" : roleFilter + "s"
      );
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;
    const lineHeight = 10;

    const filterOption = adminRole ? `${adminRole}s` : "All Users";

    const filename = `filtered_${filterOption}_report.pdf`;
    const headerText = `Filtered ${filterOption} Report:\n\n`;

    doc.text(headerText, 10, yOffset);

    const headerHeight = doc.getTextDimensions(headerText).h;

    if (headerHeight + lineHeight * 5 > doc.internal.pageSize.height) {
      doc.addPage();
      yOffset = 10;
    }

    filteredUsers.forEach((user, index) => {
      let role = "";
      switch (user.userEntry) {
        case 0:
          role = "Customer";
          break;
        case 1:
          role = "Financial Admin";
          break;
        case 2:
          role = "Employee Admin";
          break;
        case 3:
          role = "Package Admin";
          break;
        case 4:
          role = "Schedule Admin";
          break;
        case 5:
          role = "Main Admin";
          break;
        default:
          role = "Unknown";
      }

      const userData = `\n\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.mNo}\nRole: ${role}\n`;

      if (yOffset + lineHeight * 5 > doc.internal.pageSize.height) {
        doc.addPage();
        yOffset = 10;
        doc.text(headerText, 10, yOffset);
      }

      doc.text(userData, 10, yOffset);
      yOffset += lineHeight * 5;
    });

    doc.save(filename);
  };

  return (
    <div className="bg-dark py-5">
      <div className="admin-container">
        <div className="admin-side-panel">
          <h2
            style={{
              fontFamily: "Impact",
              textAlign: "center",
              margin: "20px 0",
              color: "white",
            }}
          >
            Admin Dashboard
          </h2>
          <div
            className={`admin-option ${
              selectedOption === "manageUsers" ? "selected" : ""
            }`}
            onClick={handleManageUsers}
          >
            <img src={profileIcon} alt="Manage Users" className="icon" />
            <p>Manage Users</p>
          </div>
          <div
            className="admin-option"
            onClick={() => setShowAddAdminModal(true)}
          >
            <img src={addAdminIcon} alt="Add Admin" className="icon" />
            <p>Add Admin</p>
          </div>
          <div
            className={`admin-option ${
              selectedOption === "viewFeedbacks" ? "selected" : ""
            }`}
            onClick={handleViewFeedbacks}
          >
            <img src={feedbackIcon} alt="View Feedbacks" className="icon" />
            <p>View Feedbacks</p>
          </div>
          <div
            className={`admin-option ${
              selectedOption === "viewLuggages" ? "selected" : ""
            }`}
            onClick={handleViewLuggages}
          >
            <img src={luggageIcon} alt="View Luggages" className="icon" />
            <p>View Luggages</p>
          </div>
          <div
            className={`admin-option ${
              selectedOption === "logout" ? "selected" : ""
            }`}
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="Log Out" className="icon" />
            <p>Log Out</p>
          </div>
        </div>
        <div className="admin-content">
          {selectedOption === "manageUsers" && (
            <>
              <div
                className="icon-container"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  backgroundColor: "#343a40",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              >
                <div
                  className="search-container"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={searchIcon}
                    alt="Search"
                    className="icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <input
                    type="text"
                    placeholder="Search Users"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: "#fff",
                      fontSize: "16px",
                      marginLeft: "10px",
                      padding: "5px",
                    }}
                  />
                </div>
                <div
                  className="filter-container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                >
                  <img
                    src={filterIcon}
                    alt="Filter"
                    className="icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <select
                    value={adminRole}
                    onChange={handleFilterChange}
                    style={{
                      border: "none",
                      outline: "none",
                      background: "#343a40",
                      color: "#fff",
                      fontSize: "16px",
                      marginLeft: "10px",
                      cursor: "pointer",
                      padding: "5px",
                    }}
                  >
                    <option value="">All Roles</option>
                    <option value="Customer">Customer</option>
                    <option value="Financial Admin">Financial Admin</option>
                    <option value="Employee Admin">Employee Admin</option>
                    <option value="Package Admin">Package Admin</option>
                    <option value="Schedule Admin">Schedule Admin</option>
                    <option value="Main Admin">Main Admin</option>
                  </select>
                </div>
                <Button
                  onClick={handleDownloadPDF}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                >
                  <img
                    src={downloadIcon}
                    alt="Download PDF"
                    className="icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <span
                    style={{
                      color: "#fff",
                      marginLeft: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Download User Report PDF
                  </span>
                </Button>
              </div>
              <h3
                style={{
                  fontFamily: "Impact",
                  textAlign: "center",
                  margin: "20px 0",
                  color: "white",
                }}
              >
                {headingText}
              </h3>
              <Container fluid>
                <Row>
                  {filteredUsers.map((user, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3}>
                      {user.userEntry !== 0 ? (
                        <AdminCard user={user} />
                      ) : (
                        <UserCard user={user} />
                      )}
                    </Col>
                  ))}
                </Row>
              </Container>
              <hr
                style={{
                  backgroundColor: "white",
                  margin: "30px auto",
                  width: "90%",
                }}
              />
            </>
          )}

          {selectedOption === "viewFeedbacks" && (
            <>
              <FeedbackList />
            </>
          )}

          {selectedOption === "viewLuggages" && (
            <>
              <LuggageList />
            </>
          )}
        </div>

        <Modal
          show={showAddAdminModal}
          onHide={() => setShowAddAdminModal(false)}
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#343a40", borderBottom: "none" }}
          >
            <Modal.Title style={{ fontFamily: "Impact", color: "white" }}>
              Add Admin
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#343a40", color: "white" }}>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={newAdmin.name || ""}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={newAdmin.email || ""}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={newAdmin.phoneNumber || ""}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, phoneNumber: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={newAdmin.password || ""}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formUserRole">
                <Form.Label>User Role</Form.Label>
                <Form.Control
                  as="select"
                  value={newAdmin.adminRole || ""}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, adminRole: e.target.value })
                  }
                >
                  <option value="">Select Role</option>
                  <option value="Customer">Customer</option>
                  <option value="Financial Admin">Financial Admin</option>
                  <option value="Employee Admin">Employee Admin</option>
                  <option value="Package Admin">Package Admin</option>
                  <option value="Schedule Admin">Schedule Admin</option>
                  <option value="Main Admin">Main Admin</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer
            style={{ backgroundColor: "#343a40", borderTop: "none" }}
          >
            <Button
              variant="secondary"
              onClick={() => setShowAddAdminModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleAddAdmin}>
              Add Admin
            </Button>
          </Modal.Footer>
        </Modal>

        <Toast
          show={!!message}
          onClose={() => setMessage("")}
          style={{ position: "fixed", bottom: 20, right: 20 }}
        >
          {/* Toast content */}
        </Toast>
      </div>
    </div>
  );
}

export default AdminDashboard;
