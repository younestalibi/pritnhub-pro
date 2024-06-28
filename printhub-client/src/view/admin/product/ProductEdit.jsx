import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  getCatalogs,
  resetStateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductCustomization from "./ProductCustomization";
import {
  resetStateProduct,
  updateProduct,
} from "../../../provider/features/product/ProductSlice";
import {
  getArticles,
  resetStateArticle,
} from "../../../provider/features/article/ArticleSlice";

const ProductEdit = (props) => {
  const { open, setOpen, id } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { TextArea } = Input;

  const { updateProductstate, products } = useSelector(
    (state) => state.product
  );
  const [priceAdjustments, setPriceAdjustments] = useState([]);

  const { catalogs, getCatalogsState } = useSelector((state) => state.catalog);
  const { articles, getArticlesState } = useSelector((state) => state.article);

  useEffect(() => {
    if (articles.length == 0) {
      dispatch(getArticles());
    } else {
      dispatch(resetStateArticle());
    }
    if (catalogs.length == 0) {
      dispatch(getCatalogs());
    } else {
      dispatch(resetStateCatalog());
    }
  }, []);

  const [product, setProduct] = useState(null);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((e) => e.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setArticle(articles.find((e) => e.id === foundProduct.article_id));
      }
      if (product) {
        setPriceAdjustments(product.quantity.priceAdjustments);
        formik.setFieldValue("name", product.name);
        formik.setFieldValue("description", product.description);
        formik.setFieldValue("price", product.price);
        formik.setFieldValue("quantity", product.quantity);
        formik.setFieldValue("catalog_id", product.catalog_id);
        formik.setFieldValue("options", product.options);
        formik.setFieldValue("quantity", product.quantity);
        formik.setFieldValue("deletedImages", []);
        formik.setFieldValue(
          "image",
          product.image.map((image, index) => {
            return {
              name: product.name,
              status: "done",
              originFileObj: null,
              crossOrigin: import.meta.env.VITE_CLIENT_URL,
              url: `${import.meta.env.VITE_SERVER_URL}/${image}`,
            };
          })
        );
      }
    }
  }, [open, product]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateProductstate.isSuccess) {
      setOpen(false);
      notification.open({
        description: updateProductstate.message,
        duration: 3,
        type: "success",
      });
    }
    if (updateProductstate.isError) {
      setOpen(false);
      notification.open({
        description: updateProductstate.message,
        duration: 3,
        type: "error",
      });
      formik.resetForm();
      dispatch(resetStateProduct());
    }
  }, [updateProductstate.isSuccess, updateProductstate.isError]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      image: [],
      deletedImages: [],
      catalog_id: null,
      options: null,
      quantity: {
        max: null,
        min: null,
        step: null,
        priceAdjustments: [],
      },
      price: null,
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required*"),
      description: Yup.string().required("Description is required*"),
      price: Yup.number().required("Price is required*"),
      options: Yup.array()
        .min(1, "Please add at least 1")
        .required("Options is required*"),
      catalog_id: Yup.number().required("Catalog is required*"),
      image: Yup.array()
        .max(10, "You can only upload up to 10 images")
        .min(1, "Please upload only one image")
        .required("Image is required*"),
      quantity: Yup.object({
        max: Yup.number().required("Max quantity is required"),
        min: Yup.number().required("Min quantity is required"),
        step: Yup.number().required("Step amount is required"),
      }),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("catalog_id", values.catalog_id);
      formData.append("options", JSON.stringify(values.options));
      formData.append("quantity", JSON.stringify(values.quantity));
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("deletedImages", JSON.stringify(values.deletedImages));
      values.image.forEach((image) => {
        if (image.originFileObj) {
          formData.append("images", image.originFileObj);
        }
      });
      dispatch(updateProduct({ id, product: formData }));
    },
  });

  const handleOk = () => {
    formik.handleSubmit();
  };
  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleCancelPreview = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const options = [];
  for (let i = 0; i < catalogs.length; i++) {
    options.push({
      value: catalogs[i].id,
      label: catalogs[i].name,
    });
  }

  const addPriceAdjustment = () => {
    setPriceAdjustments([...priceAdjustments, { range: "", price: "" }]);
  };

  const handlePriceAdjustmentChange = (index, field, value) => {
    const newAdjustments = [...priceAdjustments];
    newAdjustments[index][field] = value;
    setPriceAdjustments(newAdjustments);
  };

  const removePriceAdjustment = (index) => {
    setPriceAdjustments(priceAdjustments.filter((_, i) => i !== index));
  };

  useEffect(() => {
    formik.setFieldValue("quantity.priceAdjustments", priceAdjustments);
  }, [priceAdjustments]);
  return (
    <Modal
      title="Edit Product"
      open={open}
      onOk={handleOk}
      okText="UPDATE"
      // confirmLoading={updateCatalogState.isLoading}
      onCancel={handleCancel}
    >
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">
            Name <span>*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label htmlFor="quantity">
            Quantity <span>*</span>
          </label>
          <Flex gap={10}>
            <div>
              <InputNumber
                // max={article?.quantity}
                placeholder="Max quantity to buy"
                id="quantity.max"
                name="quantity.max"
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "10px",
                }}
                min={0}
                value={formik.values.quantity.max}
                onChange={(value) =>
                  formik.setFieldValue("quantity.max", value)
                }
                onBlur={formik.handleBlur}
              />
              {formik.touched.quantity?.max && formik.errors.quantity?.max ? (
                <div style={{ color: "red" }}>{formik.errors.quantity.max}</div>
              ) : null}
            </div>
            <div>
              <InputNumber
                placeholder="Min quantity to buy"
                id="quantity.min"
                name="quantity.min"
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "10px",
                }}
                min={0}
                value={formik.values.quantity.min}
                onChange={(value) =>
                  formik.setFieldValue("quantity.min", value)
                }
                onBlur={formik.handleBlur}
              />
              {formik.touched.quantity?.min && formik.errors.quantity?.min ? (
                <div style={{ color: "red" }}>{formik.errors.quantity.min}</div>
              ) : null}
            </div>
            <div>
              <InputNumber
                placeholder="Step amount"
                id="quantity.step"
                name="quantity.step"
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "10px",
                }}
                min={0}
                value={formik.values.quantity.step}
                onChange={(value) =>
                  formik.setFieldValue("quantity.step", value)
                }
                onBlur={formik.handleBlur}
              />
              {formik.touched.quantity?.step && formik.errors.quantity?.step ? (
                <div style={{ color: "red" }}>
                  {formik.errors.quantity.step}
                </div>
              ) : null}
            </div>
          </Flex>
        </div>

        <div>
          <label htmlFor="quantity.priceAdjustments">
            Quantity Price Adjustments
          </label>
          {priceAdjustments.map((adjustment, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "8px" }}>
              <Input
                placeholder="Range (e.g. 0-199)"
                value={adjustment.range}
                onChange={(e) =>
                  handlePriceAdjustmentChange(index, "range", e.target.value)
                }
                style={{ width: "150px", marginRight: "8px" }}
              />
              <Input
                placeholder="Price Adjustment"
                value={adjustment.price}
                onChange={(e) =>
                  handlePriceAdjustmentChange(index, "price", e.target.value)
                }
                style={{ width: "100px", marginRight: "8px" }}
              />
              <Button
                icon={<MinusCircleOutlined />}
                onClick={() => removePriceAdjustment(index)}
                type="dashed"
              />
            </div>
          ))}
          <Button
            type="dashed"
            onClick={addPriceAdjustment}
            icon={<PlusOutlined />}
          >
            Add Price Adjustment
          </Button>
        </div>

        <div>
          <label htmlFor="price">
            Price <span>*</span>
          </label>
          <InputNumber
            id="price"
            name="price"
            style={{ display: "block", width: "100%" }}
            min={article?.unit_price || 0}
            value={formik.values.price}
            onChange={(price) => {
              formik.setFieldValue("price", price);
            }}
          />
          {formik.errors.price && formik.touched.price && (
            <div style={{ color: "red" }}>{formik.errors.price}</div>
          )}
        </div>
        <div>
          <label htmlFor="catalog_id">
            Catalog <span>*</span>
          </label>
          <Select
            id="catalog_id"
            name="catalog_id"
            size="middle"
            labelInValue={true}
            value={{ value: formik.values.catalog_id }}
            onChange={(catalog_id) => {
              formik.setFieldValue("catalog_id", catalog_id);
            }}
            loading={getCatalogsState.isLoading}
            style={{
              width: "100%",
              display: "block",
            }}
            options={options}
          />

          {formik.errors.catalog_id && formik.touched.catalog_id && (
            <div style={{ color: "red" }}>{formik.errors.catalog_id}</div>
          )}
        </div>
        <div>
          <label htmlFor="description">
            Description <span>*</span>
          </label>
          <TextArea
            id="description"
            name="description"
            showCount
            maxLength={1000}
            style={{
              resize: "none",
              height: 120,
            }}
            value={formik.values.description}
            placeholder="About the Product"
            allowClear
            onChange={formik.handleChange}
          />
          {formik.errors.description && formik.touched.description && (
            <div style={{ color: "red" }}>{formik.errors.description}</div>
          )}
        </div>
        <div>
          <label htmlFor="options">
            Customization Options <span>*</span>
          </label>
          <ProductCustomization
            options={formik.getFieldProps("options").value}
            onSave={(options) => {
              formik.setFieldValue("options", options);
            }}
            id="options"
            name="options"
          />

          {formik.errors.options && formik.touched.options && (
            <div style={{ color: "red" }}>{formik.errors.options}</div>
          )}
        </div>

        <div>
          <label htmlFor="image">
            Image <span>*</span>
          </label>
          <Upload
            customRequest={({ onSuccess }) => {
              onSuccess("success");
            }}
            type="drag"
            listType="picture-card"
            maxCount={10}
            multiple={true}
            fileList={formik.getFieldProps("image").value}
            onPreview={handlePreview}
            onRemove={(file) => {
              console.log(file);
              const updatedFileList = formik.values.image.filter(
                (item) => item.uid !== file.uid
              );
              formik.setFieldValue("image", updatedFileList);

              if (file.url) {
                let deletedImagePath = file.url.replace(
                  `${import.meta.env.VITE_SERVER_URL}/`,
                  ""
                );
                formik.setFieldValue("deletedImages", [
                  ...formik.values.deletedImages,
                  deletedImagePath,
                ]);
              }
            }}
            onChange={({ fileList: newFileList }) => {
              formik.setFieldValue("image", newFileList);
            }}
          >
            {uploadButton}
          </Upload>
          {formik.errors.image && formik.touched.image && (
            <div style={{ color: "red" }}>{formik.errors.image}</div>
          )}
        </div>
      </form>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img
          crossOrigin={import.meta.env.VITE_CLIENT_URL}
          alt={previewTitle}
          className="preview-image-creation"
          src={previewImage}
        />
      </Modal>
    </Modal>
  );
};
export default ProductEdit;

const uploadButton = (
  <div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </div>
);
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
