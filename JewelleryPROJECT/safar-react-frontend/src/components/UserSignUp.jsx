import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { userSignUp } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import '../Styles/Form.css'
import { toast } from 'react-toastify';

const UserSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userPassword: '',
    profilePic: null, // Use null for the initial state of the file
  });

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
          case 'userName':
            const trimmedValue = value.trim();
            errors.user = /^[A-Za-z]{3,}(?:\s[A-Za-z]+)*$/.test(trimmedValue) ? '' : 'Name should contain only letters and spaces';
            break;
          case 'userPhone':
            errors.userPhone = /^[6-9]\d{9}$/.test(value) ? '' : 'Phone number is invalid';
            break;
            case 'userEmail':
              const stdMailId = value.toLowerCase();  
              errors.userEmail = /^([^0-9<>()[\]\\.,;:\s@"]+(\.[^0-9<>()[\]\\.,;:\s@"]+)*)|(".+?")@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/.test(stdMailId)
                  ? ''
                  : 'Invalid email address';
              break;
          case 'userPassword':
            errors.bloggerPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?!.*\s).{6,}$/.test(value)
              ? ''
              : 'Password must be at least 6 characters long, contain one uppercase letter, one number, one special character, and no spaces';
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

      Object.entries(formData).forEach(([key, value]) => {
        formDataForUpload.append(key, value);
      });

      const result = await userSignUp(formDataForUpload);

      if (result.status === true) {
        toast.success(result.statusMessage || "Congratulations! You're officially a part of the club.");
        navigate('/');
      } else {
        toast.warning(result.statusMessage || "Oops! It seems like you're already a member. Please Log In.");
        navigate('/log-in');
      }
    } catch (error) {
      console.error(error);
      setSignUpError(true);
      setTimeout(() => {
        setSignUpError(false);
      }, 2000);
    }

    console.log('User Data:', formData);
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      userName: '',
      userEmail: '',
      userPhone: '',
      userPassword: '',
      profilePic: null,
    });
  };

  return (
    <>
      <Container className="add-blog-container">
        <h2 className="mt-5 text-center">User Registration</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter user Name"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
                {formErrors.userName && <Alert variant="danger" className="mt-2">{formErrors.userName}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>user Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter user Email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                />
                {formErrors.userEmail && <Alert variant="danger" className="mt-2">{formErrors.userEmail}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>user Phone</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter user Phone"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleChange}
                />
                {formErrors.userPhone && <Alert variant="danger" className="mt-2">{formErrors.userPhone}</Alert>}
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
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                />
                {formErrors.userPassword && <Alert variant="danger" className="mt-2">{formErrors.userPassword}</Alert>}
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
export default UserSignUp;
