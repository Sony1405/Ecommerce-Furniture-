import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import './Nav.css';

const Navbar = () => {
  const scrollToFeatured = () => {
    const section = document.getElementById('featured-categories');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark animated-navbar">
        <div className="container px-4">
          <Link className="navbar-brand fw-bold fs-4 me-4" to="/">FURNICRAFT</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center gap-5 ms-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>

              {/* ✅ Categories now scrolls to section instead of dropdown */}
              <li className="nav-item">
                <span className="nav-link" role="button" onClick={scrollToFeatured}>Categories</span>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FaShoppingCart />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/track">
                 <MdLocalShipping size={20} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
