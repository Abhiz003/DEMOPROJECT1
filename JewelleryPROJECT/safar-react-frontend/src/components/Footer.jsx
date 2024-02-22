import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Styles/Footer.css';
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
                            <h3 className="text-center">Get In Touch</h3>
                            <div className="social-buttons">

                                <a href="https://www.linkedin.com/in/abhijitb3/" target="_blank" rel="noreferrer" className="social-buttons__button social-button social-button--linkedin" aria-label="LinkedIn">
                                    <span className="social-button__inner">
                                        <i className="fab fa-linkedin-in"></i>
                                    </span>
                                </a>
                                <a href="https://www.instagram.com/_magnum.__?igsh=MTg1cHZ3ejVzODdtMA==/" target="_blank" rel="noreferrer" className="social-buttons__button social-button social-button--instagram" aria-label="InstaGram">
                                    <span className="social-button__inner">
                                        <i className="fab fa-instagram"></i>
                                    </span>
                                </a>
                                <a href="https://github.com/Abhiz003" target="_blank" rel="noreferrer" className="social-buttons__button social-button social-button--github" aria-label="GitHub">
                                    <span className="social-button__inner">
                                        <i className="fab fa-github"></i>
                                    </span>
                                </a>
                                <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new" target="_blank" rel="noreferrer" className="social-buttons__button social-button social-button--gmail" title="abhijitbhangale3@gmail.com" aria-label="GitHub">
                                    <span className="social-button__inner">
                                        <i className="fa-solid fa-envelope fa-fade" ></i>
                                    </span>
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <p className="copyright">Safar © 2024</p>
                </Container>
            </footer>
        </div>
    );
};
