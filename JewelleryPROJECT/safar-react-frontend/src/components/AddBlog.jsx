import React, { useState } from 'react';
import '../Styles/Form.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserId } from '../utils/TokenUtil';
import { toast } from 'react-toastify';

const AddBlog = () => {
  const navigate = useNavigate();
  const initialBlogData = {
    title: '',
    startDate: '',
    endDate: '',
    blogDescription: '',
    photoUrl: '', 
    members: '',
    totalCost: '',
    transportationMode: 'By Road'
  };

  const [blogData, setBlogData] = useState(initialBlogData);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setBlogData({ ...blogData, [name]: e.target.files[0] });
    } else {
      setBlogData((prevBlog) => ({ ...prevBlog, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const startDate = new Date(blogData.startDate);
    const endDate = new Date(blogData.endDate);
  
    if (endDate < startDate) {
      toast.warning('End date cannot be before the start date');
      return;
    }
  
    try {
      const formDataForUpload = new FormData();
  
      Object.keys(blogData).forEach((key) => {
        if (key !== 'photoUrl') {
          formDataForUpload.append(key, blogData[key]);
        }
      });
  
      formDataForUpload.append('photoUrl', blogData.photoUrl);
      formDataForUpload.append('bloggerId', getUserId());
  
      const result = await axios.post(`http://localhost:8080/add-blog`, formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Blog added successfully:', result.data);
  
       toast.success('Blog added successfully');
      navigate(`/my-blogs/${getUserId()}`);
    } catch (error) {
      toast.error("somethingwent wrong");
      console.error('Error adding blog:', error.message);
    }
  };
  
  const handleReset = () => {
    setBlogData(initialBlogData);
  };

  return (
    <>
      <div className="add-blog-container">
        <h2 className="add-blog-title text-center">Add Blog</h2>
        <p className="text-center">Share your Travel experience</p>
        <form onSubmit={handleSubmit} onReset={handleReset}>
         
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
              onChange={handleChange}
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

          <Button type="submit" className="add-exhibition-button">
            Submit
          </Button>{' '}
          <Button type="reset" className="add-exhibition-button">
            Reset
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
