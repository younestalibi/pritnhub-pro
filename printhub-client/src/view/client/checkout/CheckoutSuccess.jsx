import React from "react";
import { Button, Result } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
const CheckoutSuccess = () => {
  const location = useLocation();
  if (!location.state || !location.state.success) {
    return <Navigate to="/" />;
  }
  return (
    <Result
      status="success"
      title="Order Successfully Placed!"
      subTitle={`Thank you for your purchase. Your items will be delivered within 1-3 business days.`}
      extra={[
        <Button type="primary" key="home">
          <Link to="/">Back to Home</Link>
        </Button>,
        // <Button key="orders">View Orders</Button>
      ]}
    />
  );
};
export default CheckoutSuccess;
