import React, { useState, useEffect } from 'react';
import './AddBlog.css';
import CustomNavbar from './CustomNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { getUserId } from '../utils/TokenUtil';

const UpdateBlog = ({ updateData }) => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const initialBlogData = {
    title: '',
    startDate: '',
    endDate: '',
    blogDescription: '',
    photoUrl: '',
    members: '',
    totalCost: '',
    transportationMode: 'By Road',
  };

  const [blogData, setBlogData] = useState(initialBlogData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (updateData && Object.keys(updateData).length > 0) {
      // Update local state when updateData is available and not empty
      console.log(updateData);
      setBlogData(updateData);
    }
    setIsLoading(false); // Set loading to false once data is set
  }, [updateData]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlogData((prevData) => ({ ...prevData, photoUrl: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(blogData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('photoUrl', blogData.photoUrl);
      formData.append('bloggerId', getUserId());
      const response = await axios.put(
        `http://localhost:8080/update-blog/${blogId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      if (response.status === 200) {
        alert('Blog updated successfully');
        // You can navigate back to the blog list or handle it as needed
      } else {
        alert(`Failed to update blog: ${response.data.statusMessage}`);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert(`Failed to update blog: ${error.message}`);
    }
  };
  return (
    <>
      <CustomNavbar />
      <div className="add-blog-container">
        <h2 className="add-blog-title text-center">Update Blog</h2>
        <form onSubmit={handleSubmit}>
          {/* <input
              type="hidden"
              id="bloggerId"
              name="bloggerId"
              value={getUserId()}
              required
            /> */}
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Start date:</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={blogData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>End date:</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={blogData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="blogDescription"
              value={blogData.blogDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Upload Images:</Form.Label>
            <Form.Control
              type="file"
              name="photoUrl"
              onChange={handleFileChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Members:</Form.Label>
            <Form.Control
              type="number"
              name="members"
              value={blogData.members}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Total cost:</Form.Label>
            <Form.Control
              type="number"
              name="totalCost"
              value={blogData.totalCost}
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Transportation:</Form.Label>
            <Form.Control
              as="select"
              name="transportationMode"
              value={blogData.transportationMode}
              onChange={handleChange}
            >
              <option defaultValue>Select</option>
              <option value="By Road">By Road</option>
              <option value="By Railway">By Railway</option>
              <option value="By Air">By Air</option>
            </Form.Control>
          </Form.Group>

          <Button type="submit">Submit</Button>{' '}
          <Button type="reset" onClick={() => setBlogData(initialBlogData)}>
            Reset
          </Button>
        </form>
      </div>
    </>
  );
};

export default UpdateBlog;
    
      
    
    
      // useEffect(() => {
      //   const fetchBlogsDetails = async () => {
      //     try {
      //       const response = await fetch(`http://localhost:8080/blog/get/${id}`);
    
      //       if (response.ok) {
      //         const data = await response.json();
      //         if (data != null) {
      //           setBlogData(data);
      //         } else {
      //           console.error('Failed to fetch blogs details: Unexpected response format');
      //         }
      //       } else {
      //         console.error('Failed to fetch blogs details:', response.status, response.statusText);
      //       }
      //     } catch (error) {
      //       console.error('Error fetching blogs details:', error);
      //     } finally {
      //       setIsLoading(false);
      //     }
      //   };
    
      //   fetchBlogsDetails();
      // }, [id]);
    
      // const handleChange = (e) => {
      //   const { name, value } = e.target;
      //   setBlogData((prevData) => ({
      //     ...prevData,
      //     [name]: value,
      //   }));
      // };
    
      // const handleSubmit = async (e) => {
      //   e.preventDefault();
    
      //   try {
      //     const response = await fetch(`http://localhost:8080/api/exhibitions/update/${id}`, {
      //       method: 'PUT',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify(blogData),
      //     });
      //     console.log(response);
      //     navigate('/admin-blogs');
      //   } catch (error) {
      //     console.error('Error updating blogs:', error);
      //   }
      // };
