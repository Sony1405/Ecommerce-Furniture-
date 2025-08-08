import React, { useContext } from 'react';
import { CartContext } from './CartProvider';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify'; // ✅ Import Toastify

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.info(`${item.name} removed from cart`, {
                            autoClose: 2000,
                          });
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="text-end fw-bold">
                    Grand Total:
                  </td>
                  <td colSpan="2" className="fw-bold">
                    ${calculateTotal()}
                  </td>
                </tr>
              </tbody>
            </table>
            <Link to="/checkout" className="btn btn-primary">
              Proceed to Checkout
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
