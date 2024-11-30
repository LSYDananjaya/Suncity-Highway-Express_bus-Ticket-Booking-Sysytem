import React, { useState } from 'react';
import { Modal, Form, Button, Toast } from 'react-bootstrap';
import axios from 'axios';
import profileIcon from './icons/profile-icon.svg';
import promoteIcon from './icons/promote-icon.svg';
import addAdminIcon from './icons/add-admin-icon.svg';
import emailIcon from './icons/email-icon.svg';
import phoneIcon from './icons/phone-icon.svg';
import deleteIcon from './icons/delete-icon.svg';

const AdminCard = ({ user, onDeleteFunction, onPromoteFunction }) => {
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [newAdminRole, setNewAdminRole] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);

  const handlePromoteClick = () => {
    setShowPromoteModal(true);
  };

  const handlePromoteSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${user._id}`, {
        userEntry: newAdminRole
      });
      if (response.data.success) {
        onPromoteFunction(user._id, newAdminRole);
        setShowPromoteModal(false);
        setNewAdminRole('');
        setShowSuccessToast(true);
      } else {
        setShowErrorToast(true);
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      setShowErrorToast(true);
    }
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${user._id}`);
      onDeleteFunction(user._id);
      setShowDeleteConfirmation(false);
      setShowDeleteSuccessToast(true);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  let adminType;
  switch (user.userEntry) {
    case 1:
      adminType = { type: 'Financial Admin' };
      break;
    case 2:
      adminType = { type: 'Employee Admin' };
      break;
    case 3:
      adminType = { type: 'Package Admin' };
      break;
    case 4:
      adminType = { type: 'Schedule Admin' };
      break;
    case 5:
      adminType = { type: 'Main Admin' };
      break;
    default:
      adminType = { type: 'Customer' };
  }

  return (
    <div className="admin-card border border-secondary rounded p-3 mb-4">
      <div className="card-body text-center">
        <div className="rounded bg-primary p-3 mb-4">
          <p className="card-text fs-5 text-white">
            <img src={profileIcon} alt="Profile" className="icon" style={{ width: '40px', height: '40px' }} /> {user.name}
          </p>
        </div>
        <div className="rounded bg-secondary p-3 mb-4">
          <p className="card-text fs-5 text-white">
            <img src={emailIcon} alt="Email" className="icon" style={{ width: '40px', height: '40px' }} /> {user.email}
          </p>
        </div>
        <div className="rounded bg-info p-3 mb-5">
          <p className="card-text fs-5 text-white">
            <img src={phoneIcon} alt="Phone Number" className="icon" style={{ width: '40px', height: '40px' }} /> {user.mNo}
          </p>
        </div>
        <div className="rounded bg-light p-3 mb-5">
          <p className="card-text fs-5 text-dark">
            <img src={addAdminIcon} alt="Admin Type" className="icon" style={{ width: '40px', height: '40px' }} /> {adminType.type}
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-around">
        <Button variant="danger" onClick={handleDeleteConfirmation}>
          <img src={deleteIcon} alt="Delete" className="icon" style={{ width: '24px', height: '24px' }} /> Delete
        </Button>
        {user.userEntry !== 5 && (
          <Button variant="success" onClick={handlePromoteClick}>
            <img src={promoteIcon} alt="Promote" className="icon" style={{ width: '24px', height: '24px' }} /> Promote
          </Button>
        )}
      </div>

      <Modal show={showPromoteModal} onHide={() => setShowPromoteModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#343a40', borderBottom: 'none' }}>
          <Modal.Title style={{ fontFamily: 'Impact', color: 'white' }}>Promote User</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#343a40', color: 'white' }}>
          <Form>
            <Form.Group controlId="formAdminRole">
              <Form.Label>Admin Role</Form.Label>
              <Form.Control
                as="select"
                value={newAdminRole}
                onChange={(e) => setNewAdminRole(e.target.value)}
                required
              >
                <option value="">Select Admin Role</option>
                <option value="0">Customer</option>
                <option value="1">Financial Admin</option>
                <option value="2">Employee Admin</option>
                <option value="3">Package Admin</option>
                <option value="4">Schedule Admin</option>
                <option value="5">Main Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#343a40', borderTop: 'none' }}>
          <Button variant="secondary" onClick={() => setShowPromoteModal(false)} style={{ color: 'white', fontFamily: 'Impact' }}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePromoteSubmit} style={{ backgroundColor: 'green', color: 'white', fontFamily: 'Impact' }}>
            Promote
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        show={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        style={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <Toast.Header closeButton>
          <strong className="me-auto">Confirmation</strong>
        </Toast.Header>
        <Toast.Body>Are you sure you want to delete this user?</Toast.Body>
        <div className="d-grid gap-2 mt-2">
          <Button variant="danger" size="sm" style={{ backgroundColor: 'red', borderColor: 'red' }} onClick={handleDeleteUser}>Yes, Delete</Button>
          <Button variant="secondary" size="sm" style={{ backgroundColor: 'gray', borderColor: 'gray' }} onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
        </div>
      </Toast>

      <Toast
        show={showDeleteSuccessToast}
        onClose={() => setShowDeleteSuccessToast(false)}
        style={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <Toast.Header closeButton>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>User has been deleted</Toast.Body>
      </Toast>

      <Toast
        show={showSuccessToast}
        onClose={() => {
          setShowSuccessToast(false);
          window.location.reload();
        }}
        style={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <Toast.Header closeButton>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{`${user.name} has been promoted to ${newAdminRole}`}</Toast.Body>
      </Toast>

      <Toast
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        style={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <Toast.Header closeButton>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Promotion failed. Please try again.</Toast.Body>
      </Toast>
    </div>
  );
};

export default AdminCard;
