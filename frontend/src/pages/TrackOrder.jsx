import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TrackOrder.css";
import Navbar from "../components/Navbar";

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const orderData = {
    id: orderId || "Y34XDHR",
    expectedArrival: " 15/08/25",
    trackingNumber: "23409456724243242898",
    steps: [
      { label: "Order Processed", icon: "📋", completed: true },
      { label: "Order Shipped", icon: "📦", completed: false },
      { label: "Order En Route", icon: "🚚", completed: false },
      { label: "Order Arrived", icon: "🏠", completed: false },
    ],
  };

  return (
    <>
    <Navbar/>
    <div className="track-bg">
      {/* Card */}
      <div className="track-card">
        {/* Header */}
        <div className="track-header">
          <h4>
            ORDER <span className="order-link">#{orderData.id}</span>
          </h4>
          <div className="track-details">
            <p>Expected Arrival {orderData.expectedArrival}</p>
            <p>
              USPS <strong>{orderData.trackingNumber}</strong>
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-wrapper">
          {orderData.steps.map((step, index) => {
            const isProcessed = index === 0 && step.completed;
            return (
              <div key={index} className="progress-step">
                <div className={`circle ${isProcessed ? "completed" : ""}`}>
                  {isProcessed ? "✔" : ""}
                </div>
                {index < orderData.steps.length - 1 && (
                  <div className={`bar ${index === 0 ? "completed" : ""}`}></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step labels */}
        <div className="step-labels">
          {orderData.steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-icon">{step.icon}</div>
              <p>{step.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Go Home Button BELOW card */}
      <div className="go-home-btn">
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    </div>
    </>
  );
};

export default TrackOrder;
