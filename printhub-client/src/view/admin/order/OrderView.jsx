import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  createCatalog,
  resetStateCatalog,
  updateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getOrders,
  resetStateOrder,
} from "../../../provider/features/order/OrderSlice";

const OrderView = (props) => {
  const { open, setOpen, id } = props;

  const { orders, getOrdersState } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orders.length == 0) {
      dispatch(getOrders());
    } else {
      dispatch(resetStateOrder());
    }
  }, []);

  useEffect(() => {
    if (id) {
      const foundOrder = orders.find((e) => e.id === id);
      if (foundOrder) {
        setOrder(foundOrder);
      }
      if (order) {
        console.log(order);
      }
    }
  }, [open, order]);

  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Order Details"
      open={open}
      footer={
        <Button type="primary" onClick={handleOk}>
          Reload
        </Button>
      }
      onCancel={handleCancel}
    >
      <h1>order detail</h1>
    </Modal>
  );
};
export default OrderView;
