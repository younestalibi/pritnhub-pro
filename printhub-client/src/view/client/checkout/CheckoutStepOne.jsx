import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddress,
  getAddresses,
  resetStateAddress,
} from "../../../provider/features/address/AddressSlice";
import {
  Button,
  Card,
  Col,
  Flex,
  Input,
  Row,
  Select,
  notification,
} from "antd";
import {
  getCartItems,
  resetStateCart,
} from "../../../provider/features/cart/CartSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
const { Meta } = Card;

const CheckoutStepOne = ({ setCheckoutData, checkoutData, next }) => {
  const { addresses, getAddressesState, createAddressState } = useSelector(
    (state) => state.address
  );
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (carts.length == 0 && isAuthenticated) {
      dispatch(getCartItems());
    } else {
      dispatch(resetStateCart());
    }
    if (addresses.length == 0) {
      dispatch(getAddresses());
    } else {
      dispatch(resetStateAddress());
    }
  }, []);
  const address = addresses.find(
    (e) => JSON.stringify(e) == JSON.stringify(checkoutData.shippingAddress)
  );
  const [showForm, setShowForm] = useState(false);

  const options = addresses?.map((address, i) => {
    return {
      value: JSON.stringify(address),
      label: address.address1,
    };
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      company: "",
      address1: "",
      address2: "",
      address3: "",
      city: "",
      country: "",
      phone: "",
      postal_code: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      address1: Yup.string().required("Address 1 is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      phone: Yup.string()
        .required("Phone Number is required")
        .matches(/^[0-9]+$/, "Phone Number must be digits")
        .min(10, "Phone Number must be at least 10 digits"),
      postal_code: Yup.string().required("Postal Code is required"),
    }),
    onSubmit: (values) => {
      dispatch(createAddress(values));
    },
  });

  useEffect(() => {
    if (createAddressState.isSuccess) {
      notification.open({
        description: createAddressState.message,
        duration: 3,
        type: "success",
      });
    }
    if (createAddressState.isError) {
      notification.open({
        description: createAddressState.message,
        duration: 3,
        type: "error",
      });
    }
    if (createAddressState.isSuccess) {
      setShowForm(false);
    }
    formik.resetForm();
    dispatch(resetStateAddress());
  }, [createAddressState.isSuccess, createAddressState.isError]);

  return (
    <>
      <Flex align="center" gap={10} justify="space-between">
        <Select
          loading={getAddressesState.isLoading}
          style={{ width: "100%" }}
          defaultValue={
            checkoutData.shippingAddress &&
            JSON.stringify(checkoutData.shippingAddress)
          }
          placeholder="select shipping address"
          onChange={(e) => {
            setCheckoutData((prev) => ({
              ...prev,
              shippingAddress: JSON.parse(e),
            }));
          }}
          options={options}
        />
        {!showForm && (
          <Button
            type="primary"
            onClick={() => setShowForm(!showForm)}
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            Add New Address
          </Button>
        )}
      </Flex>
      <div>
        {showForm && (
          <form onSubmit={formik.handleSubmit} style={{ marginBottom: "20px" }}>
            <Row gutter={20} justify={"space-evenly"}>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <div>
                  <label htmlFor="firstName">
                    <b>First Name:</b>
                  </label>
                  <Input
                    name="firstName"
                    id="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="lastName">
                    <b>Last Name:</b>
                  </label>
                  <Input
                    name="lastName"
                    id="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div style={{ color: "red" }}>{formik.errors.lastName}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="address1">
                    <b>*Address 1:</b>
                  </label>
                  <Input
                    name="address1"
                    id="address1"
                    value={formik.values.address1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address1 && formik.errors.address1 ? (
                    <div style={{ color: "red" }}>{formik.errors.address1}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="address2">
                    <b>Address 2:</b>
                  </label>
                  <Input
                    name="address2"
                    id="address2"
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address2 && formik.errors.address2 ? (
                    <div style={{ color: "red" }}>{formik.errors.address2}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="address3">
                    <b>Address 3:</b>
                  </label>
                  <Input
                    name="address3"
                    id="address3"
                    value={formik.values.address3}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address3 && formik.errors.address3 ? (
                    <div style={{ color: "red" }}>{formik.errors.address3}</div>
                  ) : null}
                </div>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <div>
                  <label htmlFor="company">
                    <b>Company:</b>
                  </label>
                  <Input
                    name="company"
                    id="company"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.company && formik.errors.company ? (
                    <div style={{ color: "red" }}>{formik.errors.company}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="country">
                    <b>Country:</b>
                  </label>
                  <Input
                    name="country"
                    id="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.country && formik.errors.country ? (
                    <div style={{ color: "red" }}>{formik.errors.country}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="city">
                    <b>City:</b>
                  </label>
                  <Input
                    name="city"
                    id="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div style={{ color: "red" }}>{formik.errors.city}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="phone">
                    <b>Phone Number:</b>
                  </label>
                  <Input
                    name="phone"
                    id="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div style={{ color: "red" }}>{formik.errors.phone}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="postal_code">
                    <b>Postal code:</b>
                  </label>
                  <Input
                    name="postal_code"
                    id="postal_code"
                    value={formik.values.postal_code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.postal_code && formik.errors.postal_code ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.postal_code}
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Flex align="center" gap={20}>
              <Button
                type="primary"
                htmlType="submit"
                loading={createAddressState.isLoading}
              >
                Create address
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                Cancel
              </Button>
            </Flex>
          </form>
        )}
        {address && (
          <Card
            size="small"
            hoverable
            title={
              <Flex justify="space-between" align="center">
                <div>
                  {address.firstName} {address.lastName}
                </div>
              </Flex>
            }
          >
            <small>{address.address1} </small>
            <small>{address.address2} </small>
            <small>{address.address3} </small>
            <br />
            <small>
              {address.city}, {address.country}
            </small>
            <br />
            <small>Phone: {address.phone}</small>
            <br />
            <small>Postal Code: {address.postal_code}</small>
          </Card>
        )}
      </div>
      <div style={{ marginTop: "40px" }}>
        <Button
          disabled={!checkoutData.shippingAddress}
          type="primary"
          onClick={() => next()}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default CheckoutStepOne;
