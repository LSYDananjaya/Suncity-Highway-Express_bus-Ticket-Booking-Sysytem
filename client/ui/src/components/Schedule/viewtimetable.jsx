import React from 'react';
import { Modal, Form } from 'react-bootstrap';

const viewtimetable = ({ scheduleItem }) => {
  return (
    <>
      <tr>
        <td>{scheduleItem.startLocation}</td>
        <td>{scheduleItem.endLocation}</td>
        <td>{scheduleItem.dtime}</td>
        <td>{scheduleItem.atime}</td>
        <td>{scheduleItem.number}</td>
        <td>
          {scheduleItem.profile && (
            <img
              src={`http://localhost:3000/${scheduleItem.profile}`}
              alt="Profile"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          )}
        </td>
      </tr>

      <Modal show={true}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="startLocation"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                Starting Location:
              </label>
              <p>{scheduleItem.startLocation}</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="endLocation"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                End Location:
              </label>
              <p>{scheduleItem.endLocation}</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="dtime"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                Departure Time:
              </label>
              <p>{scheduleItem.dtime}</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="atime"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                Arrival Time:
              </label>
              <p>{scheduleItem.atime}</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="number"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                Bus number
              </label>
              <p>{scheduleItem.number}</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="profile"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                Profile Picture:
              </label>
              {scheduleItem.profile && (
                <img
                  src={`http://localhost:3000/${scheduleItem.profile}`}
                  alt="Profile"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default viewtimetable;
