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
import { Card, Descriptions, Spin, Space } from "antd";

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
  // <Descriptions bordered>
  //   <Descriptions.Item label="Order Payment ID">
  //     {order.order_payment_id}
  //   </Descriptions.Item>
  //   <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
  //   <Descriptions.Item label="Payment Method">
  //     {order.payment_method}
  //   </Descriptions.Item>
  //   <Descriptions.Item label="Tracking ID">
  //     {order.tracking_id}
  //   </Descriptions.Item>
  //   <Descriptions.Item label="Created At">{order.createdAt}</Descriptions.Item>
  //   <Descriptions.Item label="Updated At">{order.updatedAt}</Descriptions.Item>
  // </Descriptions>;

  return (
    <Modal
      width={1000}
      title="Order Details"
      open={open}
      footer={
        <Button type="primary" onClick={handleOk}>
          Reload
        </Button>
      }
      onCancel={handleCancel}
    >
      <h1>Order Details</h1>
      {order && (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Card title={`Order ID: ${order.id}`}>
            <Descriptions
              bordered
              size={"small"}
              items={[
                {
                  key: "1",
                  label: "order_payment_id",
                  children: order.order_payment_id,
                  span: 2,
                },
                {
                  key: "2",
                  label: "Status",
                  children: order.status,
                  span: 2,
                },
                {
                  key: "3",
                  label: "payment_method",
                  children: order.payment_method,
                  span: 2,
                },
                {
                  key: "4",
                  label: "tracking_id",
                  children: order.tracking_id,
                  span: 2,
                },
              ]}
            />
          </Card>

          <Card title="Shipping Address">
            <Descriptions
              bordered
              size={"small"}
              items={[
                {
                  key: "1",
                  label: "firstName",
                  children: order.address.firstName,
                },
                {
                  key: "2",
                  label: "lastName",
                  children: order.address.lastName,
                },
                {
                  key: "3",
                  label: "company",
                  children: order.address.company,
                },
                {
                  key: "4",
                  label: "address1",
                  children: order.address.address1,
                },
                {
                  key: "5",
                  label: "address2",
                  children: order.address.address2,
                },
                {
                  key: "6",
                  label: "city",
                  children: order.address.city,
                },
                {
                  key: "7",
                  label: "country",
                  children: order.address.country,
                },
                {
                  key: "8",
                  label: "phone",
                  children: order.address.phone,
                },
                {
                  key: "9",
                  label: "postal_code",
                  children: order.address.postal_code,
                },
              ]}
            />
          </Card>

          <Card title="Order Items">
            {order.OrderItems.map((item, index) => (
              <>
                <Descriptions
                  bordered
                  title={item.product.name}
                  size={"small"}
                  items={[
                    {
                      key: index,
                      label: "Name",
                      children: item.product.name,
                      span:3,
                      colon:false
                    },
                    {
                      key: index,
                      label: "Quantity",
                      children: item.quantity,
                      colon:true
                    },
                    {
                      key: index,
                      label: "Price",
                      children: `${item.price}$`,
                    },
                    ...Object.keys(item.customizations).map((key) => {
                      return {
                        key: key,
                        label: key,
                        children: item.customizations[key],
                      };
                    }),
                  ]}
                />
              </>
            ))}
          </Card>
        </Space>
      )}
    </Modal>
  );
};
export default OrderView;

// const bordseredItems = [
// {
//   key: "1",
//   label: "firstName",
//   children: order.address.firstName,
// },
//   {
//     key: "2",
//     label: "lastName",
//     children: order.address.lastName,
//   },
//   {
//     key: "3",
//     label: "company",
//     children: order.address.company,
//   },
//   {
//     key: "4",
//     label: "address1",
//     children: order.address.address1,
//   },
//   {
//     key: "5",
//     label: "address2",
//     children: order.address.address2,
//   },
//   {
//     key: "6",
//     label: "city",
//     children: order.address.city,
//   },
//   {
//     key: "7",
//     label: "country",
//     children: order.address.country,
//   },
//   {
//     key: "8",
//     label: "phone",
//     children: order.address.phone,
//   },
//   {
//     key: "9",
//     label: "postal_code",
//     children: order.address.postal_code,
//   },
// ];
