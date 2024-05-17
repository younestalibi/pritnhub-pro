import React, { useEffect } from "react";
import { login } from "../../provider/features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loginState } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginState.isSuccess && user) {
      navigate("/");
    }
  }, [loginState.isSuccess, user]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (loginState.message) {
      if (Array.isArray(loginState.message)) {
        const errors = {};
        loginState.message.forEach((error) => {
          errors[error.path] = error.msg;
        });
        formik.setErrors(errors);
      } else if (typeof loginState.message === "string") {
        notification.open({
          description: loginState.message,
          duration: 3,
          type: "error",
        });
      }
    }
  }, [loginState.isError]);
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            name="email"
            id="email"
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
          loading={loginState.isLoading}
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
