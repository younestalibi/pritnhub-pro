import React, { useEffect, useState } from "react";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, message, Steps, theme, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../../../provider/features/address/AddressSlice";
import CheckoutStepOne from "./CheckoutStepOne";
import {
  getCartItems,
  resetStateCart,
} from "../../../provider/features/cart/CartSlice";

const CheckoutIndex = () => {
  const { carts, deleteItemByIdState, getCartItemsState, clearCartState } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  useEffect(() => {
    if (carts.length == 0) {
      dispatch(getCartItems());
    } else {
      dispatch(resetStateCart());
    }
  }, []);

  return (
    <div style={{ width: "80%", minHeight: "80vh", margin: "auto" }}>
      <Steps current={current} items={items} />

      <Row gutter={20} justify={"space-evenly"}>
        <Col md={{ span: 17 }}>{steps[current].content}</Col>
        <Col md={{ span: 7 }}>
          <div style={{ position: "sticky", top: "0px" }}>
            <Row justify={"space-between"} align={"middle"}>
              <Col>
                <h1>Total Price</h1>
              </Col>
              <Col>
                <h1>{calculateTotal(carts)}</h1>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};
export default CheckoutIndex;
const steps = [
  {
    title: "Address Informations",
    content: <CheckoutStepOne />,
  },
  {
    title: "Payment Method",
    content: "Second-content",
  },
  {
    title: "Billing",
    content: "Last-content",
  },
  {
    title: "Finished",
    content: "Done",
    status:'done'
  },
];
const calculateItemTotal = (item) => {
  const basePrice = parseFloat(item.Product.price);
  const quantity = item.quantity;

  // Calculate the total price adjustment for customizations
  const customizationTotal = Object.keys(item.customizations).reduce(
    (sum, key) => {
      const customizationValue = item.customizations[key];
      const option = item.Product.options.find((opt) => opt.name === key);

      if (option) {
        if (Array.isArray(customizationValue)) {
          // For checkbox type customizations
          const adjustments = customizationValue.reduce((acc, value) => {
            const choice = option.choices.find(
              (choice) => choice.value === value
            );
            return acc + (choice ? parseFloat(choice.priceAdjustment) : 0);
          }, 0);
          return sum + adjustments;
        } else {
          // For text, number, select, radio type customizations
          const choice = option.choices
            ? option.choices.find(
                (choice) => choice.value === customizationValue
              )
            : null;
          return sum + (choice ? parseFloat(choice.priceAdjustment) : 0);
        }
      }

      return sum;
    },
    0
  );

  // Calculate total price for the item
  const itemTotal = (basePrice + customizationTotal) * quantity;
  return itemTotal;
};

// Function to calculate total price for all items in the cart
const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const itemTotal = calculateItemTotal(item);
    return total + itemTotal;
  }, 0);
};
////////
