import React, { useEffect, useRef } from "react";
import "./footer.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  const footerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach(el => {
              el.classList.add('in-view');
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        {/* Column 1 - Brand Info */}
        <div className="footer-section animate-on-scroll">
          <h2 className="footer-logo">FURNICRAFT</h2>
          <p className="footer-description">
            Discover stylish and affordable furniture for every room in your home with Furnicraft.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer-section animate-on-scroll">
          <h3 className="footer-heading">Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/">Categories</Link></li>
            <li><Link to="/">Track Your Order</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        {/* Column 3 - Customer Service */}
        <div className="footer-section animate-on-scroll">
          <h3 className="footer-heading">Customer Service</h3>
          <ul>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>

        {/* Column 4 - Social Links */}
        <div className="footer-section animate-on-scroll">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom animate-on-scroll">
        <p>© 2024 Furnicraft. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
