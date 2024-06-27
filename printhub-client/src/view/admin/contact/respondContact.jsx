import { Button, Input, Modal, notification } from "antd";
import "../../../App.css";
import TextArea from "antd/es/input/TextArea";
import {
  respondContact,
  resetStateContact,
} from "../../../provider/features/contact/ContactSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const ContactRespond = (props) => {
  const { open, setOpen, email } = props;
  const { respondContactState } = useSelector((state) => state.contact);

  const dispatch = useDispatch();

  useEffect(() => {
    if (respondContactState.isSuccess) {
      setOpen(false);
      notification.open({
        description: respondContactState.message,
        duration: 3,
        type: "success",
      });
    }
    if (respondContactState.isError) {
      setOpen(false);
      notification.open({
        description: respondContactState.message,
        duration: 3,
        type: "error",
      });
    }
    formik.resetForm();
    dispatch(resetStateContact());
  }, [respondContactState.isSuccess, respondContactState.isError]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Message is required*"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      console.log(values);
      formData.append("message", values.message);
      formData.append("email", email);
      console.log(formData);
      dispatch(respondContact({email,...values}));
    },
  });

  const handleOk = () => {
    formik.handleSubmit();
  };

  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Modal
      title="Respond Email"
      open={open}
      onOk={handleOk}
      okText="Send Email"
      confirmLoading={respondContactState.isLoading}
      onCancel={handleCancel}
    >
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="message">
            Message <span>*</span>
          </label>
          <TextArea
            id="message"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.message && formik.touched.message && (
            <div style={{ color: "red" }}>{formik.errors.message}</div>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ContactRespond;
