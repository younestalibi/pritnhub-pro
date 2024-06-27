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
import { Button, Table, Typography, notification } from "antd";
import Confirmation from "../../../components/CustomAlert/Confirmation";
import ContactRespond from "./respondContact";

const ContactIndex = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [contactModal, setContactModal] = useState(false);

  const { contacts, getContactsState, deleteContactState } = useSelector(
    (state) => state.contact
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (contacts.length === 0) {
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
    dispatch(resetStateContact());
  }, [deleteContactState.isSuccess, deleteContactState.isError]);

  const deleteRecord = (id) => {
    dispatch(deleteContact(id));
    setOpen(false);
  };

  const showModal = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleRespond = (contactEmail) => {
    setEmail(contactEmail);
    setContactModal(true);
  };

  const start = () => {
    dispatch(getContacts());
  };

  const data = contacts.map((contact, index) => ({
    key: index,
    name: contact.name,
    email: contact.email,
    message: contact.message,
    action: (
      <>
        <span className="btn-delete" onClick={() => showModal(contact.id)}>
          <AiFillDelete />
        </span>
        <span className="btn_respond">
          <Button type="primary" onClick={() => handleRespond(contact.email)}>
            Respond
          </Button>
        </span>
      </>
    ),
  }));

  return (
    <div>
      <BreadCrumb titles={["Home", "Contact"]} />
      <Typography.Title level={2}>Contacts</Typography.Title>

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
        scroll={{ x: 1000 }}
      />

      <Confirmation
        setOpen={setOpen}
        open={open}
        performAction={() => deleteRecord(deleteId)}
        okType="danger"
        okText="Delete anyway!"
        description="Are you sure you want to delete this contact?"
        title="Confirmation"
        loading={deleteContactState.isLoading}
      />

      <ContactRespond
        open={contactModal}
        setOpen={setContactModal}
        email={email}
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Message",
    dataIndex: "message",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];
