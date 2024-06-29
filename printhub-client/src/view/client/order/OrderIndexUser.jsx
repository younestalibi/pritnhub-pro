import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../../provider/features/order/OrderSlice";
import { Button, Divider, Input, Select, Space, Table, Typography } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { calculateTotalPrice } from "../../../utils/functions";
import { SearchOutlined } from "@ant-design/icons";
import Container from "../../../components/common/container/Container";
import OrderViewUser from "./OrderViewUser";

const OrderIndexUser = () => {
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const [viewId, setViewId] = useState(null);
  const { userOrders, getUserOrdersState } = useSelector(
    (state) => state.order
  );
  const data = [];

  console.log(userOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  for (let i = 0; i < userOrders.length; i++) {
    data.push({
      key: i + 1,
      payment_id: userOrders[i].order_payment_id,
      total_amount: `${calculateTotalPrice(userOrders[i].OrderItems).toFixed(
        2
      )}$`,
      items: `${userOrders[i].OrderItems.length} items`,
      status:
        userOrders[i].status == "completed" ? (
          <b style={{ color: "green" }}>Confirmed</b>
        ) : userOrders[i].status == "cancelled" ? (
          <b>Cancelled</b>
        ) : userOrders[i].status == "processing" ? (
          <b>Processing</b>
        ) : userOrders[i].status == "shipped" ? (
          <b>Shipped</b>
        ) : userOrders[i].status == "delivered" ? (
          <b>Delivered</b>
        ) : (
          <b style={{ color: "red" }}>Pending</b>
        ),
     
      action: (
        <>
          <span
            onClick={() => {
              setViewId(userOrders[i].id);
              setViewOrderModal(true);
            }}
            className="btn-view"
          >
            <IoEyeOutline title="view" />
          </span>
        </>
      ),
    });
  }
  return (
    <Container>
      <Divider orientation="left">
        <Typography.Title>Orders</Typography.Title>
      </Divider>
      <Table
        columns={columns}
        dataSource={data}
        loading={getUserOrdersState.isLoading}
        scroll={{ x: 1000 }}
      />
      <OrderViewUser
        setOpen={setViewOrderModal}
        open={viewOrderModal}
        id={viewId}
      />{" "}
    </Container>
  );
};

export default OrderIndexUser;
const columns = [
  {
    title: "#ID",
    dataIndex: "key",
  },
  {
    title: "Payment-Id",
    dataIndex: "payment_id",
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm();
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record.payment_id.indexOf(value) === 0,
  },
  {
    title: "Total Amount",
    dataIndex: "total_amount",
  },
  {
    title: "Items Count",
    dataIndex: "items",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];
