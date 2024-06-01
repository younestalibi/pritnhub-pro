import {  Button, Input, notification } from "antd";
import "../../../App.css";
import TextArea from "antd/es/input/TextArea";
import { createContact, resetStateContact } from "../../../provider/features/contact/ContactSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const ContactForm = () => {
  const { CreateContactState } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    if (CreateContactState.isSuccess) {
      notification.open({
        description: CreateContactState.message,
        duration: 3,
        type: "success",
      });
    }
    if (CreateContactState.isError) {
      notification.open({
        description: CreateContactState.message,
        duration: 10,
        type: "error",
      });
    }
    dispatch(resetStateContact());
    formik.resetForm();
  }, [CreateContactState.isSuccess, CreateContactState.isError]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required*"),
      email: Yup.string().email("Invalid email format").required("Required"),
      message: Yup.string().required("Message is required*"),
    }),
    onSubmit: (values) => {
      const formdData={
        name:values.name,
        email:values.email,
        message:values.message
      }
      dispatch(createContact(formdData));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="inputDiv">
        <label htmlFor="name">Name</label>
        <Input
          name="name"
          id="name"
          placeholder="your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.errors.name && formik.touched.name && (  <div style={{ color: "red" }}>{formik.errors.name}</div>)}
      </div>
      <div className="inputDiv">
        <label htmlFor="email">Email</label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
      </div>
      <div className="inputDiv">
        <label htmlFor="message">Message</label>
        <TextArea
          id="message"
          name="message"
          placeholder="your message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.message && formik.touched.message && ( <div style={{ color: "red" }}>{formik.errors.message}</div> )}
      </div>
      <Button
        className="formColBtn"
        loading={CreateContactState.isLoading}
        type="primary"
        htmlType="submit"
        blockSubmit={true}
        size="large"
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
