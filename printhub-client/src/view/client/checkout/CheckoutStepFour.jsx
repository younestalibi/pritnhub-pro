import React, { useEffect } from "react";
import { Button, Card, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../provider/features/order/OrderSlice";
import { resetStateCartsCollection } from "../../../provider/features/cart/CartSlice";
// import { createOrder } from "../../../provider/features/order/OrderSlice";

const CheckoutStepFour = ({ checkoutData }) => {
  const { orders, createOrderState } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const handleConfirmOrder = async () => {
    const orderData = {
      addressId: checkoutData.addressId,
      paymentMethod: checkoutData.paymentMethod,
    };
    dispatch(createOrder(orderData));

    try {
      //   await dispatch(createOrder(orderData));
      message.success("Order placed successfully!");
    } catch (error) {
      message.error("Failed to place the order.");
    }
  };

  useEffect(() => {
    if (createOrderState.isSuccess) {
    //   dispatch(resetStateCartsCollection());
      notification.open({
        description: createOrderState.message,
        duration: 3,
        type: "success",
      });
    }
    if (createOrderState.isError) {
      notification.open({
        description: createOrderState.message,
        duration: 3,
        type: "error",
      });
    }
  }, [createOrderState.isSuccess, createOrderState.isError]);

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
