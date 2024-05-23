import { Button, Col, Input, Row, notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  resetStateUser,
  updatePassword,
} from "../../../provider/features/auth/AuthSlice"; // Assuming you have an action for updating password
import { useEffect } from "react";

const ProfilePassword = () => {
  const { updatePasswordState } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      dispatch(updatePassword(values));
    },
  });

  useEffect(() => {
    if (updatePasswordState.isSuccess) {
      notification.open({
        description: updatePasswordState.message,
        duration: 3,
        type: "success",
      });
    }
    if (updatePasswordState.isError) {
      notification.open({
        description: updatePasswordState.message,
        duration: 3,
        type: "error",
      });
    }
    dispatch(resetStateUser());
    formik.resetForm();
  }, [updatePasswordState.isSuccess, updatePasswordState.isError]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Row gutter={20} justify={"space-around"}>
        <Col sm={{ span: 24 }} md={{ span: 12 }}>
          <div>
            <label htmlFor="currentPassword">
              <b>Current password:</b>
            </label>
            <Input.Password
              name="currentPassword"
              id="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div style={{ color: "red" }}>
                {formik.errors.currentPassword}
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="newPassword">
              <b>New password:</b>
            </label>
            <Input.Password
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div style={{ color: "red" }}>{formik.errors.newPassword}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="confirmPassword">
              <b>Confirm new password:</b>
            </label>
            <Input.Password
              name="confirmPassword"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div style={{ color: "red" }}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
        </Col>
        <Col sm={{ span: 24 }} md={{ span: 12 }}>
          {/* Additional content if needed */}
        </Col>
      </Row>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          marginTop: "10px",
        }}
        loading={updatePasswordState.isLoading}
      >
        Update password
      </Button>
    </form>
  );
};

export default ProfilePassword;
