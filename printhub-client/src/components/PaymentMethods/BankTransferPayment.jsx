import React, { useState } from "react";
import { Button, Divider, Flex, notification, Typography } from "antd";
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
        or contact us via whatsApp
      </Text>
      <Divider orientation="left">Bank info</Divider>
      <div>
        <Flex gap={20}>
          <Text>Your unique reference ID: </Text>
          <Paragraph strong={true} copyable>
            {transferDetails.referenceId}
          </Paragraph>
        </Flex>
        <Flex gap={20}>
          <Text>Full Name:</Text>
          <Paragraph strong={true} copyable>
            Printhub Pro
          </Paragraph>
        </Flex>
        <Flex gap={20}>
          <Text>RIB:</Text>
          <Paragraph strong={true} copyable>
            {transferDetails.referenceId}
          </Paragraph>
        </Flex>
        <Flex gap={20}>
          <Text>Email:</Text>
          <Paragraph strong={true} copyable>
            payments@yourcompany.com
          </Paragraph>
        </Flex>
      </div>
      <Button type="primary" onClick={handleConfirm}>
        Confirm Your Order
      </Button>
    </div>
  );
};

export default BankTransferPayment;
