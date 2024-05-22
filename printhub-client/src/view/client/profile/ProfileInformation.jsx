import { Button, Col, Input, Row, Select ,notification} from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { cityData, countryData } from "./CountriesCities";
import { useSelector,useDispatch } from "react-redux";
import { resetStateUser, updateProfile } from "../../../provider/features/auth/AuthSlice";

const ProfileInformation = () => {
  const { profile, user ,updateProfileState} = useSelector((state) => state.auth);
  const dispatch=useDispatch()

  const formik = useFormik({
    initialValues: {
      first_name: profile?.first_name || null,
      last_name: profile?.last_name || null,
      phone_number: profile?.phone_number || null,
      city: profile?.city || null,
      country: profile?.country || null,
      avatar: profile?.avatar || null,
      company_name: profile?.company_name || null,
      website: profile?.website || null,
      email: user?.email || null,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateProfile(values))
      
    },
  });

  useEffect(() => {
    if (updateProfileState.isSuccess) {
      notification.open({
        description: updateProfileState.message,
        duration: 3,
        type: "success",
      });
    }
    if (updateProfileState.isError) {
      notification.open({
        description: updateProfileState.message,
        duration: 3,
        type: "error",
      });
    }
    dispatch(resetStateUser());
  }, [updateProfileState.isSuccess, updateProfileState.isError]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Row gutter={20} justify={"space-around"}>
        <Col sm={{ span: 24 }} md={{ span: 12 }}>
          <div>
            <label htmlFor="first_name">
              <b>First Name:</b>
            </label>
            <Input
              name="first_name"
              id="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div style={{ color: "red" }}>{formik.errors.first_name}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="last_name">
              <b>Last Name:</b>
            </label>
            <Input
              name="last_name"
              id="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <div style={{ color: "red" }}>{formik.errors.last_name}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="phone_number">
              <b>Phone:</b>
            </label>
            <Input
              name="phone_number"
              id="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone_number && formik.errors.phone_number ? (
              <div style={{ color: "red" }}>{formik.errors.phone_number}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="country">
              <b>Country:</b>
            </label>
            <Select
              id="country"
              showSearch={true}
              style={{
                width: "100%",
              }}
              value={formik.values.country}
              onChange={(country) => {
                formik.setFieldValue("country", country);
                formik.setFieldValue("city", null);
              }}
              options={countryData.map((country) => ({
                label: country,
                value: country,
              }))}
            />
            {formik.touched.country && formik.errors.country ? (
              <div style={{ color: "red" }}>{formik.errors.country}</div>
            ) : null}
          </div>
        </Col>
        <Col sm={{ span: 24 }} md={{ span: 12 }}>
          <div>
            <label htmlFor="company_name">
              <b>Company Name:</b>
            </label>
            <Input
              name="company_name"
              id="company_name"
              value={formik.values.company_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.company_name && formik.errors.company_name ? (
              <div style={{ color: "red" }}>{formik.errors.company_name}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="website">
              <b>Website:</b>
            </label>
            <Input
              name="website"
              id="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <label htmlFor="email">
              <b>Email:</b>
            </label>
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
            <label htmlFor="city">
              <b>City:</b>
            </label>
            <Select
              showSearch={true}
              id="city"
              style={{
                width: "100%",
              }}
              value={formik.values.city}
              onChange={(city) => {
                formik.setFieldValue("city", city);
              }}
              options={cityData[formik.values.country]?.map((city) => ({
                label: city,
                value: city,
              }))}
            />
          </div>
        </Col>
      </Row>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          marginTop: "10px",
        }}
        loading={updateProfileState.isLoading}
      >
        Update profile
      </Button>
    </form>
  );
};

export default ProfileInformation;
