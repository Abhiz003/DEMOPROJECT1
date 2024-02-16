import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from "react";
import CustomNavbar from './CustomNavbar';
import { adminlogin } from '../Services/AdminService';
import { useNavigate } from "react-router-dom";
import React from 'react';
import './AdminLogin.css'; // Import the CSS file
import backgroundImage from '../img_art/bg5.jpg'; // Replace with the actual path

export function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ userEmail: "", userPassword: "" });

    const backgroundStyle = {
        backgroundImage: `url(${ backgroundImage })`,
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await adminlogin(formData);
            if (result.status === true) {
                if(result.name === "secret"){
                    alert(`Admin, Welcome to Admin Panel`);
                    localStorage.setItem("token", result.statusMessage);
                     navigate("/admin-dashboard");

                     sessionStorage.setItem("adminMessage",result.name);
                }
                else{
                    alert(`Something Went Wrong!!!!!`);
                }
                
            } else {
                
                alert(`${result.statusMessage}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <CustomNavbar></CustomNavbar>
            <Container fluid className="container-wrapper" style={backgroundStyle}>
                <Row className="justify-content-md-center">
                    <Col lg={6} className="left-column">
                        <h2>Welcome Admin</h2>
                    </Col>
                    <Col lg={6} className="right-column">
                        <Form className="admin-login-form" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 names">
                            <label className='mb-3' style={{ color: 'white' }}>Name</label>
                                <Form.Control type="email" placeholder="Enter Email" name="userEmail" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='mb-3' style={{ color: 'white' }}>Email</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name="userPassword" onChange={handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


