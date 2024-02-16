import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {

    return (
        <div className="footer-dark mt-5 footer-container">
            <footer>
                <Container>
                    <Row>
                        <Col sm={6} md={3} className="item">
                            <h3>SAFAR Team</h3>
                            <p> - Abhijit Bhangale< br />
                                - Gopal Patil</p>

                        </Col>
                        <Col sm={6} md={3} className="item">
                            <h3>Help</h3>
                            <ul>
                                <li>Contact Us</li>
                                <li>FAQ</li>
                            </ul>
                        </Col>
                        <Col md={6} className="item text">
                            <h3>SAFAR</h3>
                            <p>
                                As you traverse through diverse landscapes and cultures, our Travel Log app becomes the canvas for your memories. 
                                Capture the beauty of each destination, from the breathtaking landscapes to the vibrant local scenes. 
                                Share your travel tales through words, photos, and moments that define your experiences.
                            </p>
                        </Col>
                        <Col className="item-social">
                            <h3>Get In Touch</h3>
                            <a href="https://www.linkedin.com/">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>

                            <a href="https://www.linkedin.com/">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>

                            <a href="https://www.linkedin.com/">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>

                            <a href="https://www.youtube.com/">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                        </Col>
                    </Row>
                    <p className="copyright">Safar © 2024</p>
                </Container>
            </footer>
        </div>
    );
};
