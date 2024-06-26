import React from "react";
import { Typography, Statistic, Row, Col, Card, Table, Tag } from "antd";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";

const { Title } = Typography;

const OverViewPage = () => {
  return (
    <div className="overview-page">
      <BreadCrumb titles={["Home", "Overview"]} />
      <Title level={2}>Overview</Title>
      <div className="site-layout-content">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic title="Total Orders" value={152} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Total Revenue" value={25678.45} precision={2} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Active Users" value={312} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="New Contacts" value={12} />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "24px" }}>
          <Col span={12}>
            <Card title="Recent Orders">
              <Table
                dataSource={[
                  {
                    key: "1",
                    orderId: "OD12348",
                    customerName: "Alice Johnson",
                    date: "2024-06-22",
                    status: "completed",
                  },
                  {
                    key: "2",
                    orderId: "OD12349",
                    customerName: "Bob Smith",
                    date: "2024-06-21",
                    status: "completed",
                  },
                  {
                    key: "3",
                    orderId: "OD12350",
                    customerName: "Eve Adams",
                    date: "2024-06-20",
                    status: "pending",
                  },
                ]}
                columns={[
                  { title: "Order ID", dataIndex: "orderId", key: "orderId" },
                  {
                    title: "Customer",
                    dataIndex: "customerName",
                    key: "customerName",
                  },
                  { title: "Date", dataIndex: "date", key: "date" },
                  {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (status) => (
                      <Tag color={status === "completed" ? "green" : "blue"}>
                        {status}
                      </Tag>
                    ),
                  },
                ]}
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Popular Products">
              <Table
                dataSource={[
                  {
                    key: "1",
                    productName: "Business Cards",
                    price: 20.0,
                    quantitySold: 55,
                  },
                  {
                    key: "2",
                    productName: "Brochures",
                    price: 45.0,
                    quantitySold: 42,
                  },
                  {
                    key: "3",
                    productName: "Posters",
                    price: 15.0,
                    quantitySold: 78,
                  },
                ]}
                columns={[
                  {
                    title: "Product Name",
                    dataIndex: "productName",
                    key: "productName",
                  },
                  { title: "Price", dataIndex: "price", key: "price" },
                  {
                    title: "Quantity Sold",
                    dataIndex: "quantitySold",
                    key: "quantitySold",
                  },
                ]}
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
