import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddresses,
  resetStateAddress,
} from "../../../provider/features/address/AddressSlice";
import { Card, Col, Flex, Row } from "antd";
import {
  getCartItems,
  resetStateCart,
} from "../../../provider/features/cart/CartSlice";
const { Meta } = Card;

const CheckoutStepOne = () => {
  const { addresses } = useSelector((state) => state.address);
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (carts.length == 0) {
      dispatch(getCartItems());
    } else {
      dispatch(resetStateCart());
    }
    if (addresses.length == 0) {
      dispatch(getAddresses());
    } else {
      dispatch(resetStateAddress());
    }
  }, []);

  console.log(addresses);

  return (
    <Row justify={"space-evenly"} align={"stretch"}>
      <Col lg={{ span: 14 }} md={{ span: 24 }}>
        kljj
      </Col>
      <Col lg={{ span: 8 }} md={{ span: 24 }}>
        <div style={{ position: "sticky", top: "0px" }}>
          {carts.map((item, index) => (
            <Row justify={"space-between"} align={"middle"}>
              <Col>jklasdf</Col>
              <Col>jklasdf</Col>
            </Row>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default CheckoutStepOne;
