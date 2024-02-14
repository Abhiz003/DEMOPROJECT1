import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import { AiOutlineDownload } from 'react-icons/ai';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import './Collections.css';
import axios from 'axios';
import { getUserId } from '../utils/TokenUtil';
import { getBlogImage } from '../Services/BlogService';

const MyBlogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const userId = getUserId();
        const response = await axios.get(`http://localhost:8080/blog/get-my-blogs/${userId}`);
        if (response.status === 200) {
          setBlogs(response.data);
        } else {
          console.error('Failed to fetch blogs:', response.statusMessage);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleShowDownloadConfirmation = (blogId) => {
    setSelectedBlogId(blogId);
    setShowDownloadConfirmation(true);
  };

  const handleConfirmDownload = () => {
    handleDownload(selectedBlogId);
    setShowDownloadConfirmation(false);
  };

  const handleCancelDownload = () => {
    setSelectedBlogId(null);
    setShowDownloadConfirmation(false);
  };

  const handleOpenZoom = (blogId) => {
    setZoomedImage(getBlogImage(blogId));
    setShowZoom(true);
  };

  const handleZoomOut = () => {
    setShowZoom(false);
  };

  const handleDownload = (blogId) => {
    const contentType = 'image/png';

    fetch(getBlogImage(blogId))
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], `Blog_${blogId}.png`, { type: contentType });

        saveAs(file);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5 asdf">
        <h1 className="mb-4 head text-center">My Journey Tales</h1>
        <Card className="card">
          <Card.Body className="card-body">
            <div className="text-center mb-4 imageList">
              {blogs.length === 0 ? (
                <p>No blogs available.</p>
              ) : (
                <div className="div1">
                  {blogs.map((blog, index) => (
                    <div key={blog.id} className="artContainer">
                      <img
                        className="blogs"
                        src={blog.photoUrl}
                        alt={`Blog ${blog.id}`}
                        onClick={() => handleOpenZoom(blog.id)}
                        onContextMenu={handleContextMenu}
                      />
                      <div>
                        <p>{blog.title}</p>
                        <p>{blog.startDate}</p>
                        <p>{blog.endDate}</p>
                        <p>{blog.blogDescription}</p>
                        <p>{blog.members}</p>
                        <p>{blog.totalCost}</p>
                        <p>{blog.transportationMode}</p>
                      </div>
                      <div className="likeContainer">
                        <Button
                          variant="secondary"
                          className="downloadButton"
                          onClick={() => handleShowDownloadConfirmation(blog.id)}
                        >
                          <AiOutlineDownload size={20} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
        <div className="d-flex">
          <Button onClick={() => navigate('/add-blog')}>Add New Blog</Button>
        </div>
      </Container>

      <Modal show={showDownloadConfirmation} onHide={handleCancelDownload}>
        <Modal.Header closeButton>
          <Modal.Title> Confirm Download</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You're about to immortalize this blog on your device! 🚀</p>
          <p>Hit the "Download" button and know more about my journey! 🎉</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDownload}>
            Nah, I'll pass 😎
          </Button>
          <Button variant="primary" onClick={handleConfirmDownload}>
            Download this journey 🌟
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showZoom} onHide={() => setShowZoom(false)}>
        <Modal.Body className="p-0">
          <img
            className="arts zoomed-image"
            src={zoomedImage}
            alt={`Zoomed view`}
            onContextMenu={handleContextMenu}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleZoomOut}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyBlogs;
