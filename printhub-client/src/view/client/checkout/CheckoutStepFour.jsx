import React from "react";
import { Button, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../provider/features/order/OrderSlice";
// import { createOrder } from "../../../provider/features/order/OrderSlice";

const CheckoutStepFour = ({ checkoutData }) => {
  const dispatch = useDispatch();

  const handleConfirmOrder = async () => {
    const orderData = {
      addressId: checkoutData.addressId,
      paymentMethod: checkoutData.paymentMethod,
    };
    dispatch(createOrder(orderData))
    console.log(orderData)

    try {
    //   await dispatch(createOrder(orderData));
      message.success("Order placed successfully!");
    } catch (error) {
      message.error("Failed to place the order.");
    }
  };

  return (
    <Card>
      <h2>Confirm Your Order</h2>
      <Button type="primary" onClick={handleConfirmOrder}>
        Confirm Order
      </Button>
    </Card>
  );
};

export default CheckoutStepFour;
