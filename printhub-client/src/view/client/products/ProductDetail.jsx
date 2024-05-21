import {
  Badge,
  Button,
  Col,
  Descriptions,
  Result,
  Row,
  Skeleton,
  Tag,
  Typography,
  notification,
} from "antd";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import TextInput from "../../../components/inputs/TextInput";
import NumberInput from "../../../components/inputs/NumberInput";
import SelectInput from "../../../components/inputs/SelectInput";
import RadioInput from "../../../components/inputs/RadioInput";
import CheckBoxInput from "../../../components/inputs/CheckBoxInput";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  resetStateCart,
} from "../../../provider/features/cart/CartSlice";
import useAuth from "../../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../../provider/features/product/ProductSlice";
const { Title, Paragraph } = Typography;
const ProductDetail = () => {
  const { id, productName } = useParams();
  const dispatch = useDispatch();
  const { getProductByIdState } = useSelector((state) => state.product);
  const { product } = getProductByIdState;

  const [expanded, setExpanded] = useState(false);
  const { carts, addCartItemState } = useSelector((state) => state.cart);
  const isAuthenticated = useAuth();

  console.log(product);
  const calculateTotalPrice = (formValues) => {
    if (!product) {
      return {
        totalPrice: "-----------",
        totalUnit: "-----------",
      };
    }

    let totalPrice = parseFloat(product.price);
    let customizationTotal = 0;

    if (formValues["quantity"]) {
      // totalPrice *= formValues["quantity"];
      product.options.forEach((option) => {
        const value = formValues[option.name];

        if (option.type === "number") {
          // const number = value;
          // totalPrice *= parseFloat(number);
        } else if (option.type === "select" || option.type === "radio") {
          const choice = option.choices.find(
            (choice) => choice.value === value
          );
          if (choice) {
            customizationTotal += parseFloat(choice.priceAdjustment);
          }
        } else if (option.type === "checkbox") {
          const selectedChoices = value || [];
          selectedChoices.forEach((selectedChoice) => {
            const choice = option.choices.find(
              (choice) => choice.value === selectedChoice
            );
            if (choice) {
              customizationTotal += parseFloat(choice.priceAdjustment);
            }
          });
        }
      });
      return {
        totalPrice: (totalPrice + customizationTotal) * formValues["quantity"],
        totalUnit: totalPrice + customizationTotal,
      };
    }
    return {
      totalPrice: "-----------",
      totalUnit: "-----------",
    };
  };

  const quantities = product
    ? Array.from(
        {
          length:
            Math.floor(
              (Number(product.quantity.max) - Number(product.quantity.min)) /
                Number(product.quantity.step)
            ) + 1,
        },
        (_, index) => ({
          value:
            Number(product.quantity.min) +
            index * Number(product.quantity.step),
        })
      )
    : [];

  console.log(product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  ////
  const formik = useFormik({
    initialValues: product
      ? {
          quantity: null,
          ...product.options.reduce(
            (acc, option) => ({ ...acc, [option.name]: null }),
            {}
          ),
        }
      : {},
    validationSchema: () =>
      product
        ? Yup.object().shape({
            quantity: Yup.number()
              .typeError("Please enter a valid quantity")
              .min(product.quantity.min, `Minimum ${product.quantity.min}`)
              .max(product.quantity.max, `Maximum ${product.quantity.max}`)
              .required("Quantity is required"),
            ...product.options.reduce((acc, option) => {
              switch (option.type) {
                case "text":
                case "number":
                case "select":
                  acc[option.name] = Yup.string().required(
                    `${option.label} is required`
                  );
                  break;
                case "radio":
                  acc[option.name] = Yup.string().required(
                    `Please select a ${option.label}`
                  );
                  break;
                case "checkbox":
                  acc[option.name] = Yup.array().min(
                    1,
                    `Please select at least one ${option.label}`
                  );
                  break;
                default:
                  break;
              }
              return acc;
            }, {}),
          })
        : {},
    onSubmit: (values) => {
      const productId = id;
      const customizations = { ...values };
      const quantity = customizations.quantity;
      delete customizations.quantity;
      dispatch(addCartItem({ productId, quantity, customizations }));
    },
  });

  const customization = product
    ? [
        ...product.options.map((option, index) => ({
          key: index + 1,
          label: option.name,
          children:
            formik.values[option.name] == null
              ? "------------"
              : typeof formik.values[option.name] == "object"
              ? formik.values[option.name].join(", ")
              : formik.values[option.name],
        })),

        {
          key: product.options.length + 1,
          label: <span style={{ color: "red" }}>Total Unit</span>,
          children: (
            <span style={{ color: "red" }}>
              {calculateTotalPrice(formik.values).totalUnit}
            </span>
          ),
        },
        {
          key: product.options.length + 2,
          label: <b style={{ color: "red" }}>Total Price</b>,
          children: (
            <Tag bordered={false} color="magenta">
              <b>{calculateTotalPrice(formik.values).totalPrice}</b>
            </Tag>
          ),
        },
      ]
    : [];

  useEffect(() => {
    if (addCartItemState.isSuccess) {
      notification.open({
        description: addCartItemState.message,
        duration: 3,
        type: "success",
      });
    }
    if (addCartItemState.isError) {
      notification.open({
        description: addCartItemState.message,
        duration: 3,
        type: "error",
      });
    }
    formik.resetForm();
    dispatch(resetStateCart());
  }, [addCartItemState.isSuccess, addCartItemState.isError]);

  return getProductByIdState.isLoading ? (
    <Row
      justify={"space-evenly"}
      align={"stretch"}
      style={{ marginTop: "40px" }}
    >
      <Col md={{ span: 11 }} sm={{ span: 24 }}>
        <Skeleton
          paragraph={{ rows: 0 }}
          style={{ width: "500px" }}
          active={true}
        />

        <div style={{ position: "sticky", top: "-175px" }}>
          <Skeleton.Image
            style={{
              minWidth: "350px",
              height: "250px",
            }}
            active={true}
          />
          <Skeleton
            paragraph={{
              rows: 6,
              width: "100%",
            }}
            style={{
              marginTop: "10px",
              minWidth: "350px",
              height: "250px",
            }}
            active={true}
          />
        </div>
      </Col>
      <Col md={{ span: 11 }} sm={{ span: 24 }}>
        <div>
          <Skeleton active={true} />
          <form>
            <br />
            <Skeleton
              style={{ minWidth: "350px" }}
              paragraph={{ rows: 1 }}
              active={true}
            />
            <br />
            <Skeleton
              style={{ minWidth: "350px" }}
              paragraph={{ rows: 1 }}
              active={true}
            />
            <br />
            <br />
            <Skeleton.Button size="large" block={true} active={true} />
            <br />
          </form>
        </div>
      </Col>
    </Row>
  ) : getProductByIdState.product ? (
    <Row justify={"space-evenly"} align={"stretch"}>
      <Col md={{ span: 11 }} sm={{ span: 24 }}>
        <BreadCrumb titles={["home", product.Catalog.name, product.name]} />
        <div style={{ position: "sticky", top: "-175px" }}>
          <ImageGallery
            showNav={true}
            showPlayButton={false}
            lazyLoad={true}
            showIndex={true}
            thumbnailPosition="left"
            items={images.length > 0 ? images : placeholderImage}
          />
          <Descriptions
            style={{ marginTop: "10px" }}
            title="Customization info"
            size="small"
            column={1}
            colon={false}
            bordered
            items={customization}
          />
        </div>
      </Col>
      <Col md={{ span: 11 }} sm={{ span: 24 }}>
        <div>
          <Title level={3}>{product.name}</Title>
          <Paragraph
            ellipsis={{
              rows: 3,
              expandable: "collapsible",
              expanded: expanded,
              onExpand: (_, info) => {
                setExpanded(info.expanded);
              },
            }}
          >
            {product.description}
          </Paragraph>

          <form onSubmit={formik.handleSubmit}>
            <RadioInput
              value={formik.values["quantity"]}
              setFormValues={formik.setFieldValue}
              error={formik.touched["quantity"] && formik.errors["quantity"]}
              tooltip={"Select the number of business cards you want to print"}
              label={"Quantity"}
              name={"quantity"}
              choices={quantities}
            />

            {product.options.map((option, index) => {
              switch (option.type) {
                case "text":
                  return (
                    <TextInput
                      value={formik.values[option.name]}
                      setFormValues={formik.setFieldValue}
                      error={
                        formik.touched[option.name] &&
                        formik.errors[option.name]
                      }
                      tooltip={option.tooltip}
                      key={index}
                      label={option.label}
                      name={option.name}
                    />
                  );
                case "number":
                  return (
                    <NumberInput
                      value={formik.values[option.name]}
                      setFormValues={formik.setFieldValue}
                      error={
                        formik.touched[option.name] &&
                        formik.errors[option.name]
                      }
                      tooltip={option.tooltip}
                      key={index}
                      label={option.label}
                      name={option.name}
                    />
                  );
                case "select":
                  return (
                    <SelectInput
                      value={formik.values[option.name]}
                      setFormValues={formik.setFieldValue}
                      error={
                        formik.touched[option.name] &&
                        formik.errors[option.name]
                      }
                      tooltip={option.tooltip}
                      key={index}
                      label={option.label}
                      name={option.name}
                      choices={option.choices}
                    />
                  );
                case "radio":
                  return (
                    <RadioInput
                      value={formik.values[option.name]}
                      setFormValues={formik.setFieldValue}
                      error={
                        formik.touched[option.name] &&
                        formik.errors[option.name]
                      }
                      tooltip={option.tooltip}
                      key={index}
                      label={option.label}
                      name={option.name}
                      choices={option.choices}
                    />
                  );
                case "checkbox":
                  return (
                    <CheckBoxInput
                      value={formik.values[option.name]}
                      setFormValues={formik.setFieldValue}
                      error={
                        formik.touched[option.name] &&
                        formik.errors[option.name]
                      }
                      tooltip={option.tooltip}
                      key={index}
                      label={option.label}
                      name={option.name}
                      choices={option.choices}
                    />
                  );
                default:
                  return null;
              }
            })}
            {isAuthenticated ? (
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#c43b53",
                  padding: "19px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                block={true}
                loading={addCartItemState.isLoading}
              >
                Add To Cart
              </Button>
            ) : (
              <Link
                style={{
                  backgroundColor: "#c43b53",
                  padding: "19px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
                to={"/login"}
              >
                Add To Cart
              </Link>
            )}
          </form>
        </div>
      </Col>
    </Row>
  ) : (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the product you are looking for does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default ProductDetail;
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
];

const placeholderImage = [
  {
    original:
      "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=1024x1024&w=is&k=20&c=Bs1RdueQnaAcO888WBIQsC6NvA7aVTzeRVzSd8sJfUg=",
    thumbnail:
      "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=1024x1024&w=is&k=20&c=Bs1RdueQnaAcO888WBIQsC6NvA7aVTzeRVzSd8sJfUg=",
  },
];
