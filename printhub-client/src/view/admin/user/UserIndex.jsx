import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Button, Table, Typography, notification } from "antd";
import Confirmation from "../../../components/CustomAlert/Confirmation";
import {
  deleteUserById,
  getAllUser,
  resetStateUser,
} from "../../../provider/features/auth/AuthSlice";

const UserIndex = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const { users, getAllUsersState, deleteUserByIdState } = useSelector(
    (state) => state.auth
  );
  const data = [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length == 0) {
      dispatch(getAllUser());
    } else {
      dispatch(resetStateUser());
    }
  }, []);
  console.log(users);
  useEffect(() => {
    if (deleteUserByIdState.isSuccess) {
      setOpen(false);
      notification.open({
        description: deleteUserByIdState.message,
        duration: 3,
        type: "success",
      });
    }
    if (deleteUserByIdState.isError) {
      setOpen(false);
      notification.open({
        description: deleteUserByIdState.message,
        duration: 3,
        type: "error",
      });
    }
    dispatch(resetStateUser());
  }, [deleteUserByIdState.isSuccess, deleteUserByIdState.isError]);

  const deleteRecord = (e) => {
    dispatch(deleteUserById(deleteId));
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };
  for (let i = 0; i < users.length; i++) {
    data.push({
      key: users[i].id,
      name: users[i].name,
      email: users[i].email,
      phone_number: users[i]?.profile?.phone_number || "-------",
      country: users[i]?.profile?.country || "-------",
      city: users[i]?.profile?.city || "-------",
      website_link: users[i]?.profile?.website || "-------",
      action: (
        <>
          {users[i].role !== "admin" ? (
            <span className="btn-delete" onClick={() => showModal(users[i].id)}>
              <AiFillDelete />
            </span>
          ) : (
            <span>{users[i].role}</span>
          )}
        </>
      ),
    });
  }
  const start = () => {
    dispatch(getAllUser());
  };

  return (
    <div>
      <BreadCrumb titles={["Home", "Users"]} />
      <Typography.Title level={2}>Users</Typography.Title>
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
          loading={getAllUsersState.isLoading}
        >
          Refresh Users
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={getAllUsersState.isLoading}
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
        description="Are you sure you want to delete this User?"
        title="Confirmation"
        loading={deleteUserByIdState.isLoading}
      />
    </div>
  );
};

export default UserIndex;

const columns = [
  {
    title: "#ID",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
  },
  {
    title: "Country",
    dataIndex: "country",
  },
  {
    title: "City",
    dataIndex: "city",
  },
  {
    title: "Website Link",
    dataIndex: "website_link",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];
