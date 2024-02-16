import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddBlog.css';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

import CustomNavbar from './CustomNavbar';

const CreateLogs = () => {
  const location = useLocation();
  const {blogId} = location.state; 
  console.log("TEST:------>"+blogId);
  const navigate = useNavigate();


  const initialBlogData = {
    placeName: '',
    startTime: '',
    exitTime: '',
    imageUrl: '',
    logDescription: '',
    passAmount: 0,
    location :''
  }
  const [logData, setLogData] = useState(initialBlogData);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setLogData({ ...logData, [name]: e.target.files[0] });
    } else {
      setLogData((prevLog) => ({ ...prevLog, [name]: value }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const startTime = new Date(logData.startTime);
    const exitTime = new Date(logData.exitTime);
  
    if (exitTime < startTime) {
      alert(`Time travel isn't possible yet. Put Time after ${startTime}`);
      return;
    }

    try {
      const formDataForUpload = new FormData();

      Object.keys(logData).forEach((key) => {
        if (key !== 'imageUrl') {
          formDataForUpload.append(key, logData[key]);
        }
      });

      formDataForUpload.append('imageUrl', logData.imageUrl);
      formDataForUpload.append('blogId',blogId);

      const result = await axios.post('http://localhost:8080/add-log', formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Log added successfully:', result.data);

      alert('Log added successfully');
      navigate('/my-logs');
      // navigate('/my-logs', { state: { blogId:blogId } });
    } catch (error) {
      console.error('Error adding log:', error.message);
    }
  };

  return (
    <>
    <CustomNavbar />
      <div className="add-blog-container mt-2 border">
      <h1 className="add-blog-title  text-center">Create Logs</h1>
        <p className="text-center">Share your Travel experience</p>
        <form onSubmit={handleSubmit}>
          <div className="log-parent">
            <Form.Group>
              <Form.Label>Place Name: 
                <Form.Control type="text" placeholder="Enter place name" name="placeName" value={logData.placeName} onChange={handleChange} />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Start time: 
                <Form.Control type="datetime-local" name="startTime" value={logData.startTime} onChange={handleChange} />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Exit time: 
                <Form.Control type="datetime-local" name="exitTime" value={logData.exitTime} onChange={handleChange} />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Images: 
                <Form.Control type="file" name="imageUrl" onChange={handleChange} />
              </Form.Label>
              <Button onClick={() => setLogData((prevLog) => ({ ...prevLog, imageUrl: '' }))}>remove Image</Button>

            </Form.Group>
            <Form.Group>
              <Form.Label>Description:
                <Form.Control name="logDescription"  as="textarea" value={logData.logDescription} onChange={handleChange}></Form.Control>
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pass Amount:
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Enter amount of pass"
                  name="passAmount"
                  value={logData.passAmount}
                  onChange={handleChange}
                />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Location:
                <Form.Control
                  type="text"
                  placeholder="Enter location "
                  name="location"
                  value={logData.location}
                  onChange={handleChange}
                />
              </Form.Label>
            </Form.Group>
           
              <Button type="submit" className="btn btn-success">
                Submit Log
              </Button>
            
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateLogs