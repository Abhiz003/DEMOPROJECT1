import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../Styles/BloggerProfile.css';
import { deleteBlogger, getBloggerDetails } from '../Services/UserService';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserId, logout } from '../utils/TokenUtil';
import axios from 'axios';
import { toast } from 'react-toastify';

const BloggerProfile = () => {
  const bloggerId = getUserId();   // or take it from the url by useParams


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

  const [blogger, setBlogger] = useState(null);
  console.log("getting blogger id --==--==--==>>>>", bloggerId);

  useEffect(() => {
    const fetchBlogger = async () => {
      try {
        const data = await getBloggerDetails(bloggerId);
        setBlogger(data);
      } catch (error) {
        console.error('Error fetching blogger details:', error);
        toast.error('Failed to fetch blogger details');
      }
    };

    fetchBlogger();
  }, [bloggerId]);
  

  // const fetchBloggerImages = async (bloggerId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/blog/fetchBlogPhotosByBlogger/${bloggerId}`);


  //     if (response.status) {
  //       setBloggerImages(response.list);
  //       setLoading(false);
  //     } else {
  //       console.error('Failed to fetch user images:', response.statusMessage);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user images:', error);
  //   }
  // };



  const handleDelete = async (imageId) => {
    const confirmed = window.confirm('Are you sure you want to delete this image?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/blog/delete/${imageId}`);

      if (response.status) {
        toast.success('Blog image deleted successfully');

        setSelectedImage(null);
        setShowZoom(false);

        // fetchBloggerImages(bloggerId);
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
      const response = await deleteBlogger(bloggerId);

      if (response.status) {
        toast.success('Account deleted successfully');

      } else {
        console.error('Failed to delete account:', response.statusMessage);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };


  // const renderBloggerImages = () => {
  //   return (
  //     <div className="user-images">
  //       {loading ? (
  //         <p>Loading...</p>
  //       ) : (
  //         Array.isArray(bloggerImages) && bloggerImages.length > 0 ? (
  //           bloggerImages.map((image, index) => (
  //             <div key={index} className="user-image-container">
  //               <img
  //                 src={`http://localhost:8080/blogger/fetch/pic/${image.id}`}
  //                 alt={`Blogger Image ${index + 1}`}
  //                 className="user-image"
  //                 onClick={() => handleZoomIn(image.id)}
  //               />
  //             </div>
  //           ))
  //         ) : (
  //           <p>No blogger images available.</p>
  //         )
  //       )}
  //     </div>
  //   );
  // };




  return (
    <>
      {blogger && (
      <Container className="mt-5">
        <h2 className="mb-4 head">Welcome {blogger.bloggerName}...</h2>

        <Card className="card">
          <Card.Header className="card-header">
            <h3>Blogger Profile</h3>
          </Card.Header>
         
            <Card.Body className="card-body" key={blogger.bloggerId}>
              <div className="text-center mb-4">
                <img
                  className="newImage"
                  src={`Images/Profiles/${blogger.profilePic}`}

                  alt="Profile Pic"
                  onClick={() => handleProfileZoomIn()}
                />
              </div>
              <div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                <div style={{ marginTop: '20px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#555' }}>Name</h4>
                    <p>{blogger.bloggerName}</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#555' }}>Email</h4>
                    <p>{blogger.bloggerEmail}</p>
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
                src={`Images/Profiles/${blogger.profilePic}`}
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
              src={`Images/Profiles/${blogger.profilePic}`}
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
      )}
    </>
  );
}

export default BloggerProfile;
