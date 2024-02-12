import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import { register } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BloggerRegistration = () => {
  const navigate = useNavigate();

  const initialFormData = {
    bloggerName: '',
    bloggerEmail: '',
    bloggerPhone: '',
    bloggerPassword: '',
    profilePic: '',
    bloggerDescription: ''
  }

  const [formData, setFormData] = useState(initialFormData);

  const [formErrors, setFormErrors] = useState({});
  const [signUpError, setSignUpError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case 'bloggerName':
        errors.bloggerName = /^[A-Za-z\s]+$/.test(value) ? '' : 'Name should contain only letters and spaces';
        break;
      case 'bloggerPhone':
        errors.bloggerPhone = /^[0-9]{10}$/.test(value) ? '' : 'Phone should contain exactly 10 numbers';
        break;
      case 'bloggerEmail':
        errors.bloggerEmail = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email address';
        break;
      case 'bloggerPassword':
        errors.bloggerPassword =
          value.length >= 6 && /[A-Z]/.test(value) && /\d/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value)
            ? ''
            : 'Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character';
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formErrors).some((error) => error !== '')) {
      return;
    }

    try {
      const formDataForUpload = new FormData();

      
      Object.keys(formData).forEach((key) => {
        if (key !== 'profilePic') {
          formDataForUpload.append(key, formData[key]);
        }
      });

      
      formDataForUpload.append('profilePic', formData.profilePic);

      const result = await register(formDataForUpload);
      axios.post('http://localhost:8080/register-blogger');
      console.log(result);

      if (result.status === true) {
        alert(result.statusMessage || "Congratulations! You're officially a part of the club.");
        navigate('/log-in');
      } else {
       
        alert(result.statusMessage || "Oops! It seems like you're already a member. Please Log In.");
        navigate('/log-in');
      }
    } catch (error) {
      console.log(error);
      setSignUpError(true);
      setTimeout(() => {
        setSignUpError(false);
      }, 2000);
    }

    console.log('Blogger Data:', formData);
    clearForm();
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  return (
    <>
      <CustomNavbar />
      <Container >
        <h2 className="mt-5 text-center">Blogger Registration</h2>
        <Form onSubmit={handleSubmit} className='border p-2'>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Blogger Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter Blogger Name"
                  name="bloggerName"
                  value={formData.bloggerName}
                  onChange={handleChange}
                />
                {formErrors.bloggerName && <Alert variant="danger" className="mt-2">{formErrors.bloggerName}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Blogger Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter Blogger Email"
                  name="bloggerEmail"
                  value={formData.bloggerEmail}
                  onChange={handleChange}
                />
                {formErrors.bloggerEmail && <Alert variant="danger" className="mt-2">{formErrors.bloggerEmail}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Blogger Phone</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter Blogger Phone"
                  name="bloggerPhone"
                  value={formData.bloggerPhone}
                  onChange={handleChange}
                />
                {formErrors.bloggerPhone && <Alert variant="danger" className="mt-2">{formErrors.bloggerPhone}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Enter Password"
                  name="bloggerPassword"
                  value={formData.bloggerPassword}
                  onChange={handleChange}
                />
                {formErrors.bloggerPassword && <Alert variant="danger" className="mt-2">{formErrors.bloggerPassword}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" name="profilePic" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  type="number"
                  placeholder="Enter something about blogger"
                  name="bloggerDescription"
                  value={formData.bloggerDescription}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="justify-content-center mt-3">
            <Col lg={2}>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default BloggerRegistration;
