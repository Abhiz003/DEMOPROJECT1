import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import { AiOutlineDownload } from 'react-icons/ai';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import './MyBlogs.css';
import axios from 'axios';
import { getUserId } from '../utils/TokenUtil';
import { getBlogImage } from '../Services/BlogService';
import UpdateBlog from './UpdateBlog';
// import Logs from './Logs.jsx'

const MyBlogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);


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
    const contentType = 'image/jpg';

    fetch(getBlogImage(blogId))
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], `Blog_${blogId}.jpg`, { type: contentType });

        saveAs(file);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };


  const loadUpdateData = async (blogId) => {
    try {
      const response = await axios.get(`http://localhost:8080/blog/get-blog/${blogId}`);
      if (response.status === 200) {
        setUpdateData(response.data);
        setShowUpdateForm(true);
        // navigate('/update-blog'); // Navigate to the update form
      } else {
        console.error('Failed to fetch blog for update:', response.statusMessage);
      }
    } catch (error) {
      console.error('Error fetching blog for update:', error);
    }
  };

  const handleUpdate = async (blogId) => {
    await loadUpdateData(blogId);
    navigate(`/update-blog/${blogId}`);
  };

  // const handleDeleteConfirmation = (blogId) => {
  //   setSelectedBlogId(blogId);
  //   setShowDeleteConfirmation(true);
  // };

  // const handleConfirmDelete = () => {
  //   handleDelete(selectedBlogId);
  //   setShowDeleteConfirmation(false);
  // };

  // const handleCancelDelete = () => {
  //   setSelectedBlogId(null);
  //   setShowDeleteConfirmation(false);
  // };

  // const handleDelete = async (blogId) => {
  //   if (window.confirm("Do you want to delete the Blog?")) {
  //     try {
  //       const response = await axios.delete(`http://localhost:8080/blog/delete/${blogId}`);
  //       console.log('Response from handleDelete:', response);

  //       if (response.status === 200) {
  //         alert("Blog deleted successfully");
  //         setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
  //       } else {
  //         alert(`Failed to delete blog: ${response.data.statusMessage}`);
  //       }
  //     } catch (error) {
  //       console.error('Error deleting blog:', error);
  //       alert(`Failed to delete blog: ${error.message}`);
  //     }
  //   }
  // };




  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  const WORDS_LIMIT = 30; // Set your desired word limit

  const truncateDescription = (blogDescription) => {
    const words = blogDescription.split(' ');
    if (words.length > WORDS_LIMIT) {
      return words.slice(0, WORDS_LIMIT);
    }
    return blogDescription;
  };
  return (
    <>
      <CustomNavbar />
      <Container className="mt-5 my-blogs-container">
        <h1 className="mb-4 head text-center">My Journey Tales</h1>

        {blogs.length === 0 ? (
          <p className="text-center">No blogs available.</p>
        ) : (
          <>
            {blogs.map((blog, index) => (
              <Card key={blog.id} className='mb-2 blog-container'>
                <Card.Body className="blog-container">
                  <div className="blog-image">
                    <img
                      className="blogs"
                      src={`Images/${blog.photoUrl}`}
                      alt={`Blog ${blog.id}`}
                      onClick={() => handleOpenZoom(blog.id)}
                      onContextMenu={handleContextMenu}
                    />
                  </div>

                  <div className="blog-info">
                    <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                      <span style={{ marginRight: '10px' }}></span>{blog.title}
                      <Button
                        variant="secondary"
                        className="downloadButton"
                        onClick={() => handleShowDownloadConfirmation(blog.id)}
                        style={{ marginLeft: '10px' }}
                      >
                        <AiOutlineDownload size={20} />
                      </Button>
                    </p>
                    <p>
                      <b>Start date:</b> {blog.startDate} &nbsp;
                      <b>End date:</b> {blog.endDate}
                    </p>
                    <p>
                      <b>Members:</b> {blog.members} &nbsp;
                      <b>Total cost:</b> {blog.totalCost}
                    </p>
                    <p>
                      <b>Transportation:</b> {blog.transportationMode}
                    </p>
                    <p className="blog-description border">
                      {truncateDescription(blog.blogDescription)}{' '}
                      {blog.blogDescription.length > WORDS_LIMIT && (
                        <span className="read-more-link" >
                          ...
                        </span>
                      )}
                    </p>
                    <span className="crud-buttons d-flex">

                      {/* <Button onClick={() => navigate('/my-logs', <Logs blogId={blog.id} />)} > View</Button> &nbsp; */}
                      <Button onClick={() => navigate('/my-logs', { state: { blogId: blog.id } })} > View</Button>

                      {/* <Button onClick={() => navigate('/create-logs',<Logs blogId={blog.id} />) } > create Logs</Button> */}
                      <Button onClick={() => navigate('/create-logs', { state: { blogId: blog.id } })} > create Logs</Button>


                      <Button onClick={() => handleUpdate(blog.id)}>Update</Button>
                      {/* <Button onClick={() => {updateData && <UpdateBlog updateData={updateData} loadUpdateData={loadUpdateData}/>}}>Update</Button> */}

                      {/* <Button onClick={handleConfirmDelete(blog.id)}>Delete</Button> */}
                      <Button >Delete</Button>
                    </span>
                  </div>



                </Card.Body>
              </Card>
            ))}
            {showUpdateForm && updateData && (
              <UpdateBlog updateData={updateData} />
            )}
          </>
        )}

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
