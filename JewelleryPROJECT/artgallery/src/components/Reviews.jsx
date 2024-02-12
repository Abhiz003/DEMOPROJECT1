// Import necessary modules and images

import React from 'react';
import Card from 'react-bootstrap/Card';
import img1 from '../img_art/crausal/4.jpg';
import img2 from '../img_art/Founder/Ayush.jpg';
import img3 from '../img_art/Founder/munot.jpg';
import img4 from '../img_art/Founder/munot.jpg';
import img5 from '../img_art/Founder/munot.jpg';
import img6 from '../img_art/Founder/diksha.jpg';
import img7 from '../img_art/Founder/bhavesh.png';

import './Reviews.css';
import Carousel from 'react-bootstrap/Carousel';

function Reviews() {
  const reviewsData = [
    {
      img: img2,
      review:
        "The art gallery is a hidden gem! I love the way each piece tells a different story, and the atmosphere inside is perfect for immersing oneself in the world of art.",
      name: 'Ayush Kumar',
    },
    {
      img: img7,
      review:
        "Attending exhibitions at this gallery is always a delight. The curation is excellent, showcasing a variety of styles and mediums. It's a haven for art enthusiasts.",
      name: 'Bhavesh Patel',
    },
    {
      img: img3,
      review:
        "The gallery's commitment to supporting local artists is commendable. The diverse range of artworks reflects the rich talent within the community.",
      name: 'Munot Verma',
    },
    {
      img: img4,
      review:
        "I've attended several art events here, and each time I'm impressed by the engaging exhibitions. The gallery's contribution to the art scene is invaluable.",
      name: 'Rajesh Singh',
    },
    {
      img: img5,
      review:
        "The gallery's staff is knowledgeable and passionate about art. Their insights and willingness to share information enhance the overall experience for visitors.",
      name: 'Sandeep Sharma',
    },
    {
      img: img6,
      review:
        "As an artist, I'm grateful for the opportunities the gallery provides. It's a platform that fosters creativity and encourages artists to push boundaries.",
      name: 'Diksha Kapoor',
    },
    {
      img: img7,
      review:
        "The gallery's commitment to creating an inclusive space for art appreciation is commendable. It welcomes diverse perspectives and encourages dialogue.",
      name: 'Arjun Gupta',
    },
    {
      img: img6,
      review:
        "I recently discovered this gallery, and I'm impressed by its dedication to showcasing emerging artists. It's become my go-to place for discovering new talents.",
      name: 'Vikram Joshi',
    },
  ];

  return (
    <>
      <div className='section'>
        <h2>Art Gallery Reviews</h2>
      </div>
      <Card className="bg-dark text-white position-relative">
        <Card.Img
          src={img1}
          alt="Card background"
          className='bkg'
          style={{ width: '100%', height: '90vh', objectFit: 'cover' }}
        />
        <div className="overlay"></div>
        <Card.ImgOverlay
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <Carousel
            fade
            className="card-carousel"
            indicators={false}
            controls={false}
            interval={5000}
            pause={false}
          >
            {reviewsData.map((review, index) => (
              <Carousel.Item key={index}>

                <h4>{`"${review.review}"`}</h4>
                <p>{`-- ${review.name} --`}</p>
              </Carousel.Item>
            ))}
          </Carousel>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}

export default Reviews;
