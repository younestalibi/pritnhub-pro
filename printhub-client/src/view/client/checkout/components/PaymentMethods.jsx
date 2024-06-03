import React, { useState } from "react";
import "./PaymentMethods.css";
import { FaCcPaypal } from "react-icons/fa6";
import { ImCreditCard } from "react-icons/im";

const PaymentMethods = ({ setCheckoutData, checkoutData }) => {
  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePaymentChange = (e) => {
    const paymentMethod = e.target.value;
    setSelectedPayment(paymentMethod);
    setCheckoutData((prevData) => ({
      ...prevData,
      paymentMethod: paymentMethod,
    }));
  };

  return (
    <>
      <div className="radio-inputs">
        <label>
          <input
            className="radio-input"
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={checkoutData.paymentMethod === "paypal"}
            onChange={handlePaymentChange}
          />
          <span className="radio-tile">
            <span className="radio-icon">
              <FaCcPaypal />
            </span>
            <span className="radio-label">Paypal</span>
          </span>
        </label>
        <label>
          <input
            className="radio-input"
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={checkoutData.paymentMethod === "creditCard"}
            onChange={handlePaymentChange}
          />
          <span className="radio-tile">
            <span className="radio-icon">
              <ImCreditCard />
            </span>
            <span className="radio-label">Credit Card</span>
          </span>
        </label>
      </div>
    </>
  );
};

export default PaymentMethods;
