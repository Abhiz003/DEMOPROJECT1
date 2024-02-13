import React, { useState, useEffect } from 'react';
import { Container, Card, Pagination, Button, Modal } from 'react-bootstrap';
import CustomNavbar  from './CustomNavbar';
import { AiOutlineDownload } from 'react-icons/ai';
import { saveAs } from 'file-saver';
import {Link} from 'react-router-dom';
import './Collections.css';
import axios from 'axios';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/blogs/get-blogs',blogs);

        if (response.status) {
          const blogsWithLikes = response.list.map((blog) => ({ ...blog, likes: 0 }));
          setBlogs(blogsWithLikes);
        } else {
          console.error('Failed to fetch blogs:', response.statusMessage);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLike = (blogId) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
      )
    );
  };

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
    setZoomedImage(`http://localhost:8080/blogger/fetch/pic/${blogId}`);
    setShowZoom(true);
  };

  const handleZoomOut = () => {
    setShowZoom(false);
  };

  const handleDownload = (blogId) => {
    const contentType = 'image/png';

    fetch(`http://localhost:8080/blogger/fetch/pic/${blogId}`)
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5 asdf">
        <h1 className="mb-4 head text-center">Blogs By Our Travellers</h1>
        <Card className="card">
          <Card.Body className="card-body">
            <div className="text-center mb-4 imageList">
              {loading ? (
                <p>Loading blogs...</p>
              ) : (
                <div className="div1">
                  {blogs.slice(startIndex, endIndex).map((blog) => (
                    <div key={blog.id} className="artContainer">
                      <img
                        className="blogs"
                        src={`http://localhost:8080/blogger/fetch/pic/${blog.id}`}
                        alt={`Art ${blog.id}`}
                        onClick={() => handleOpenZoom(blog.id)}
                        onContextMenu={handleContextMenu}
                      />
                      <div className="likeContainer">
                        <Button
                          variant="secondary"
                          className="likeButton"
                          onClick={() => handleLike(blog.id)}
                        >
                          Like{' '}
                          <span role="img" aria-label="heart">
                            ❤️
                          </span>{' '}
                          {blog.likes}
                        </Button>{' '}
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
            <div className="text-center xyz">
              <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </Card.Body>
        </Card>
        <div className="d-flex">
           <Link to="/add-blog"> <Button >Add New Blog</Button></Link>
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
}

export default MyBlogs;
