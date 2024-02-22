import React, { useState, useEffect } from 'react';
import '../Styles/AddBlog.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { getUserId } from '../utils/TokenUtil';

const UpdateBlog = () => {
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
    const result = axios.get(`http://localhost:8080/blog/get-blog/${blogId}`)
    .then(result => {
      const existingBlogData = {
        title: result.data.title,
        startDate: result.data.startDate,
        endDate: result.data.endDate,
        blogDescription: result.data.blogDescription,
        photoUrl: result.data.photoUrl,
        members: result.data.members,
        totalCost: result.data.totalCost,
        transportationMode: result.data.transportationMode,
      };
      setBlogData(existingBlogData);
    })
    .catch(err => console.log(err));

    setIsLoading(false); // Set loading to false once data is set
  }, [blogId]);
  

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
      const response = await axios.put(`http://localhost:8080/update-blog/${blogId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      if (response.status === 200) {
        alert('Blog updated successfully');
        navigate('/my-blogs');
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
     
      <div className="add-blog-container">
        <h2 className="add-blog-title text-center">Update Blog</h2>
        <form onSubmit={handleSubmit}>
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
    
      
