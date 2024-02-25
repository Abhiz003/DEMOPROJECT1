import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/AllBloggers.css';
import { getAllBlogger } from '../Services/UserService';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';



const AllBloggers = () => {
    const navigate = useNavigate();
    const [bloggers, setBloggers] = useState([])

    useEffect(() => {
        const fetchAllBloggers = async () => {
            try {
                const response = await getAllBlogger();
                setBloggers(response.list);
                console.log(response.list);
            } catch (error) {
                console.error('Failed to fetch bloggers :', error)
            }
        };
        fetchAllBloggers();
    }, [])


    const viewBlogs = async (bloggerId) => {
        const response = await axios.get(`http://localhost:8080/blog/get-my-blogs/${bloggerId}`);

        navigate(`/my-blogs/${bloggerId}`);
    }




    return (
        <>
            <Container fluid="md mt-4">
                <Row className="bloggers-row">
                    {bloggers.length === 0 ? (
                        <h3>No bloggers registered.</h3>
                    ) : (
                        <>
                            {bloggers.map((blogger, index) => (
                                <Col key={index}>
                                    <Card key={blogger.bloggerId} className="blogger-card">
                                        <Card.Img variant="top" src={`Images/Profiles/${blogger.profilePic}`} alt={`${blogger.profilePic}`} className="blogger-img " />
                                        <Card.Body>
                                            <Card.Title>{blogger.bloggerName}</Card.Title>
                                            <Card className='text p-1 mb-1'>
                                                <p>Email: {blogger.bloggerEmail}</p>
                                                <p>Phone: {blogger.bloggerPhone}</p>
                                                <span>bloggerDescriptionDescription</span>
                                            </Card>
                                            <Button variant="primary" onClick={() => navigate(`/profile-page/${blogger.bloggerId}`,)}>View Profile</Button>
                                            &nbsp;

                                            <Button variant="outline-success" onClick={() => { viewBlogs(blogger.bloggerId) }} title={blogger.bloggerId}>View Blogs</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}

                        </>
                    )}
                </Row>
            </Container>
        </>
    )
}

export default AllBloggers