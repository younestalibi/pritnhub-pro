import { useEffect } from "react";
import {
  getCartItems,
  resetStateCart,
} from "../../../provider/features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";

const CartIndex = () => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (carts.length == 0) {
      dispatch(getCartItems());
    } else {
      dispatch(resetStateCart());
    }
  }, []);

  return (
    <Row justify={"space-evenly"} align={"stretch"}>
      <Col md={{ span: 10 }} sm={{ span: 20 }}>
        hello world
      </Col>
      <Col md={{ span: 10 }} sm={{ span: 20 }}>
        hello world
      </Col>
    </Row>
  );
};

export default CartIndex;
