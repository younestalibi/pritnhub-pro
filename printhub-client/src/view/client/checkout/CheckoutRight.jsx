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

const CheckoutRight = ({carts}) => {
  


  return (
    <div style={{ position: "sticky", top: "0px" }}>
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <h1>Total Price</h1>
        </Col>
        <Col>
          <h1>{calculateTotal(carts)}</h1>
        </Col>
      </Row>
      <Button
        block
        type="primary"
        style={{
          backgroundColor: "#c43b53",
          padding: "19px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={"/checkout"}>Checkout</Link>
      </Button>
    </div>
  );
};

export default CheckoutRight;
