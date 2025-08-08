import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './productlisting.css';
import Footer from '../components/Footer';

const Productlisting = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colors, setColors] = useState([]); // ✅ new state for colors
  const [currentPage, setCurrentPage] = useState(1);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState('');

  const productsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product data');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        extractColors(data); // ✅ extract colors
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  // ✅ Function to extract unique colors from product list
  const extractColors = (productList) => {
    const colorSet = new Set();
    productList.forEach((p) => {
      if (p.color) {
        colorSet.add(p.color.trim().toLowerCase());
      }
    });
    setColors([...colorSet]);
  };

  useEffect(() => {
    let filtered = [...products];

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (categoryFilter) {
      filtered = filtered.filter((p) => {
        const productCategory = p.category?.toLowerCase().replace(/\s/g, '');
        const selectedCategory = categoryFilter.toLowerCase().replace(/\s/g, '');
        return productCategory === selectedCategory;
      });
    }

    if (colorFilter) {
      filtered = filtered.filter(
        (p) => p.color?.toLowerCase() === colorFilter.toLowerCase()
      );
    }

    if (ratingFilter) {
      filtered = filtered.filter((p) => p.rating >= parseFloat(ratingFilter));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [categoryFilter, colorFilter, priceRange, ratingFilter, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRangeChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([0, value]);
  };

  const handleResetFilters = () => {
    setCategoryFilter('');
    setColorFilter('');
    setPriceRange([0, 1000]);
    setRatingFilter('');
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 pcard">
        {/* Filters */}
        <div className="mb-4 d-flex gap-3 flex-wrap align-items-center">
          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-select w-auto"
            value={categoryFilter}
          >
            <option value="">All Categories</option>
            <option value="livingroom">Living Room</option>
            <option value="bedroom">Bedroom</option>
            <option value="dining">Dining</option>
            <option value="office">Office</option>
            <option value="kids">Kids</option>
            <option value="outdoor">Outdoor</option>
            <option value="storage">Storage</option>
          </select>

          {/* ✅ Dynamic Color Filter */}
          <select
            onChange={(e) => setColorFilter(e.target.value)}
            className="form-select w-auto"
            value={colorFilter}
          >
            <option value="">All Colors</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setRatingFilter(e.target.value)}
            className="form-select w-auto"
            value={ratingFilter}
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5 & up</option>
            <option value="4">4 & up</option>
            <option value="3.5">3.5 & up</option>
            <option value="3">3 & up</option>
          </select>

          <div className="d-flex align-items-center">
            <label className="me-2">Max Price: ${priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={handleRangeChange}
            />
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
        </div>

        {/* Product Cards */}
        <div className="row">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div className="col-md-6 mb-4" key={product.id}>
                <div className="image-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img"
                  />
                  <div className="overlay">
                    <h4>{product.name}</h4>
                    <p>Price: ${product.price}</p>
                    <p>Rating: ⭐ {product.rating}</p>
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-light btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products found for selected filters.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Productlisting;
