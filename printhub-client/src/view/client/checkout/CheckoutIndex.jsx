import React, { useEffect, useState } from "react";
import {
  Button,
  message,
  Steps,
  Row,
  Col,
  List,
  Avatar,
  Image,
  Flex,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../../../provider/features/address/AddressSlice";
import {
  getCartItems,
  resetStateCart,
} from "../../../provider/features/cart/CartSlice";
import CheckoutStepOne from "./CheckoutStepOne";
import CheckoutStepTwo from "./CheckoutStepTwo";
import CheckoutStepThree from "./CheckoutStepThree"; // New step component
import CheckoutStepFour from "./CheckoutStepFour"; // New step component
import { calculateItemTotal, calculateTotal } from "../../../utils/functions";

const CheckoutIndex = () => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [checkoutData, setCheckoutData] = useState({
    addressId: null,
    paymentMethod: null,
  });

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const prev = () => {
    setCurrent(current - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (carts.length == 0) {
      dispatch(getCartItems());
    } else {
      dispatch(resetStateCart());
    }
  }, []);

  const steps = [
    {
      title: "Address Informations",
      content: (
        <CheckoutStepOne
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
      ),
    },
    {
      title: "Payment Method",
      content: (
        <CheckoutStepTwo
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
      ),
    },
    {
      title: "Review Order",

      content: <CheckoutStepThree checkoutData={checkoutData} carts={carts} />,
    },
    {
      title: "Place Order and Billing",
      content: <CheckoutStepFour checkoutData={checkoutData} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div style={{ width: "80%", minHeight: "80vh", margin: "auto" }}>
      <Steps type="navigation" current={current} items={items} />
      <Row gutter={50} justify={"space-evenly"}>
        <Col md={{ span: 7 }}>
          <div style={{ position: "sticky", top: "0px" }}>
            <h1>Total Price</h1>
            <Button style={{ fontWeight:'bold',textAlign:'left' }} block type="primary">{calculateTotal(carts)} DH</Button>
            <h3>Order Summary:</h3>
            <List
              dataSource={carts}
              renderItem={(item) => (
                <List.Item>
                  <Flex
                    style={{ width: "100%" }}
                    justify="space-around"
                    gap={20}
                    align="flex-start"
                  >
                    <Image
                      alt={item.Product.name}
                      width={80}
                      height={60}
                      style={{ objectFit: "cover" }}
                      crossOrigin={import.meta.env.VITE_CLIENT_URL}
                      loading="lazy"
                      src={`${import.meta.env.VITE_SERVER_URL}/${
                        item.Product.image
                      }`}
                    />
                    <List.Item.Meta
                      title={item.Product.name}
                      description={`Quantity: ${
                        item.quantity
                      } - Price: ${calculateItemTotal(item)}`}
                    />
                  </Flex>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col md={{ span: 17 }}>
          <div style={{ padding: "40px 0px" }}>{steps[current].content}</div>
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
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutIndex;


