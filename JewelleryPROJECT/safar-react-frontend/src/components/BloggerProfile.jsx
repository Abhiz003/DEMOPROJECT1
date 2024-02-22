import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../Styles/BloggerProfile.css';
import { deleteBlogger } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/TokenUtil';
import axios from 'axios';

const BloggerProfile = () => {
  const name = sessionStorage.getItem('userName');
  const email = sessionStorage.getItem('userEmail');
  const bloggerId = sessionStorage.getItem('userId');

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

  const [bloggerImages, setBloggerImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    fetchBloggerImages(bloggerId);
  }, [bloggerId]);

  const fetchBloggerImages = async (bloggerId) => {
    try {
      const response = await axios.get(`http://localhost:8080/blog/fetchBlogtPhotosByBlogger/${bloggerId}`);
      

      if (response.status) {
        setBloggerImages(response.list);
        setLoading(false);
      } else {
        console.error('Failed to fetch user images:', response.statusMessage);
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
      const response = await axios.delete(`http://localhost:8080/blog/delete/${imageId}`);

      if (response.status) {
        alert('Blog image deleted successfully');

        setSelectedImage(null);
        setShowZoom(false);

        fetchBloggerImages(bloggerId);
      } else {
        console.error('Failed to delete blog image:', response.statusMessage);
      }
    } catch (error) {
      console.error('Error deleting blog image:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/delete-blogger/${bloggerId}`);

      if (response.status) {
        alert('Account deleted successfully');

      } else {
        console.error('Failed to delete account:', response.statusMessage);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  

  const renderBloggerImages = () => {
    return (
      <div className="user-images">
        {loading ? (
          <p>Loading...</p>
        ) : (
          Array.isArray(bloggerImages) && bloggerImages.length > 0 ? (
            bloggerImages.map((image, index) => (
              <div key={index} className="user-image-container">
                <img
                  src={`http://localhost:8080/blogger/fetch/pic/${image.id}`}
                  alt={`Blogger Image ${index + 1}`}
                  className="user-image"
                  onClick={() => handleZoomIn(image.id)}
                />
              </div>
            ))
          ) : (
            <p>No blogger images available.</p>
          )
        )}
      </div>
    );
  };

  const handleChange = (event) => {
    setPhotoUrl(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!photoUrl) {
      alert('Please select an image before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('blogger.bloggerId', bloggerId);
    formData.append('photoUrl', photoUrl);

    try {
      const response = await axios.post('http://localhost:8080/add-blog', formData);

      if (response.status) {
        alert('Image uploaded successfully');
        setPhotoUrl(null);
        fetchBloggerImages(bloggerId);
      } else {
        console.error('Failed to upload art image:', response.statusMessage);
      }
    } catch (error) {
      console.error('Error uploading art image:', error);
    }
  };




  return (
    <>
      {/* <CustomNavbar /> */}
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
                src={`http://localhost:8080/blogger/fetch/profilePic/${bloggerId}`}
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
              <h4 style={{ color: '#555' }}>Uploaded Blogs</h4>
              {renderBloggerImages()}
            </div>
            <div style={{ marginTop: '30px' }}>
              <h4 style={{ color: '#555' }}>Upload Blog Images</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Blogs Images</Form.Label>
                  <Form.Control type="file" name="photoUrl" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" className="mt-2" onClick={handleUpload}>
                  Upload
                </Button>
              </Form>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
              src={`http://localhost:8080/blogger/fetch/pic/${selectedImage}`}
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
              src={`http://localhost:8080/blogger/fetch/profilePic/${bloggerId}`}
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
