import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";

import {
  deleteCatalogById,
  getCatalogs,
  resetStateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import { Button, Select, Table, notification } from "antd";
import { Image } from "antd";
import { Link } from "react-router-dom";
import Confirmation from "../../../components/CustomAlert/Confirmation";
import CatalogCreate from "./CatalogCreate";
import { icons } from "antd/es/image/PreviewGroup";
import CatalogEdit from "./CatalogEdit";
import {
  deleteOrderById,
  getOrders,
  resetStateOrder,
  updateOrderStatus,
} from "../../../provider/features/order/OrderSlice";

const OrderIndex = () => {
  const [deleteId, setDeleteId] = useState(null);
  // const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  // const [createCatalogModal, setCreateCatalogModal] = useState(false);
  // const [editCatalogModal, setEditCatalogModal] = useState(false);
  const { orders, getOrdersState, updateOrderStatusState,deleteOrderByIdState } = useSelector(
    (state) => state.order
  );
  const data = [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (orders.length == 0) {
      dispatch(getOrders());
    } else {
      dispatch(resetStateOrder());
    }
  }, []);
  console.log(orders);

  useEffect(() => {
    if (updateOrderStatusState.isSuccess) {
      // setOpen(false);
      notification.open({
        description: updateOrderStatusState.message,
        duration: 3,
        type: "success",
      });
    }
    if (updateOrderStatusState.isError) {
      // setOpen(false);
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
  for (let i = 0; i < orders.length; i++) {
    data.push({
      key: orders[i].id,
      tracking_id: orders[i].tracking_id,
      total_amount: orders[i].total_amount,
      items: `${orders[i].OrderItems.length} items`,
      status: (
        <Select
          defaultValue={orders[i].status}
          loading={updateOrderStatusState.isLoading}
          style={{
            width: 120,
          }}
          onChange={(status) => {
            dispatch(
              updateOrderStatus({ id: orders[i].id, status: { status } })
            );
          }}
          options={[
            {
              value: "pending",
              label: "Pending",
            },
            {
              value: "Completed",
              label: "completed",
            },
            {
              value: "cancelled",
              label: "Cancelled",
            },
          ]}
        />
      ),
      action: (
        <>
          <span
            onClick={() => {
              // setEditId(catalogs[i].id);
              // setEditCatalogModal(true);
            }}
            className="btn-edit"
          >
            <BiEdit />
          </span>
          <span
            className="btn-delete"
            onClick={() => showModal(orders[i].id)}
          >
            <AiFillDelete />
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
      <CatalogCreate
      // setOpen={setCreateCatalogModal}
      // open={createCatalogModal}
      />
      <CatalogEdit
      // setOpen={setEditCatalogModal}
      // open={editCatalogModal}
      // id={editId}
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
