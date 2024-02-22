import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAllBlogger } from '../Services/UserService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../Styles/AllBloggers.css';

const AllBloggers = () => {
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

    return (
        <>
            <Container fluid="md mt-4">
                <Row className="bloggers-row">
                    {bloggers.length === 0 ? (
                        <p>No bloggers registered.</p>
                    ) : (
                        <>
                            {bloggers.map((blogger, index) => (
                                <Col key={index}>
                                    <Card key={blogger.bloggerId} className="blogger-card">
                                        <Card.Img variant="top" src="Images/dummyUser.png"  className="blogger-img "/>
                                        {/* <Card.Img variant="top" src={`http://localhost:8080/blogger/fetch/profilePic/${blogger.bloggerId}`} /> */}
                                        <Card.Body>
                                            <Card.Title>{blogger.bloggerName}</Card.Title>
                                            <Card.Text>
                                                <p>Email: {blogger.bloggerEmail}</p>
                                                <p>Phone: {blogger.bloggerPhone}</p>
                                                bloggerDescriptionDescription
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => (alert("Profile unavailable"))}>View Profile</Button>
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