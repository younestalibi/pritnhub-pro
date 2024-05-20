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

  // const product = {
  //   catalog_id: "353",
  //   createdAt: "2024-05-16T10:49:12.378Z",
  //   description: "High-quality business cards to leave a lasting impression.",
  //   id: 1,
  //   images: [
  //     {
  //       original: "https://picsum.photos/id/1018/1000/600/",
  //       thumbnail: "https://picsum.photos/id/1018/250/150/",
  //     },
  //     {
  //       original: "https://picsum.photos/id/1015/1000/600/",
  //       thumbnail: "https://picsum.photos/id/1015/250/150/",
  //     },
  //     {
  //       original: "https://picsum.photos/id/1019/1000/600/",
  //       thumbnail: "https://picsum.photos/id/1019/250/150/",
  //     },
  //     {
  //       original: "https://picsum.photos/id/1018/1000/600/",
  //       thumbnail: "https://picsum.photos/id/1018/250/150/",
  //     },
  //     {
  //       original: "https://picsum.photos/id/1015/1000/600/",
  //       thumbnail: "https://picsum.photos/id/1015/250/150/",
  //     },
  //     {
  //       original: "https://picsum.photos/id/1019/1000/600/",
  //       thumbnail: "https://picsum.photos/id/1019/250/150/",
  //     },
  //   ],
  //   name: "Premium Business Cards",
  //   options: [
  //     {
  //       type: "text",
  //       name: "name",
  //       label: "Name",
  //       placeholder: "Enter your name",
  //       tooltip: "Your full name as it will appear on the business card",
  //       priceAdjustment: 0,
  //     },
  //     {
  //       type: "text",
  //       name: "company",
  //       label: "Company Name",
  //       placeholder: "Enter your company name",
  //       tooltip: "Your company name as it will appear on the business card",
  //       priceAdjustment: 0,
  //     },
  //     {
  //       type: "select",
  //       name: "paper_type",
  //       label: "Paper Type",
  //       choices: [
  //         { value: "Matte", priceAdjustment: 0 },
  //         { value: "Glossy", priceAdjustment: 10 },
  //         { value: "Textured", priceAdjustment: 20 },
  //         { value: "Recycled", priceAdjustment: 5 },
  //       ],
  //       tooltip: "Choose the type of paper for your business cards",
  //     },
  //     {
  //       type: "radio",
  //       name: "size",
  //       label: "Size",
  //       choices: [
  //         { value: "3.5 x 2 inches", priceAdjustment: 0 },
  //         { value: "2.5 x 2.5 inches", priceAdjustment: 5 },
  //         { value: "2.125 x 3.375 inches", priceAdjustment: 10 },
  //         { value: "3.5 x 4 inches", priceAdjustment: 15 },
  //         { value: "3.5 x 5.5 inches", priceAdjustment: 20 },
  //         { value: "3.125 x 4.375 inches", priceAdjustment: 25 },
  //       ],
  //       tooltip: "Select the size of your business cards",
  //     },
  //     {
  //       type: "radio",
  //       name: "corner_style",
  //       label: "Corner Style",
  //       choices: [
  //         { value: "Square", priceAdjustment: 0 },
  //         { value: "Rounded", priceAdjustment: 10 },
  //       ],
  //       tooltip: "Select the corner style for your business cards",
  //     },
  //     {
  //       type: "checkbox",
  //       name: "additional_features",
  //       label: "Additional Features",
  //       choices: [
  //         { value: "Foil Stamping", priceAdjustment: 30 },
  //         { value: "Embossing", priceAdjustment: 25 },
  //         { value: "Spot UV", priceAdjustment: 20 },
  //         { value: "Custom Shapes", priceAdjustment: 50 },
  //       ],
  //       tooltip: "Choose any additional features for your business cards",
  //     },
  //   ],
  //   basePrice: 20,
  //   quantity: {
  //     min: 100,
  //     max: 1000,
  //     step: 100,
  //     label: "Quantity",
  //     name: "quantity",
  //     tooltip: "Select the number of business cards you want to print",
  //   },
  //   updatedAt: "2024-05-16T10:49:12.378Z",
  // };
console.log(product)
  const calculateTotalPrice = (formValues) => {
    if (!product) return "------------";

    let totalPrice = product.price;
    if (!formValues["quantity"]) {
      totalPrice = "------------";
    } else {
      totalPrice *= formValues["quantity"];
      product.options.forEach((option) => {
        const value = formValues[option.name];

        if (option.type === "number") {
          const number = value;
          totalPrice *= Number(number);
        } else if (option.type === "select" || option.type === "radio") {
          const choice = option.choices.find(
            (choice) => choice.value === value
          );
          if (choice) {
            totalPrice += Number(choice.priceAdjustment);
          }
        } else if (option.type === "checkbox") {
          const selectedChoices = value || [];
          selectedChoices.forEach((selectedChoice) => {
            const choice = option.choices.find(
              (choice) => choice.value === selectedChoice
            );
            if (choice) {
              totalPrice += Number(choice.priceAdjustment);
            }
          });
        }
      });
    }

    return totalPrice;
  };

  // const quantities = product?['hi']:[];
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
  // if (product) {
  // for (
  //   let i = product.quantity.min;
  //   i <= product.quantity.max;
  //   i += product.quantity.step
  // ) {
  //   quantities.push({ value: i });
  // }

  // }
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
          label: <b style={{ color: "red" }}>Total Price</b>,
          children: (
            <Tag bordered={false} color="magenta">
              <b>{calculateTotalPrice(formik.values)}</b>
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
      <Col md={{ span: 10 }} sm={{ span: 20 }}>
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
      <Col md={{ span: 10 }} sm={{ span: 20 }}>
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
    <Row
      justify={"space-evenly"}
      align={"stretch"}
      style={{ marginTop: "40px" }}
    >
      <Col md={{ span: 10 }} sm={{ span: 20 }}>
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
      <Col md={{ span: 10 }} sm={{ span: 20 }}>
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
