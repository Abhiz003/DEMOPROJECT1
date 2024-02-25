import React from 'react';
import img1 from '../projectImages/PopularPlaces/pexels-ricky-esquivel-1701893.jpg';
import img2 from '../projectImages/PopularPlaces/pexels-oleksandr-p-1004584.jpg';
import img3 from '../projectImages/PopularPlaces/pexels-mayur-sable-12931217.jpg';
import img4 from '../projectImages/PopularPlaces/pexels-jen-healy-2542339.jpg';
import img5 from '../projectImages/PopularPlaces/pexels-jagadeeshbabu-gnanasekaran-14352575.jpg';
import img6 from '../projectImages/PopularPlaces/pexels-frozenmomentii-13943611.jpg';
import img7 from '../projectImages/PopularPlaces/pexels-david-geib-3220760.jpg';
import img8 from '../projectImages/PopularPlaces/pexels-darshak-pandya-574313.jpg';
import '../Styles/FeaturedPlaces.css';
import { Button } from 'react-bootstrap';

const FeaturedPlaces = () => {
  const products = [
    { id: 1, name: 'Urban Escapes', description: 'Discover the pulse of city life and modern architecture', extraFeature: 'Captured in minimalist compositions', image: img1 },
{ id: 2, name: 'Nature Retreats', description: 'Immerse in serene landscapes and natural beauty', extraFeature: 'Minimalistic portrayals of tranquil environments', image: img2 },
{ id: 3, name: 'Adventurous Spirit', description: 'Explore the thrill of daring activities and challenges', extraFeature: 'Minimalist depictions of adrenaline-fueled moments', image: img3 },
{ id: 4, name: 'Tiny Expeditions', description: 'Embark on micro adventures with small-scale wonders', extraFeature: 'Minimalist artistry capturing intricate details', image: img4 },
{ id: 5, name: 'Innovative Journeys', description: 'Experience cutting-edge travel and exploration', extraFeature: 'Minimalist interpretations of groundbreaking adventures', image: img5 },
{ id: 6, name: 'Harmony in Hues', description: 'Blend with diverse cultures and traditions', extraFeature: 'Minimalist renditions merging traditional and modern elements', image: img6 },
{ id: 7, name: 'Watercolor Wanderlust', description: 'Embark on a journey through fluid landscapes', extraFeature: 'Minimalistic watercolor expressions in a dreamy palette', image: img7 },
{ id: 8, name: 'Everyday Discoveries', description: 'Uncover the beauty in ordinary moments during travels', extraFeature: 'Minimalist storytelling through travel scenes', image: img8 }

  ];

  return (
    <>
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col">
            <div className="title-wrapper-with-link title-wrapper--self-padded-mobile title-wrapper--no-top-margin content-align--center">
              <h2 className="title h0">Explore Adventures</h2>
              <p className="description">Welcome to the SAFAR. Embark on a journey through the world's wonders, discover breathtaking landscapes, and share in the excitement of incredible travel experiences! We curate, document, and share travel stories from across the globe.</p>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
          {products.map((product) => (
            <div className="col " key={product.id} >
              <div className="card h-100 product-card">
                <img src={product.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h3 className="card__heading h5">{product.name}</h3>
                  <p className="card-text">{product.description}</p>
                  <div className="d-grid gap-1 col-4 mx-auto">
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default FeaturedPlaces;
