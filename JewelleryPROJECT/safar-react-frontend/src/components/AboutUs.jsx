import React from "react";
import CustomNavbar from './CustomNavbar';
import { Container } from "react-bootstrap";
import '../Styles/AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';


const AboutUs = () => {
    return (
        <>
            <section className="section-white mt-5">
                <div className="container text-center about-disclaimer">
                    <h1>About SAFAR</h1>
                    <p><b>Explore the Global Tapestry of Wonders</b></p>
                    <Container className="abouttext">
                        <i>
                        <h5>
                            SAFAR opens the door to an enchanting world of travel experiences, where traditional and contemporary adventures seamlessly converge.
                            Immerse yourself in an extensive collection featuring over a thousand carefully curated journeys, blending the essence of local exploration
                            with globally acclaimed destinations. Our commitment is to provide you with a diverse selection that caters to a variety of travel tastes.
                            If you have a specific destination in mind, our dedicated team is ready to plan it for you.
                        </h5>
                        <h5>
                            With a heritage spanning three decades, we bring a wealth of credibility and expertise to fulfill your travel desires. Whether you're
                            seeking a single trip to discover new horizons, planning an adventure for a special occasion, or exploring corporate travel plans, SAFAR is your
                            comprehensive destination for all things travel. Step into the enchanting world of SAFAR, where each journey is a timeless celebration of
                            exploration and discovery.
                        </h5>
                        </i>
                    </Container>
                </div>
            </section>

            <section className="section-white mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center about-disclaimer">
                            <h2 className="section-title">Meet the Founders</h2>
                            <p className="section-subtitle mt-3">
                                Embark on a journey with the visionaries behind our brand. Our founders are dedicated to enriching your experience with a curated selection of exceptional artworks.
                            </p>
                        </div>

                        <section id="about" className="about-section mt-5 mb-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4 col-mf-12 col-12">
                                        <div className="about-img">
                                            <img src="Images/Team/Spidey.jpg" alt="" className="img-fluid hover-effect" />
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-12 col-12 ps-lg-5 md-5">
                                        <div className="about-text">
                                            <h1>Abhijit Bhangale</h1>
                                            <p>Web Developer</p>
                                            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus repellendus ipsam ipsa blanditiis sequi asperiores maxime voluptatibus totam nihil labore reprehenderit numquam nulla eveniet dicta in officia, itaque, minus qui.
                                            </h5>


                                            <div className="social-buttons">

                                                <a href="https://www.linkedin.com/in/abhijitb3/" target="_blank" className="social-buttons__button social-button social-button--linkedin" aria-label="LinkedIn">
                                                    <span className="social-button__inner">
                                                        <i className="fab fa-linkedin-in"></i>
                                                    </span>
                                                </a>
                                                <a href="https://www.instagram.com/_magnum.__?igsh=MTg1cHZ3ejVzODdtMA==/" target="_blank" className="social-buttons__button social-button social-button--instagram" aria-label="InstaGram">
                                                    <span className="social-button__inner">
                                                        <i className="fab fa-instagram"></i>
                                                    </span>
                                                </a>
                                                <a href="https://github.com/Abhiz003" target="_blank" className="social-buttons__button social-button social-button--github" aria-label="GitHub">
                                                    <span className="social-button__inner">
                                                        <i className="fab fa-github"></i>
                                                    </span>
                                                </a>
                                                <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new"  target="_blank" className="social-buttons__button social-button social-button--gmail" title="abhijitbhangale3@gmail.com" aria-label="GitHub">
                                                    <span className="social-button__inner">
                                                    <i className="fa-solid fa-envelope fa-fade" ></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="about" className="about-section mt-5 mb-3 bg-light">
                            <div className="container">
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 col-12 ps-lg-5 md-5">
                                        <div className="about-text">
                                            <h1>Gopal Patil</h1>

                                            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sequi nemo incidunt quisquam quos, nam voluptate tempora suscipit odio a? Ex vel quisquam recusandae reiciendis asperiores minima, porro nisi consequatur.</h5>

                                            <div className="social-buttons">


                                                <a href="https://in.linkedin.com/in/gopal-patil-54824a242" target="_blank" className="social-buttons__button social-button social-button--linkedin" aria-label="LinkedIn">

                                                    <span className="social-button__inner">
                                                        <i className="fab fa-linkedin-in"></i>
                                                    </span>
                                                </a>
                                                <a href="https://www.instagram.com/gopal.__?igsh=MTg1cHZ3ejVzODdtMA==/" target="_blank" className="social-buttons__button social-button social-button--instagram" aria-label="InstaGram">
                                                    <span className="social-button__inner">
                                                        <i className="fab fa-instagram"></i>
                                                    </span>
                                                </a>

                                                <a href="https://github.com/GitCloud-tech" target="_blank" className="social-buttons__button social-button social-button--github" aria-label="GitHub">
                                                    <span className="social-button__inner">
                                                        <i className="fab fa-github"></i>
                                                    </span>
                                                </a>
                                                <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new" target="_blank" className="social-buttons__button social-button social-button--gmail" title="gopal@netcomjaipur.in" aria-label="GitHub">
                                                    <span className="social-button__inner">
                                                    <i className="fa-solid fa-envelope fa-fade" ></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-mf-12 col-12">
                                        <div className="about-img">

                                            <img src="Images/Team/Dude.jpg" alt="" className="img-fluid hover-effect" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>



                    </div>
                </div>
            </section>

        </>
    );
}
export default AboutUs;