import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import {
  Button,
  Input,
  Select,
  Space,
  Table,
  Typography,
  notification,
} from "antd";
import Confirmation from "../../../components/CustomAlert/Confirmation";
import {
  deleteOrderById,
  getOrders,
  resetStateOrder,
  updateOrderStatus,
} from "../../../provider/features/order/OrderSlice";
import OrderView from "./OrderView";
import { calculateTotalPrice } from "../../../utils/functions";
import { SearchOutlined } from "@ant-design/icons";

const OrderIndex = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const {
    orders,
    getOrdersState,
    updateOrderStatusState,
    deleteOrderByIdState,
  } = useSelector((state) => state.order);
  const data = [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (orders.length == 0) {
      dispatch(getOrders());
    } else {
      dispatch(resetStateOrder());
    }
  }, []);

  useEffect(() => {
    if (updateOrderStatusState.isSuccess) {
      notification.open({
        description: updateOrderStatusState.message,
        duration: 3,
        type: "success",
      });
    }
    if (updateOrderStatusState.isError) {
      notification.open({
        description: updateOrderStatusState.message,
        duration: 3,
        type: "error",
      });
    }
    dispatch(resetStateOrder());
  }, [updateOrderStatusState.isSuccess, updateOrderStatusState.isError]);

  const deleteRecord = (e) => {
    dispatch(deleteOrderById(deleteId));
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };

  for (let i = 0; i < orders.length; i++) {
    data.push({
      key: orders[i].id,
      payment_id: orders[i].order_payment_id,
      total_amount: `${calculateTotalPrice(orders[i].OrderItems).toFixed(2)}$`,
      items: `${orders[i].OrderItems.length} items`,
      status: (
        // orders[i].status == "cancelled" ? (
        //   <b style={{ color: "black" }}>Cancelled</b>
        // ) : orders[i].status == "done" ? (
        //   <b style={{ color: "blue" }}>Done</b>
        // ) :
        <Select
          defaultValue={orders[i].status}
          loading={updateOrderStatusState.isLoading && orders[i].id == editId}
          style={{
            width: 120,
          }}
          onChange={(status) => {
            setEditId(orders[i].id);
            dispatch(
              updateOrderStatus({ id: orders[i].id, status: { status } })
            );
          }}
          options={[
            {
              value: "pending",
              label: <b style={{ color: "red" }}>Pending</b>,
              disabled: [
                "completed",
                "cancelled",
                "processing",
                "shipped",
                "delivered",
              ].includes(orders[i].status),
            },
            {
              value: "completed",
              label: <b style={{ color: "green" }}>Confirmed</b>,
              disabled: [
                "cancelled",
                "processing",
                "shipped",
                "delivered",
              ].includes(orders[i].status),
            },
            {
              value: "cancelled",
              label: <b>Cancelled</b>,
              disabled: [
                "completed",
                "processing",
                "shipped",
                "delivered",
              ].includes(orders[i].status),
            },
            {
              value: "processing",
              label: <b>Processing</b>,
              disabled: [
                "cancelled",
                "shipped",
                "pending",
                "delivered",
              ].includes(orders[i].status),
            },
            {
              value: "shipped",
              label: <b>Shipped</b>,
              disabled: [
                "cancelled",
                "pending",
                "completed",
                "delivered",
              ].includes(orders[i].status),
            },
            {
              value: "delivered",
              label: <b>Delivered</b>,
              disabled: [
                "cancelled",
                "pending",
                "completed",
                "processing",
              ].includes(orders[i].status),
            },
          ]}
        />
      ),
      created_at: new Date(orders[i].createdAt).toLocaleDateString(),
      action: (
        <>
          <span
            onClick={() => {
              setViewId(orders[i].id);
              setViewOrderModal(true);
            }}
            className="btn-view"
          >
            <IoEyeOutline title="view" />
          </span>
          {!["completed", "pending", "done"].includes(orders[i].status) && (
            <span
              className="btn-delete"
              onClick={() => showModal(orders[i].id)}
            >
              <AiFillDelete title="delete" />
            </span>
          )}
        </>
      ),
    });
  }
  const start = () => {
    dispatch(getOrders());
  };
  return (
    <div>
      <BreadCrumb titles={["Home", "Order"]} />
      <Typography.Title level={2}>Orders</Typography.Title>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="dashed"
          onClick={start}
          loading={getOrdersState.isLoading}
        >
          Refresh Orders
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={getOrdersState.isLoading}
        scroll={{ x: 1000 }}
      />
      <Confirmation
        setOpen={setOpen}
        open={open}
        performAction={() => {
          deleteRecord(deleteId);
        }}
        okType="danger"
        okText="Delete anyway!"
        description="Are you sure you want to delete this Order?"
        title="Confirmation"
        loading={deleteOrderByIdState.isLoading}
      />

      <OrderView
        setOpen={setViewOrderModal}
        open={viewOrderModal}
        id={viewId}
      />
    </div>
  );
};

export default OrderIndex;

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
    title: "Created At",
    dataIndex: "created_at",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];
