import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../provider/features/auth/AuthSlice";
import { Button, Input, notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, registerState } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registerState.isSuccess && user) {
      navigate("/");
    }
  }, [registerState.isSuccess, user]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string()
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });


  useEffect(() => {
    if (registerState.message) {
      if (Array.isArray(registerState.message)) {
        const errors = {};
        registerState.message.forEach((error) => {
          errors[error.path] = error.msg;
        });
        formik.setErrors(errors);
      } else if (typeof registerState.message === "string") {
        notification.open({
          description: registerState.message,
          duration: 3,
          type: "error",
        });
      }
    }
  }, [registerState.isError]);
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <Input
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            name="email"
            id="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input.Password
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}
        </div>
        <Button
          style={{ marginTop: "13px" }}
          loading={registerState.isLoading}
          type="primary"
          htmlType="submit"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
