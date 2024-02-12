import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './BloggerProfile.css';
import CustomNavbar from './CustomNavbar';
import { deleteBlogger } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/TokenUtil';

const BloggerProfile = () => {
  const name = sessionStorage.getItem('userName');
  const email = sessionStorage.getItem('userEmail');
  const newid = sessionStorage.getItem('userId');

  const [selectedImage, setSelectedImage] = useState(null);

  const [showZoom, setShowZoom] = useState(false);

  const handleZoomIn = (imageId) => {
    setSelectedImage(imageId);
    setShowZoom(true);
  };

  const handleZoomOut = () => {
    setSelectedImage(null);
    setShowZoom(false);
  };

  const [showProfileZoom, setShowProfileZoom] = useState(false);

  const handleProfileZoomIn = () => {
    setShowProfileZoom(true);
  };

  const handleProfileZoomOut = () => {
    setShowProfileZoom(false);
  };

  const navigate = useNavigate();

  const [userImages, setUserImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artImage, setArtImage] = useState(null);

  useEffect(() => {
    fetchUserImages(newid);
  }, [newid]);

  const fetchUserImages = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/art/fetchArtPhotosByArtist/${userId}`);
      const data = await response.json();

      if (data.status) {
        setUserImages(data.list);
        setLoading(false);
      } else {
        console.error('Failed to fetch user images:', data.statusMessage);
      }
    } catch (error) {
      console.error('Error fetching user images:', error);
    }
  };

  

  const handleDelete = async (imageId) => {
    const confirmed = window.confirm('Are you sure you want to delete this image?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/art/delete/${imageId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.status) {
        alert('Art image deleted successfully');

        setSelectedImage(null);
        setShowZoom(false);

        fetchUserImages(newid);
      } else {
        console.error('Failed to delete art image:', data.statusMessage);
      }
    } catch (error) {
      console.error('Error deleting art image:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/permanently-delete/${newid}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.status) {
        alert('Account deleted successfully');

      } else {
        console.error('Failed to delete account:', data.statusMessage);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleDeactivateAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to deactivate your account? This action can be undone by logging in again.');
  
    if (!confirmed) {
      return;
    }
  
    try {
      const response = await deleteBlogger(newid);
  
      if (response != null) {
        alert('Account deactivated successfully');

        logout();
        sessionStorage.clear();
        navigate('/');
        
      } else {
        console.error('Failed to deactivate account');
      }
    } catch (error) {
      console.error('Error deactivating account:', error);
    }
  };
  

  const renderUserImages = () => {
    return (
      <div className="user-images">
        {loading ? (
          <p>Loading...</p>
        ) : (
          Array.isArray(userImages) && userImages.length > 0 ? (
            userImages.map((image, index) => (
              <div key={index} className="user-image-container">
                <img
                  src={`http://localhost:8080/artist/fetch/pic/${image.id}`}
                  alt={`User Image ${index + 1}`}
                  className="user-image"
                  onClick={() => handleZoomIn(image.id)}
                />
              </div>
            ))
          ) : (
            <p>No user images available.</p>
          )
        )}
      </div>
    );
  };

  const handleChange = (event) => {
    setArtImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!artImage) {
      alert('Please select an image before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('blogger.bloggerId', newid);
    formData.append('photoUrl', artImage);

    try {
      const response = await fetch('http://localhost:8080/add-art', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        alert('Image uploaded successfully');
        setArtImage(null);
        fetchUserImages(newid);
      } else {
        console.error('Failed to upload art image:', data.statusMessage);
      }
    } catch (error) {
      console.error('Error uploading art image:', error);
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <h2 className="mb-4 head">Welcome {name}...</h2>
        <Card className="card">
          <Card.Header className="card-header">
            <h3>Blogger Profile</h3>
          </Card.Header>
          <Card.Body className="card-body">
            <div className="text-center mb-4">
              <img
                className="newImage"
                src={`http://localhost:8080/artist/fetch/profilePic/${newid}`}
                alt="Profile Pic"
                onClick={() => handleProfileZoomIn()} 
              />
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
            <div style={{ marginTop: '30px' }}>
              <h4 style={{ color: '#555' }}>Uploaded Arts</h4>
              {renderUserImages()}
            </div>
            <div style={{ marginTop: '30px' }}>
              <h4 style={{ color: '#555' }}>Upload Art Image</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Art Image</Form.Label>
                  <Form.Control type="file" name="photoUrl" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" className="mt-2" onClick={handleUpload}>
                  Upload
                </Button>
              </Form>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button variant="warning" onClick={handleDeactivateAccount}>
                Deactivate Account
              </Button>{'   '}
              <Button
                  variant="secondary"
                  onClick={() => navigate(`/edit-blogger-details`)}
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
          {selectedImage && (
            <img
              className='zoomed-profile-pic'
              src={`http://localhost:8080/artist/fetch/pic/${selectedImage}`}
              alt="Zoomed Profile Pic"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleZoomOut}>
            Close
          </Button>
          <Button
              variant="danger"
              onClick={() => handleDelete(selectedImage)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showProfileZoom} onHide={handleProfileZoomOut} centered>
          <Modal.Body>
            <img
              className='zoomed-profile-pic'
              src={`http://localhost:8080/artist/fetch/profilePic/${newid}`}
              alt="Zoomed Profile Pic"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleProfileZoomOut}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </>
  );
}

export default BloggerProfile;
