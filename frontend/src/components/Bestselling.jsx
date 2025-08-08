import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bestselling.css';
import sofa from '../assets/sofa.jpg';
import bschair from '../assets/bschair.png';
import shelf from '../assets/shelf.jpg';
import { CartContext } from '../pages/CartProvider';

// ✅ Import Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const bestsellingProducts = [
  {
    id: 1,
    name: "Lux Blue Chesterfield Sofa",
    price: 400,
    image: sofa,
  },
  {
    id: 2,
    name: "Mid-Century Lounge Chair",
    price: 100,
    image: bschair,
  },
  {
    id: 3,
    name: "Modern Rope-Suspended Shelf System",
    price: 80,
    image: shelf,
  },
];

const Bestselling = () => {
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={`py-5 bg-light bscard ${isVisible ? 'animate' : ''}`}
      >
        <div className="container">
          <div className="row align-items-center">

            {/* Left Text */}
            <div className={`col-md-4 mb-4 mb-md-0 left-content ${isVisible ? 'fade-left' : ''}`}>
              <h2 className="fw-bold mb-3">Discover Timeless Furniture Designs</h2>
              <p className="text-muted mb-4">
                Elevate your living space with premium-quality chairs, sofas, and shelves.
                Designed to blend elegance with comfort, our bestselling pieces are perfect
                for every modern home.
              </p>
              <button
                className="btn btn-dark rounded-pill"
                onClick={() => navigate('/products')}
              >
                Explore
              </button>
            </div>

            {/* Product Cards */}
            <div className="col-md-8">
              <div className="row text-center">
                {bestsellingProducts.map((product) => (
                  <div
                    className={`col-12 col-sm-4 mb-4 product-card ${isVisible ? 'fade-up' : ''}`}
                    key={product.id}
                  >
                    <div className="product-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid product-image mb-3 card_img"
                      />
                    </div>
                    <h5>{product.name}</h5>
                    <p className="fw-bold">${product.price.toFixed(2)}</p>

                    {/* Add to Cart with Toast */}
                    <button
                      className="plus-btn"
                      onClick={() => {
                        addToCart(product);
                        toast.success(`${product.name} added to cart!`);
                      }}
                      aria-label="Add to cart"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Bestselling;
