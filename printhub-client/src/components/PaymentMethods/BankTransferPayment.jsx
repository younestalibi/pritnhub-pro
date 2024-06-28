import React, { useState, useEffect } from "react";
import { Button, Divider, notification, Typography } from "antd";
import "./BankTransferPayment.css";
import CihLogo from "../../assets/images/cih-logo.png";
import axiosHttp from "../../utils/axios-client";
import { useDispatch } from "react-redux";
import { resetStateCartsCollection } from "../../provider/features/cart/CartSlice";
import { useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;

const BankTransferPayment = ({ orderData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const [transferDetails, setTransferDetails] = useState({
    referenceId: generateUniqueId(),
    ...orderData,
  });

  const [bankDetails, setBankDetails] = useState({
    name: "Printhub Pro",
    rip: "123456789012345678901234",
    email: "payments@yourcompany.com",
  });

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axiosHttp.get("paypal/config-bank");
        setBankDetails(response.data);
      } catch (error) {
        console.error("Error fetching bank details:", error);
        notification.open({
          description: "Error fetching bank details. Please try again later.",
          duration: 3,
          type: "error",
        });
      }
    };

    fetchBankDetails();
  }, []);

  const handleConfirm = () => {
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
        navigate("/success-payment", { state: { success: true } });
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
  };

  return (
    <div>
      <button className="cih-button">
        <span className="cih-button-text">Pay with</span>
        <img src={CihLogo} alt="Cih Logo" className="cih-logo" />
        <span className="cih-button-loader"></span>
      </button>
      <Typography.Title level={3}>Bank Transfer Payment</Typography.Title>
      <Text>
        Please transfer the amount to the account below and do not forget to
        send us a screenshot of the transfer with the reference ID through email
        or contact us via WhatsApp
      </Text>
      <Divider orientation="left">Bank info</Divider>
      <div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Text>Your unique reference ID:</Text>
          <Paragraph strong={true} copyable>
            {transferDetails.referenceId}
          </Paragraph>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Text>Full Name:</Text>
          <Paragraph strong={true} copyable>
            {bankDetails.ownerName}
          </Paragraph>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Text>RIB:</Text>
          <Paragraph strong={true} copyable>
            {bankDetails.bankRip}
          </Paragraph>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Text>Email:</Text>
          <Paragraph strong={true} copyable>
            {bankDetails.email}
          </Paragraph>
        </div>
      </div>
      <Button type="primary" onClick={handleConfirm}>
        Confirm Your Order
      </Button>
    </div>
  );
};

export default BankTransferPayment;
