import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/MyBlogs.css';
import axios from 'axios';
import { getUserId, isBlogger } from '../utils/TokenUtil';

// import Logs from './Logs.jsx'

const MyBlogs = () => {
  const navigate = useNavigate();

  const { bloggerId } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // const bloggerId = getUserId();
    console.log("We got bloggerId as ------>", bloggerId);
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/blog/get-my-blogs/${bloggerId}`);
        if (response.status === 200) {
          const blogsWithBloggerId = response.data.map(blog => ({ ...blog, bloggerId }));
          setBlogs(blogsWithBloggerId);
        } else {
          console.error('Failed to fetch blogs:', response.statusMessage);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);


  const handleUpdate = async (blogId) => {
    console.log(blogId);
    navigate(`/update-blog/${blogId}`);
  };


  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:8080/blog/delete/${blogId}`);
      // Remove the deleted blog from the state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      console.log("Blog deleted successfully");
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert("Unable to delete the blog, try reloading !!!");
    }
  };

  //   const handleDelete = async (blogId) => {
  //     const confirmDelete = window.confirm("Are you sure you want to delete this blog?");

  //     if (confirmDelete) {
  //         console.log(blogId);
  //         try {
  //             await axios.delete(`http://localhost:8080/blog/delete/${blogId}`);
  //             console.log("Blog deleted successfully");
  //             window.location.reload();
  //         } catch (error) {
  //             console.error('Failed to delete blog:', error);
  //             alert("Unable to delete the blog, try reloading !!!")
  //         }
  //     }
  // };



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
                  <div className="blog-image-container">
                    <img
                      className="blog-image"
                      src={`/Images/${blog.photoUrl}`}
                      alt={`Blog ${blog.id}`}
                      onContextMenu={handleContextMenu}
                    />

                  </div>
                  <div className="blog-info text-box">
                    <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                      <span >{blog.title}</span>

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


                    <span className="crud-buttons">
                      {console.log("BlogggerID =====>>>", blog.bloggerId)}
                      <Button onClick={() => navigate('/my-logs', { state: { blogId: blog.id, bloggerId: blog.bloggerId } })}>View</Button>
                      {isBlogger() && bloggerId=== getUserId() ?
                      <>
                      <Button onClick={() => navigate('/create-logs', { state: { blogId: blog.id } })}>Create Logs</Button>
                      <Button onClick={() => handleUpdate(blog.id)}>Update</Button>
                      <Button onClick={() => handleDelete(blog.id)}>Delete</Button>
                      </> 
                      :
                      <></>
}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            ))}

          </>
        )}
          { isBlogger() && bloggerId=== getUserId() ?
        <div className="d-flex blog-ops-buttons">

            <Button  onClick={() => navigate('/add-blog')}>Add New Blog</Button>
          <Button onClick={() => navigate('/speech-recognition')}>Text to speech</Button>
        </div> 
        :
        <></>
        }
      </Container>

    </>
  );
};

export default MyBlogs;



