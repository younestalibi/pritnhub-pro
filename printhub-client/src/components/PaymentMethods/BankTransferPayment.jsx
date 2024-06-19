import React, { useState } from "react";
import { Button, notification } from "antd";
import "./BankTransferPayment.css";
import CihLogo from "../../assets/images/cih-logo.png";
import axiosHttp from "../../utils/axios-client";
import { useDispatch } from "react-redux";
import { resetStateCartsCollection } from "../../provider/features/cart/CartSlice";
import { useNavigate } from "react-router-dom";
const BankTransferPayment = ({ orderData }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };
  const [transferDetails, setTransferDetails] = useState({
    referenceId: generateUniqueId(),
    ...orderData,
  });

  const handleConfirm = () => {
    console.log(transferDetails);
    axiosHttp
      .post("paypal/confirm-order-cih", {
        ...transferDetails,
      })
      .then((response) => {
        console.log(response);
        notification.open({
          description: "Your order is created successfully!",
          duration: 3,
          type: "success",
        });
        dispatch(resetStateCartsCollection());
        navigate('/success-payment', { state: { success:true } });

      })
      .catch((error) => {
        const message = error.response.data;
        if (message.error) {
          notification.open({
            description: message.error,
            duration: 3,
            type: "error",
          });
        }
      });
    // dispatch(confirmBankTransfer(orderDetails.orderId, transferDetails));
  };

  return (
    <div>
      <button className="cih-button">
        <span className="cih-button-text">Pay with</span>
        <img src={CihLogo} alt="Cih Logo" className="cih-logo" />
        <span className="cih-button-loader"></span>
      </button>
      <h2>Bank Transfer Payment</h2>
      <p>
        Please transfer the amount to the account below and do not forget to
        send us a screenshot of the transfer with the reference ID to out email
        or contact us via whatsApp
      </p>
      <hr />
      <div>
        <p>
          Your unique reference ID:{" "}
          <strong>{transferDetails.referenceId}</strong>
        </p>
        <p>
          Full Name: <strong>Printhub Pro</strong>
        </p>
        <p>
          RIB: <strong>{transferDetails.referenceId}</strong>
        </p>
        <p>
          Email: <strong>payments@yourcompany.com</strong>
        </p>
      </div>
      <Button type="primary" onClick={handleConfirm}>
        Confirm Your Order
      </Button>
    </div>
  );
};

export default BankTransferPayment;
