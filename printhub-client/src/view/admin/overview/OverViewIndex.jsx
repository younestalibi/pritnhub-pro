import React, { useEffect } from "react";
import { Typography, Statistic, Row, Col, Card, Table, Tag, Image } from "antd";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  resetStateOrder,
} from "../../../provider/features/order/OrderSlice";
import { calculateTotalPrice } from "../../../utils/functions";
import {
  getProducts,
  resetStateProduct,
} from "../../../provider/features/product/ProductSlice";
import {
  getContacts,
  resetStateContact,
} from "../../../provider/features/contact/ContactSlice";
import {
  getAllUser,
  resetStateUser,
} from "../../../provider/features/auth/AuthSlice";

const { Title } = Typography;

const OverViewPage = () => {
  const { orders, getOrdersState } = useSelector((state) => state.order);
  const { products, getProductsState } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { contacts, getContactsState } = useSelector((state) => state.contact);
  const { users, getAllUsersState } = useSelector((state) => state.auth);

  useEffect(() => {
    if (users.length == 0) {
      dispatch(getAllUser());
    } else {
      dispatch(resetStateUser());
    }
    if (contacts.length === 0) {
      dispatch(getContacts());
    } else {
      dispatch(resetStateContact());
    }
    if (products.length == 0) {
      dispatch(getProducts());
    } else {
      dispatch(resetStateProduct());
    }
    if (orders.length == 0) {
      dispatch(getOrders());
    } else {
      dispatch(resetStateOrder());
    }
  }, []);

  const totalPriceCompletedOrders = orders.reduce((total, order) => {
    if (["completed", "done"].includes(order.status)) {
      return total + calculateTotalPrice(order.OrderItems);
    }
    return total;
  }, 0);
  const confirmedOrdersCount = orders.filter(
    (order) => order.status === "completed"
  ).length;
  const completedOrdersCount = orders.filter(
    (order) => order.status === "delivered"
  ).length;
  const pendingOrdersCount = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const contactCount = contacts?.length;
  const usersCount = users?.length;
  const orderData = [];
  const productData = [];
  for (let i = 0; i < orders.length; i++) {
    orderData.push({
      key: orders[i].id,
      payment_id: orders[i].order_payment_id,
      total_amount: `${calculateTotalPrice(orders[i].OrderItems).toFixed(2)}$`,
      items: `${orders[i].OrderItems.length} items`,
      status:
        orders[i].status == "completed" ? (
          <b style={{ color: "green" }}>Confirmed</b>
        ) : orders[i].status == "cancelled" ? (
          <b>Cancelled</b>
        ) : orders[i].status == "processing" ? (
          <b>Processing</b>
        ) : orders[i].status == "shipped" ? (
          <b>Shipped</b>
        ) : orders[i].status == "delivered" ? (
          <b>Delivered</b>
        ) : (
          <b style={{ color: "red" }}>Pending</b>
        ),
      created_at: new Date(orders[i].createdAt).toLocaleDateString(),
    });
  }

  const productsCopy = [...products];
  productsCopy.sort((a, b) => b.sold - a.sold);
  for (let i = 0; i < productsCopy.length; i++) {
    productData.push({
      key: productsCopy[i].id,
      name: productsCopy[i].name,
      price: `${productsCopy[i].price}$`,
      quantity: productsCopy[i].quantity.max,
      image: (
        <Image.PreviewGroup
          items={productsCopy[i].image.map((image, index) => {
            return {
              src: `${import.meta.env.VITE_SERVER_URL}/${image}`,
              crossOrigin: import.meta.env.VITE_CLIENT_URL,
              loading: "lazy",
              alt: productsCopy[i].name,
            };
          })}
        >
          <Image
            alt={productsCopy[i].name}
            width={30}
            height={30}
            style={{ objectFit: "contain" }}
            crossOrigin={import.meta.env.VITE_CLIENT_URL}
            loading="lazy"
            src={`${import.meta.env.VITE_SERVER_URL}/${
              productsCopy[i].image[0]
            }`}
          />
        </Image.PreviewGroup>
      ),
      sold: productsCopy[i].sold,
    });
  }
  return (
    <div className="overview-page">
      <BreadCrumb titles={["Home", "Overview"]} />
      <Title level={2}>Overview</Title>
      <div className="site-layout-content">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <Statistic
                title="Pending Orders"
                value={pendingOrdersCount && pendingOrdersCount}
                suffix="pending"
                loading={getOrdersState.isLoading}
                valueStyle={{
                  color: "#cf1322",
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <Statistic
                title="Confirmed Orders"
                value={confirmedOrdersCount && confirmedOrdersCount}
                suffix="confirmed"
                loading={getOrdersState.isLoading}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <Statistic
                title="Delivered Orders"
                value={completedOrdersCount && completedOrdersCount}
                suffix="delivered"
                loading={getOrdersState.isLoading}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <Statistic
                title="Total Revenue"
                value={
                  totalPriceCompletedOrders &&
                  totalPriceCompletedOrders.toFixed(2)
                }
                loading={getOrdersState.isLoading}
                suffix="$"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <Statistic title="Active Users" suffix="users" loading={getAllUsersState.isLoading} value={usersCount} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <Statistic
                title="New Messages"
                value={contactCount}
                suffix="messages"
                loading={getContactsState.isLoading}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
          <Col xs={24} lg={12}>
            <Card title="Recent Orders">
              <Table
                scroll={{ x: 1000 }}
                dataSource={orderData}
                columns={OrderColumns}
                loading={getOrdersState.isLoading}
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Popular Products">
              <Table
                style={{
                  padding: "0px",
                }}
                scroll={{ x: 1000 }}
                dataSource={productData}
                columns={ProductColumns}
                loading={getProductsState.isLoading}
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OverViewPage;

const OrderColumns = [
  {
    title: "#ID",
    dataIndex: "key",
  },
  {
    title: "Total Amount",
    dataIndex: "total_amount",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Items Count",
    dataIndex: "items",
  },
  {
    title: "Payment-Id",
    dataIndex: "payment_id",
  },
];

const ProductColumns = [
  {
    title: "#ID",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Sold",
    dataIndex: "sold",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
  },

  {
    title: "Image",
    dataIndex: "image",
  },
];
