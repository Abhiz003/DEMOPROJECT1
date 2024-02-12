import React, { useState } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  
import './Profile.css';
import CustomNavbar from './CustomNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { deleteUser, deleteUserPermanently } from '../Services/UserService';
import { logout } from '../utils/TokenUtil';

function Profile() {
  const name = sessionStorage.getItem('userName');
  const email = sessionStorage.getItem('userEmail');
  const newid = sessionStorage.getItem('userId');
  const navigate = useNavigate(); 
  
  const [showZoom, setShowZoom] = useState(false);

  const handleZoomIn = () => {
    setShowZoom(true);
  };

  const handleZoomOut = () => {
    setShowZoom(false);
  };

  const handleDeactivateAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to deactivate your account? This action can be undone by logging in again.');

    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteUser(newid);
      
      if (response != null) {
        alert('Account deactivated successfully');

        logout();
        sessionStorage.clear();
        navigate('/');
 
      } else {
        console.error('Failed to deactivate account:', response.statusMessage);
      }
    } catch (error) {
      console.error('Error deactivating account:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteUserPermanently(newid);
      
      if (response.status) {
        alert('Account deleted successfully');

        sessionStorage.clear();
        navigate('/login');  
      } else {
        console.error('Failed to delete account:', response.statusMessage);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <h2 className="mb-4 head">Welcome {name}...</h2>
        <Card className="card">
          <Card.Header className="card-header">
            <h3>User's Profile</h3>
          </Card.Header>
          <Card.Body className="card-body">
            <div className="text-center mb-4">
              <img className='newImg' src={`http://localhost:8080/user/fetch/profilePic/${newid}`} alt="Profile Pic" onClick={handleZoomIn}/>
            </div>
            <div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
              <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#555' }}>Name</h4>
                  <p>{name}</p>
                </div>
                <div>
                  <h4 style={{ color: '#555' }}>Email</h4>
                  <p>{email}</p>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <div className="social-links">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                </a>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button variant="warning" onClick={handleDeactivateAccount}>
                Deactivate Account
              </Button>{'  '}
              <Button
                  variant="secondary"
                  onClick={() => navigate(`/edit-user-details`)}
                >
                  Edit Account Details
                </Button>{'  '}
              <Button variant="danger" onClick={handleDeleteAccount} className="ml-2">
                Delete Account
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showZoom} onHide={handleZoomOut} centered>
          <Modal.Body>
            <img
              className='zoomed-profile-pic'
              src={`http://localhost:8080/user/fetch/profilePic/${newid}`}
              alt="Zoomed Profile Pic"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleZoomOut}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </>
  );
}

export default Profile;
