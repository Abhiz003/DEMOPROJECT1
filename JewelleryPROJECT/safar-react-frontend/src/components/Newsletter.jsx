import React from 'react';
import aboutImage from '../places-images/minibus123.jpg';
import '../Styles/Newsletter.css';
const Newsletter = () => {
  return (
    <>
      <section id="about" className="about-section mt-5 mb-3">
        <div className="container">
          <h2 className="section-heading text-center mb-5">Explore Your Way, Share Your Day</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="about-img">
                <img
                  src={aboutImage}
                  alt=""
                  className="hover-effect"
                  style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="about-text text-center mt-5">
                <p>
                "At ExploreHub, we are dedicated to enhancing your travel experiences by providing a seamless platform to discover and share captivating travel logs from explorers worldwide. Whether you seek inspiration for your next adventure, wish to document your journeys, or commemorate unforgettable travel moments, ExploreHub is your gateway to a diverse collection of immersive travel logs curated by passionate globetrotters. Immerse yourself in the narratives, relive the moments, and embark on a virtual journey through the lens of fellow travelers who have explored the world and are eager to share their tales with you."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;