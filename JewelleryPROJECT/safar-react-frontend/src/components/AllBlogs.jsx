import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Styles/MyBlogs.css';
import axios from 'axios';
// import { getUserId } from '../utils/TokenUtil';
import { deleteBlog, getAllBlogs, getBlogImage} from '../Services/BlogService';
import { isAdmin } from '../utils/TokenUtil';
import { toast } from 'react-toastify';



const AllBlogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // const response = await axios.get(`http://localhost:8080/blog/fetchAllBlogs`);
        // if (response.status === 200) {
        //   setBlogs(response.data);
        // } 
        
        // else {
        //   console.error('Failed to fetch blogs:', response.statusMessage);
        // }

        const data = await getAllBlogs();
        if(data) {
          setBlogs(data);
        }

      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleOpenZoom = (blogId) => {
    setZoomedImage(getBlogImage(blogId));
    setShowZoom(true);
  };

  const handleZoomOut = () => {
    setShowZoom(false);
  };


  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  // const handleDelete = (blogId) => {
  //   setBlogToDelete((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
  //   setShowDeleteConfirmation(true);
  // };

  // const confirmDelete = async () => {
  //   console.log(blogToDelete);
  //   try {
  //       // await axios.delete(`http://localhost:8080/blog/delete/${blogToDelete}`);

  //       const result = await deleteBlog(blogToDelete);
       

  //     console.log("Blog deleted successfully");
  //   } catch (error) {
  //     console.error('Failed to delete blog:', error);
  //     toast.error("Unable to delete the blog, try reloading !!!")
  //   } finally {
  //     setShowDeleteConfirmation(false);
  //   }
  // };



  const handleDelete = (blogId) => {
    setBlogToDelete(blogId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    console.log(blogToDelete);
    try {
      await deleteBlog(blogToDelete);
      // Fetch the updated list of blogs after deletion
      const updatedBlogs = await getAllBlogs();
      if (updatedBlogs) {
        setBlogs(updatedBlogs);
        toast.success("Blog deleted successfully");
      } else {
        toast.error("Failed to fetch updated blogs");
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
      toast.error("Unable to delete the blog, try reloading !!!");
    } finally {
      setShowDeleteConfirmation(false);
    }
  };



  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <Container className="mt-5 my-blogs-container">
        <h1 className="mb-4 head text-center">Tales of wanderlust</h1>

        {blogs.length === 0 ? (
          <p className="text-center">No blogs available.</p>
        ) : (
          <>
            {blogs.map((blog, index) => (
              <Card key={blog.id} className='mb-2 blog-container'>
                <Card.Body className="blog-container">
                  <div className="blog-image-container">
                    <img
                      className="blog-image"
                      src={`Images/${blog.photoUrl}`}
                      alt={`Blog ${blog.id}`}
                      onClick={() => handleOpenZoom(blog.id)}
                      onContextMenu={handleContextMenu}
                    />
                  </div>

                  <div className="blog-info">
                    <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                      <span style={{ marginRight: '10px' }}>{blog.title}</span>
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
                    <p className="description border">
                     
                      {blog.blogDescription}
                    </p>
                    {/* <Button onClick={() => navigate('/my-logs', blogId={blog.id})} > View</Button> &nbsp; */}
                    <Button onClick={() => navigate('/my-logs', { state: { blogId:blog.id } })} > View</Button> &nbsp;
                      {/* user should be redirected to login page if user isn't logged in  to view the logs */}

                    {/* <Button onClick={() => navigate('/create-logs') } > create Logs</Button> */}
                    
                    {/* {isAdmin() && <Button>Delete</Button>}  */}
                    {isAdmin() && <Button onClick={() => handleDelete(blog.id)}>Delete</Button>} 
                  </div>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </Container>

        {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmation} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
     
    </>
  );
};

export default AllBlogs;










