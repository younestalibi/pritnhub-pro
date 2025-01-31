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
import CheckoutStepThree from "./CheckoutStepThree";
import CheckoutStepFour from "./CheckoutStepFour";
import { calculateItemTotal, calculateTotal } from "../../../utils/functions";
import useAuth from "../../../hooks/useAuth";

const CheckoutIndex = () => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [checkoutData, setCheckoutData] = useState({
    shippingAddress: null,
    paymentMethod: null,
  });

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
    window.scrollTo(0, 0);
  };
  const prev = () => {
    setCurrent(current - 1);
    window.scrollTo(0, 0);
  };
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (carts.length == 0 && isAuthenticated) {
      dispatch(getCartItems());
    } else {
      dispatch(resetStateCart());
    }
  }, []);

  if (carts.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>No items in cart</h1>
        <p>Please add items to your cart to proceed with checkout.</p>
      </div>
    );
  }
  const steps = [
    {
      title: "Address Informations",
      content: (
        <CheckoutStepOne
          next={next}
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
      ),
    },
    {
      title: "Payment Method",
      content: (
        <CheckoutStepTwo
          next={next}
          prev={prev}
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
      ),
    },
    {
      title: "Review Order",

      content: (
        <CheckoutStepThree
          next={next}
          prev={prev}
          checkoutData={checkoutData}
          carts={carts}
        />
      ),
    },
    {
      title: "Place Order and Billing",
      content: <CheckoutStepFour prev={prev} checkoutData={checkoutData} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div style={{ width: "80%", minHeight: "80vh", margin: "auto" }}>
      <Steps current={current} items={items} />
      <Row gutter={50} justify={"space-evenly"}>
        <Col span={24} sm={24} md={{ span: 12 }} lg={{ span: 9 }}>
          <div style={{ position: "sticky", top: "0px" }}>
            <h1>Total Price</h1>
            <Button
              style={{ fontWeight: "bold", textAlign: "left" }}
              block
              type="primary"
            >
              {calculateTotal(carts).toFixed(2)}$
            </Button>
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
                    <Image.PreviewGroup
                      items={item.Product.image.map((image, index) => {
                        return {
                          src: `${import.meta.env.VITE_SERVER_URL}/${image}`,
                          crossOrigin: import.meta.env.VITE_CLIENT_URL,
                          loading: "lazy",
                          alt: item.Product.name,
                        };
                      })}
                    >
                      <Image
                        alt={item.Product.name}
                        width={60}
                        height={60}
                        style={{ objectFit: "contain" }}
                        crossOrigin={import.meta.env.VITE_CLIENT_URL}
                        loading="lazy"
                        src={`${import.meta.env.VITE_SERVER_URL}/${
                          item.Product.image[0]
                        }`}
                      />
                    </Image.PreviewGroup>

                    <List.Item.Meta
                      title={item.Product.name}
                      description={`Quantity: ${
                        item.quantity
                      } - Price: ${calculateItemTotal(item).toFixed(2)}$`}
                    />
                  </Flex>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col span={24} sm={24} md={{ span: 12 }} lg={{ span: 15 }}>
          <div style={{ padding: "40px 0px" }}>{steps[current].content}</div>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutIndex;
