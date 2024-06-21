import { Button, Divider, Flex, Image, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  resetStateOrder,
} from "../../../provider/features/order/OrderSlice";
import { Card, Descriptions, Space } from "antd";
import DownloadImages from "../../../components/Downloader/DownloadImages";

const OrderViewUser = (props) => {
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
      width={1000}
      title="Order Details"
      open={open}
      footer={
        <Button type="primary" onClick={handleOk}>
          Close
        </Button>
      }
      onCancel={handleCancel}
    >
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
                <Divider orientation="left">{item.product.name}</Divider>
                <Descriptions
                  bordered
                  size={"small"}
                  items={[
                    {
                      key: index,
                      label: "Name",
                      children: item.product.name,
                    },
                    {
                      key: index,
                      label: "Quantity",
                      children: item.quantity,
                    },
                    {
                      key: index,
                      label: "Images",
                      children: (
                        <Flex justify="space-around" align="center">
                          <Image.PreviewGroup
                            items={item.image.map((image, index) => {
                              return {
                                src: `${
                                  import.meta.env.VITE_SERVER_URL
                                }/${image}`,
                                crossOrigin: import.meta.env.VITE_CLIENT_URL,
                                loading: "lazy",
                              };
                            })}
                          >
                            <Image
                              width={60}
                              height={60}
                              style={{ objectFit: "contain" }}
                              crossOrigin={import.meta.env.VITE_CLIENT_URL}
                              loading="lazy"
                              src={`${import.meta.env.VITE_SERVER_URL}/${
                                item.image[0]
                              }`}
                            />
                          </Image.PreviewGroup>
                          <DownloadImages imageUrls={item.image} />
                        </Flex>
                      ),
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
export default OrderViewUser;

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
