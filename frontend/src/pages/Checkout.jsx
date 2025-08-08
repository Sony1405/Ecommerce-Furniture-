import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { CartContext } from './CartProvider';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; // ✅ Import
import './checkout.css';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ Initialize navigation

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    const { fullName, address, city, zipCode, phone } = shippingInfo;
    if (fullName && address && city && zipCode && phone) {
      clearCart();
      navigate('/track'); // ✅ Redirect to Track Order page
    } else {
      alert('Please fill in all shipping fields.');
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <h3 className="text-center mb-4">Checkout</h3>
        <Row>
          {/* Shipping Form */}
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <h5>Shipping Information</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleChange}
                    placeholder="Enter ZIP code"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </Form.Group>
              </Form>
            </Card>
          </Col>

          {/* Order Summary */}
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <h5>Order Summary</h5>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <ul className="list-unstyled">
                    {cartItems.map((item) => (
                      <li key={item.id}>
                        {item.name} x {item.quantity} — ${item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <h6>Total: ${getTotalPrice()}</h6>
                  <div className="d-grid mt-3">
                    <Button variant="success" onClick={handlePlaceOrder}>
                      Place Order
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Checkout;
