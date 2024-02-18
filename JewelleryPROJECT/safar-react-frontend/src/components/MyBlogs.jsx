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
  const [selectedBlogId, setSelectedBlogId] = useState(null);
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

 
  // const handleOpenZoom = (blogId) => {
  //   setZoomedImage(getBlogImage(blogId));
  //   setShowZoom(true);
  // };

  // const handleZoomOut = () => {
  //   setShowZoom(false);
  // };

 
  const loadUpdateData = async (blogId) => {
    try {
      const response = await axios.get(`http://localhost:8080/blog/get-blog/${blogId}`);
      if (response.status === 200) {
        setUpdateData(response.data);
        setShowUpdateForm(true);
        navigate(`/update-blog/${blogId}`); // Use backticks for string interpolation
      } else {
        console.error('Failed to fetch blog for update:', response.statusMessage);
      }
    } catch (error) {
      console.error('Error fetching blog for update:', error);
    }
  };

  const handleUpdate = async (blogId) => {
    // window.location.href = `/update-blog/${blogId}`;
   await loadUpdateData(blogId);
    console.log(blogId);
    navigate(`/update-blog/${blogId}`);
  };
  
  const handleDelete = async (blogId) => {
    console.log(blogId);
    axios.delete(`http://localhost:8080/blog/delete/${blogId}`)
 
    navigate(`/update-blog/${blogId}`);
  };



  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <>
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
                      onContextMenu={handleContextMenu}
                    />
                    
                  </div>
                  <div className="blog-info text-box">
                    <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                      <span >{blog.title}</span>
                      <Button
                        variant="secondary"
                        className="downloadButton"
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
                    <p className="description border" >
                      
                      {blog.blogDescription}
                    </p>
                    {/* <span className="crud-buttons d-flex"> */}

                      {/* <Button onClick={() => navigate('/my-logs', <Logs blogId={blog.id} />)} > View</Button> &nbsp; */}
                      {/* <Button onClick={() => navigate('/my-logs', { state: { blogId: blog.id } })} > View</Button> */}

                      {/* <Button onClick={() => navigate('/create-logs',<Logs blogId={blog.id} />) } > create Logs</Button> */}
                      {/* <Button onClick={() => navigate('/create-logs', { state: { blogId: blog.id } })} > create Logs</Button> */}

                      {/* <Button onClick={() => handleUpdate(blog.id)}>Update</Button> */}
                      {/* <Button onClick={() => {updateData && <UpdateBlog updateData={updateData} loadUpdateData={loadUpdateData}/>}}>Update</Button> */}

                      {/* <Button onClick={handleConfirmDelete(blog.id)}>Delete</Button> */}
                      {/* <Button >Delete</Button> */}
                    {/* </span> */}


                    <span className="crud-buttons d-flex">
                    <Button onClick={() => navigate('/my-logs', { state: { blogId: blog.id } })}>View</Button>
                    <Button onClick={() => navigate('/create-logs', { state: { blogId: blog.id } })}>Create Logs</Button>
                    <Button onClick={() => handleUpdate(blog.id)}>Update</Button>
                    <Button onClick={() => handleDelete(blog.id)}>Delete</Button>
                  </span>
                  </div>
                </Card.Body>
              </Card>
            ))}
            {/* {showUpdateForm && updateData && (
              <UpdateBlog updateData={updateData} />
            )} */}
          </>
        )}
        <div className="d-flex">
          <Button onClick={() => navigate('/add-blog')}>Add New Blog</Button>
        </div>
      </Container>
     
    </>
  );
};

export default MyBlogs;




//-----------------useffect-----------------
// useEffect(() => {
//   const fetchBlogs = async () => {
  //     try {
  //       const userId = getUserId();
  //       const response = await axios.get(`http://localhost:8080/blog/get-my-blogs/${userId}`);
  //       if (response.status === 200) {
  //         setBlogs(response.data);
  //       } else {
  //         console.error('Failed to fetch blogs:', response.statusMessage);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching blogs:', error);
  //     }
  //   };

  //   fetchBlogs();
  // }, []);





//---------------Update  functionality--------------------------
 // const loadUpdateData = async (blogId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/blog/get-blog/${blogId}`);
  //     if (response.status === 200) {
  //       setUpdateData(response.data);
  //       setShowUpdateForm(true);
  //       // navigate('/update-blog'); // Navigate to the update form
  //     } else {
  //       console.error('Failed to fetch blog for update:', response.statusMessage);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching blog for update:', error);
  //   }
  // };

  // const handleUpdate = async (blogId) => {
  //   const updateData = await loadUpdateData(blogId);
  //   console.log(blogId);
  //   navigate(`/update-blog/${blogId}`);
  // };




//---------------Delete  functionality--------------------------
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