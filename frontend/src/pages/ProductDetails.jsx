import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ useNavigate imported
import axios from 'axios';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { CartContext } from './CartProvider';
// import './productdetails.css';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Navigation hook
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`http://localhost:8000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError('Product not found or server error'));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart'); // ✅ Navigate immediately
  };

  if (error) return <h2 className="text-danger text-center mt-4">{error}</h2>;
  if (!product) return <h3 className="text-center mt-4">Loading...</h3>;

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow custom-card">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title className="text-center mb-3">
                  <h3>{product.name}</h3>
                </Card.Title>

                <Card.Text>
                  <p><strong>Price:</strong> ${product.price}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Color:</strong> {product.color}</p>
                  <p><strong>Range:</strong> <Badge bg={
                    product.range === "High" ? "danger" :
                    product.range === "Medium" ? "warning" : "success"
                  }>{product.range}</Badge></p>
                  <p><strong>Wood Type:</strong> {product.wood_type}</p>
                  <p><strong>Dimensions:</strong> {product.dimensions}</p>
                  <p><strong>Model:</strong> {product.model}</p>
                  <p><strong>Description:</strong> {product.description}</p>
                </Card.Text>

                <div className="text-center">
                  <Button variant="dark" onClick={handleAddToCart}>
                    Add to Cart 🛒
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default ProductDetails;
