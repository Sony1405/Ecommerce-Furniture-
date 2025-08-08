import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './featuredcat.css';

import dining from '../assets/Dining.jpg';
import office from '../assets/office.jpg';
import Bedroom from '../assets/Bedroom.webp';
import Livingroom from '../assets/Livingroom.jpg';
import KidsFurniture from '../assets/KidsFurniture.jpg';
import outdoorfurniture from '../assets/outdoorfurniture.jpg';

const featuredCategories = [
  {
    id: 1,
    name: "Living Room",
    image: Livingroom,
    price: "109.99",
    info: "Elevate your home with our premium living room collection. Featuring a modern sectional sofa, stylish cushions, and elegant décor—perfect for relaxing, entertaining, or working from home in comfort and style",
  },
  {
    id: 2,
    name: "Kids Furniture",
    image: KidsFurniture,
    price: "199.99",
    info: "Create a warm and whimsical nursery with our handcrafted cradle. Woven from natural materials and paired with soft, cuddly toys — it's the perfect start to your little one's comfort and care.",
  },
  {
    id: 3,
    name: "Dining Room",
    image: dining,
    price: "159.99",
    info: "Create unforgettable moments with elegant dining setups, perfect for gatherings and celebrations.",
  },
  {
    id: 4,
    name: "Office Furniture",
    image: office,
    price: "129.99",
    info: "Create a productive workspace with ergonomic and stylish office furniture.",
  },
  {
    id: 5,
    name: "Outdoor Furniture",
    image: outdoorfurniture,
    price: "89.99",
    info: "Soak up the sun in style with our premium outdoor loungers. Designed for durability and comfort, they’re perfect for poolside relaxation or garden lounging.",
  },
  {
    id: 6,
    name: "Bedroom",
    image: Bedroom,
    price: "99.99",
    info: "Transform your bedroom into a peaceful retreat with elegant and contemporary furnishings.",
  },
];

const FeaturedCat = () => {
  const headingRef = useRef(null);
  const [animateHeading, setAnimateHeading] = useState(false);
  const [visibleCards, setVisibleCards] = useState({});
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateHeading(true);
          headingObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) headingObserver.observe(headingRef.current);

    return () => headingObserver.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            setVisibleCards(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="featured-categories" className="container px-5 mt-5">
      <h2
        ref={headingRef}
        className={`text-center mb-5 ${animateHeading ? 'animated-heading' : ''}`}
      >
        Featured Categories
      </h2>

      <div className="row gx-5 gy-5 justify-content-center">
        {featuredCategories.map((category, index) => (
          <div
            key={category.id}
            data-id={category.id}
            ref={el => (cardRefs.current[index] = el)}
            className={`col-lg-4 d-flex justify-content-center fade-card ${visibleCards[category.id] ? 'visible' : ''}`}
          >
            <div className="flip-card">
              <div className="flip-card-inner">

                {/* Front */}
                <div
                  className="flip-card-front image-overlay"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="overlay-text">
                    <h3>{category.name}</h3>
                    <p>from <strong>{category.price}</strong></p>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-card-back">
                  <div className="back-content d-flex flex-column justify-content-between h-100">
                    <div className="text-content">
                      <h3 className="card-title">{category.name}</h3>
                      <p className="card-price">from <strong>{category.price}</strong></p>
                      <p className="card-description">{category.info}</p>
                    </div>
                    <button
                      className="btn btn-light btn-sm rounded-pill px-3 btn"
                      onClick={() => navigate('/products')}
                    >
                      More
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCat;
