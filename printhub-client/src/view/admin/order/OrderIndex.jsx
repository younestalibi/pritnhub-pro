import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Button, Select, Table, notification } from "antd";
import Confirmation from "../../../components/CustomAlert/Confirmation";
import {
  deleteOrderById,
  getOrders,
  resetStateOrder,
  updateOrderStatus,
} from "../../../provider/features/order/OrderSlice";
import OrderView from "./OrderView";
import { calculateTotalPrice } from "../../../utils/functions";

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
  }, [updateOrderStatusState.isSuccess, updateOrderStatusState.isError]);

  const deleteRecord = (e) => {
    dispatch(deleteOrderById(deleteId));
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };
  const getDisplayStatus = (status) => {
    return status === "pending"
      ? <b style={{ color: "red" }}>Pending</b>
      : status === "completed"
      ? <b style={{ color: "green" }}>Completed</b>
      : status === "cancelled"
      ? <b style={{ color: "black" }}>Cancelled</b>
      : "unkonwn";
  };
  for (let i = 0; i < orders.length; i++) {
    data.push({
      key: orders[i].id,
      tracking_id: orders[i].tracking_id,
      total_amount: `${calculateTotalPrice(orders[i].OrderItems).toFixed(2)}$`,
      items: `${orders[i].OrderItems.length} items`,
      status: getDisplayStatus(orders[i].status),
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
          <span className="btn-delete" onClick={() => showModal(orders[i].id)}>
            <AiFillDelete title="delete" />
          </span>
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
      <h1>Orders</h1>
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
    title: "Tracking-Id",
    dataIndex: "tracking_id",
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
