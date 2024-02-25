import { useState } from "react";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { adminlogin } from '../Services/AdminService';
import { useNavigate } from "react-router-dom";
import React from 'react';
import './AdminLogin.css'; 
import backgroundImage from './videos/deathValley.jpg'; 
import { toast } from "react-toastify";

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
        console.log(e);
        try {
            const result = await adminlogin(formData);
            console.log("response ----> ",result);
            if (result.status === true) {
                if(result.name === "secret"){
                    toast.success(`Admin, Welcome to Admin Panel`);
                
                    localStorage.setItem("msg", result.statusMessage);
                    localStorage.setItem("userEmail", "admin@gmail.com");
                    
                    localStorage.setItem("token", result.name);
                    sessionStorage.setItem("token",result.name);

                    navigate("/home");   // set  another flag here to render the admin navbar  in app.js
                    window.location.reload();
                }
            } else {
                
                toast.warning(`${result.statusMessage}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Container fluid className="container-wrapper" style={backgroundStyle}>
                <Row className="justify-content-md-center">
                    <Col lg={6} className="left-column">
                        <h2>Welcome Admin</h2>
                    </Col>
                    <Col lg={6} className="right-column">
                        <Form className="admin-login-form" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 names">
                            <Form.Label className='mb-3' style={{ color: 'white' }}>Name</Form.Label>
                                <Form.Control type="email" className="admin-username" placeholder="Enter Email" name="userEmail" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='mb-3' style={{ color: 'white' }}>Email</Form.Label>
                                <Form.Control type="password" className="admin-pass" placeholder="Enter Password" name="userPassword" onChange={handleChange} />
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


