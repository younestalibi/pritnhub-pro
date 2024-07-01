import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Image,
  Result,
  Row,
  Skeleton,
  Tag,
  Typography,
  Upload,
  notification,
} from "antd";
import { useEffect, useState } from "react";
// import "react-image-gallery/styles/css/image-gallery.css";
import TextInput from "../../../components/inputs/TextInput";
import NumberInput from "../../../components/inputs/NumberInput";
import SelectInput from "../../../components/inputs/SelectInput";
import RadioInput from "../../../components/inputs/RadioInput";
import CheckBoxInput from "../../../components/inputs/CheckBoxInput";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  resetStateCart,
} from "../../../provider/features/cart/CartSlice";
import useAuth from "../../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import {
  getProductById,
  getProducts,
  resetStateProduct,
} from "../../../provider/features/product/ProductSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Fade } from "react-awesome-reveal";
import AppService from "../home/services";
import ProductCard from "./productCard";
import ProductGallery from "../../../components/ProductGallery/ProductGallery";
const { Title, Paragraph } = Typography;
const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getProductByIdState } = useSelector((state) => state.product);
  const { product } = getProductByIdState;
  const [expanded, setExpanded] = useState(false);
  const { addCartItemState } = useSelector((state) => state.cart);
  const isAuthenticated = useAuth();

  const calculateTotalPrice = (formValues) => {
    if (!product) {
      return {
        totalPrice: "-----------",
        totalUnit: "-----------",
      };
    }

    let totalPrice = parseFloat(product.price);
    let customizationTotal = 0;
    const quantity = formValues["quantity"];
    if (formValues["quantity"]) {
      product.options.forEach((option) => {
        const value = formValues[option.name];
        if (option.type === "number") {
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

      if (product.quantity && product.quantity.priceAdjustments) {
        for (const adjustment of product.quantity.priceAdjustments) {
          const [min, max] = adjustment.range.split("-").map(Number);
          if (quantity >= min && (max === undefined || quantity <= max)) {
            customizationTotal += parseFloat(adjustment.price);
            break;
          }
        }
      }
      return {
        totalPrice: (totalPrice + customizationTotal) * formValues["quantity"],
        totalUnit: totalPrice + customizationTotal,
      };
    }
    return {
      // totalPrice: "-----------",
      // totalUnit: "-----------",
      totalPrice: null,
      totalUnit: null,
    };
  };
  // const calculateTotalPrice = (formValues) => {
  //   if (!product) {
  //     return {
  //       totalPrice: "-----------",
  //       totalUnit: "-----------",
  //     };
  //   }

  //   let totalPrice = parseFloat(product.price);
  //   let customizationTotal = 0;

  //   if (formValues["quantity"]) {
  //     // Calculate customization total
  //     product.options.forEach((option) => {
  //       const value = formValues[option.name];

  //       if (option.type === "number") {
  //         // Handle number type options
  //       } else if (option.type === "select" || option.type === "radio") {
  //         const choice = option.choices.find(
  //           (choice) => choice.value === value
  //         );
  //         if (choice) {
  //           customizationTotal += parseFloat(choice.priceAdjustment);
  //         }
  //       } else if (option.type === "checkbox") {
  //         const selectedChoices = value || [];
  //         selectedChoices.forEach((selectedChoice) => {
  //           const choice = option.choices.find(
  //             (choice) => choice.value === selectedChoice
  //           );
  //           if (choice) {
  //             customizationTotal += parseFloat(choice.priceAdjustment);
  //           }
  //         });
  //       }
  //     });

  //     // Calculate quantity-based price adjustment
  //     const quantity = formValues["quantity"];
  //     let quantityPriceAdjustment = 0;

  //     if (product.quantity && product.quantity.priceAdjustments) {
  //       for (const adjustment of product.quantity.priceAdjustments) {
  //         const [min, max] = adjustment.range.split("-").map(Number);

  //         if (quantity >= min && (max === undefined || quantity <= max)) {
  //           quantityPriceAdjustment = parseFloat(adjustment.price);
  //           break;
  //         }
  //       }
  //     }

  //     const adjustedTotalPrice =
  //       (totalPrice + customizationTotal) * quantityPriceAdjustment;

  //     return {
  //       totalPrice: adjustedTotalPrice * quantity,
  //       totalUnit: adjustedTotalPrice,
  //     };
  //   }

  //   return {
  //     totalPrice: null,
  //     totalUnit: null,
  //   };
  // };

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

  // const rangeArray = [];
  // if (product && product.quantity) {
  //   const { min, max, step } = product.quantity;
  //   for (let i = min; i < max; i += step) {
  //     rangeArray.push(i);
  //   }
  //   console.log(rangeArray)
  // }
  console.log(getProductByIdState);
  // useEffect(() => {
  //   dispatch(getProductById(id));
  //   window.scrollTo(0, 0);
  // }, [id]);

  ////
  const formik = useFormik({
    initialValues: product
      ? {
          images: [],
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
            images: Yup.array()
              .max(10, "You can only upload up to 10 images")
              .min(1, "Please upload at least one images")
              .required("Image is required*"),
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
      let customizations = { ...values };
      delete customizations.quantity;
      delete customizations.images;

      const formData = new FormData();
      formData.append("productId", id);
      formData.append("customizations", JSON.stringify(customizations));
      formData.append("quantity", values.quantity);
      values.images.forEach((image) => {
        if (image.originFileObj) {
          formData.append("images", image.originFileObj);
        }
      });
      dispatch(addCartItem(formData));
    },
  });
console.log(formik.errors)
  const customization = product
    ? [
        ...product.options.map((option, index) => ({
          key: index + 1,
          label: option.label,
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
              {calculateTotalPrice(formik.values).totalUnit
                ? `${calculateTotalPrice(formik.values).totalUnit.toFixed(2)}$`
                : "------------"}
            </span>
          ),
        },
        {
          key: product.options.length + 2,
          label: <b style={{ color: "red" }}>Total Price</b>,
          children: (
            <Tag bordered={false} color="magenta">
              <b>
                {calculateTotalPrice(formik.values).totalPrice
                  ? `${calculateTotalPrice(formik.values).totalPrice.toFixed(
                      2
                    )}$`
                  : "------------"}
              </b>
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
    window.scrollTo(0, 0);
  }, [addCartItemState.isSuccess, addCartItemState.isError]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const { products, getProductsState } = useSelector((state) => state.product);

  useEffect(() => {
    if (products.length == 0) {
      dispatch(getProducts());
    } else {
      dispatch(resetStateProduct());
    }
  }, []);

  useEffect(() => {
    dispatch(getProductById(id));
    window.scrollTo(0, 0);
  }, [id]);
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
    <>
      <Row
        justify={"space-evenly"}
        align={"stretch"}
        style={{
          margin: "40px 0px",
        }}
      >
        <Col
          md={{ span: 11 }}
          sm={{ span: 24 }}
          style={{
            width: "100%",
          }}
        >
          <BreadCrumb titles={["home", product.Catalog.name, product.name]} />
          <div style={{ position: "sticky", top: "-175px" }}>
            <ProductGallery
              images={product?.image.map((e, i) => {
                return `${import.meta.env.VITE_SERVER_URL}/${e}`;
              })}
            />

            <Descriptions
              style={{ margin: "20px 0px" }}
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
              <SelectInput
                value={formik.values["quantity"]}
                setFormValues={formik.setFieldValue}
                error={formik.touched["quantity"] && formik.errors["quantity"]}
                tooltip={
                  "Select the number of business cards you want to print"
                }
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
              <Upload
                customRequest={({ onSuccess }) => {
                  onSuccess("success");
                }}
                listType="picture-card"
                type="drag"
                style={{
                  margin: "10px 0px",
                }}
                multiple={true}
                maxCount={8}
                fileList={formik.getFieldProps("images").value}
                onChange={({ fileList: newFileList }) => {
                  formik.setFieldValue("images", newFileList);
                }}
                onPreview={handlePreview}
              >
                {uploadButton}
              </Upload>
              {formik.errors.images && formik.touched.images && (
                <div style={{ color: "red" }}>{formik.errors.images}</div>
              )}
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
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
      <AppService />
      {products.length > 1 && (
        <Fade triggerOnce direction="up">
          <Flex
            justify="center"
            align="center"
            vertical={true}
            style={{ padding: "10px 40px" }}
          >
            <Divider style={{ width: "100%" }}>
              <Typography.Title>Related Printing Items</Typography.Title>
            </Divider>
            <Typography.Paragraph style={{ fontSize: "20px" }}>
              High-quality solutions tailored to meet your needs.
            </Typography.Paragraph>
          </Flex>
        </Fade>
      )}
      <Row
        style={{ margin: "40px 0px" }}
        justify={"center"}
        align={"middle"}
        gutter={[40, 40]}
      >
        {products.length > 0 &&
          products.slice(0, 4).map((product, index) => {
            if (product.id != id) {
              return (
                <Col key={index}>
                  <Fade triggerOnce direction="up">
                    <ProductCard product={product} />
                  </Fade>
                </Col>
              );
            }
          })}
      </Row>
    </>
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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const uploadButton = (
  <button
    style={{
      border: 0,
      background: "none",
    }}
    type="button"
  >
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload files for printing
    </div>
  </button>
);
