import { useState } from 'react';
import '../App.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import { bloggerLogin, login } from '../Services/UserService.js';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/TokenUtil.js';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isBlogger, setIsBlogger] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'isBlogger') {
      setIsBlogger(e.target.checked);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;

      if (isBlogger) {
        localStorage.setItem('blogger', "true");
        result = await bloggerLogin({
          bloggerEmail: formData.userEmail,
          bloggerPassword: formData.userPassword,

        });
      } else {
        result = await login(formData);

      }

      console.log(getToken());
      if (result.status === true) {
        sessionStorage.setItem('userName', result.name);
        sessionStorage.setItem('userEmail', result.email);
        sessionStorage.setItem('userId', result.id);
        alert(`Welcome, ${result.name}! Get ready for an exciting journey!`);

        localStorage.setItem('userId', result.id);
        localStorage.setItem('token', result.token);
        navigate('/');
      } else {
        alert(result.statusMessage || "Oops! It seems like you're not a member. Please SignUp first.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <CustomNavbar /> */}
      <Container className="login-container">
        <div className="container d-flex justify-content-center align-items-center">
          <h1 className='mt-5'>User Login</h1>
        </div>
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-md-center mt-4">
              <Col lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter Email" name="userEmail" onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" name="userPassword" onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="I am a blogger"
                  name="isBlogger"
                  checked={isBlogger}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mt-3 justify-content-md-center" >
              <Col lg={1}>
                <Button variant="primary" type="submit">Log In</Button>
              </Col>
            </Row>
          </Form>
        
      </Container>
    </>
  );
}
export default Login;
