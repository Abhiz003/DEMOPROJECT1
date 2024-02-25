import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/BloggerProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { deleteBlogger, getBloggerDetails } from '../Services/UserService';
import { toast } from 'react-toastify';
import axios from 'axios'

const ProfilePage = () => {
    const navigate = useNavigate();
    let { bloggerId } = useParams();


    console.log("blogger details for profilwpage are --------->", bloggerId)

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


    const [blogger, setBlogger] = useState(null);
    console.log("getting blogger id --==--==--==>>>>", bloggerId);

    useEffect(() => {
        const fetchBlogger = async () => {
            try {
                const data = await getBloggerDetails(bloggerId);
                console.log("response data fetched  is -======>", data)
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

    console.log("response data is -======>", blogger)



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
                                    src={`/Images/Profiles/${blogger.profilePic}`}

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
                                    <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faYoutube} className="social-icon" />
                                    </a>
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                               hello to my web
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

export default ProfilePage;
