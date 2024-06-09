import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";

import {
  deleteContact,
  getContacts,
  resetStateContact,
} from "../../../provider/features/contact/ContactSlice";
import { Button, Table, notification } from "antd";
import { Image } from "antd";
import { Link } from "react-router-dom";
import Confirmation from "../../../components/CustomAlert/Confirmation";
import { icons } from "antd/es/image/PreviewGroup";
import ContactRespond from "./respondContact";


const ContactIndex = () => {
  const [open, setOpen] = useState(false);
  const [RespondId, setRespondId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [ContactModal, setContactModal] = useState(false);
  const { contacts, getContactsState, deleteContactState } = useSelector(
    (state) => state.contact
  );
  const data = [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (contacts.length == 0) {
      dispatch(getContacts());
    } else {
      dispatch(resetStateContact());
    }
  }, []);

  useEffect(() => {
    if (deleteContactState.isSuccess) {
      notification.open({
        description: deleteContactState.message,
        duration: 3,
        type: "success",
      });
    }
    if (deleteContactState.isError) {
      notification.open({
        description: deleteContactState.message,
        duration: 3,
        type: "error",
      });
    }
  }, [deleteContactState.isSuccess, deleteContactState.isError]);

  const deleteRecord = (e) => {
    dispatch(deleteContact(deleteId));
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };

  for (let i = 0; i < contacts.length; i++) {
    data.push({
      key: i,
      name: contacts[i].name,
      email: contacts[i].email,
      message: contacts[i].message,
      action: (
        <>  
          <span
            className="btn-delete"
            onClick={() => showModal(contacts[i].id)}
          >
            <AiFillDelete />
          </span>
          <span
            className="btn_respond"
            onClick={() => {
              setRespondId(contacts[i].id);
              setContactModal(true);
            }}
          >
           <Button
           type="primary"
           >
          Respond
           </Button>
          </span>
        </>
      ),
    });
  }
  const start = () => {
    dispatch(getContacts());
  };

  return (
    <div>
      <BreadCrumb titles={["Home", "Contact"]} />
      <h1>Contacts</h1>
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
          loading={getContactsState.isLoading}
        >
          Refresh Contacts
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={getContactsState.isLoading}
        scroll={{ x: 1000}}
      />
      <Confirmation
        setOpen={setOpen}
        open={open}
        performAction={() => {
          deleteRecord(deleteId);
        }}
        okType="danger"
        okText="Delete anyway!"
        description="Are you sure you want to delete this contact?"
        title="Confirmation"
        loading={deleteContactState.isLoading}
      />
        <ContactRespond
        open={ContactModal}
        setOpen={setContactModal}
        id={RespondId}
      />
    </div>
  );
};

export default ContactIndex;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "email",
    dataIndex: "email",
  },
  {
    title: "message",
    dataIndex: "message",
  },

  {
    title: "Actions",
    dataIndex: "action",
  },
];
