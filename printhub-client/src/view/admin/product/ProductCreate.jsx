import { PlusOutlined } from "@ant-design/icons";
import { Flex, Input, InputNumber, Modal, Select, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  getCatalogs,
  resetStateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createProduct,
  resetStateProduct,
} from "../../../provider/features/product/ProductSlice";
import ProductCustomization from "./ProductCustomization";

const ProductCreate = (props) => {
  const { open, setOpen } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { TextArea } = Input;

  const { createProductstate } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const { catalogs, getCatalogsState } = useSelector((state) => state.catalog);

  useEffect(() => {
    if (catalogs.length == 0) {
      dispatch(getCatalogs());
    } else {
      dispatch(resetStateCatalog());
    }
  }, []);

  useEffect(() => {
    if (createProductstate.isSuccess) {
      setOpen(false);
      notification.open({
        description: createProductstate.message,
        duration: 3,
        type: "success",
      });
    }
    if (createProductstate.isError) {
      setOpen(false);
      notification.open({
        description: createProductstate.message,
        duration: 3,
        type: "error",
      });
    }
    formik.resetForm();
    dispatch(resetStateProduct());
  }, [createProductstate.isSuccess, createProductstate.isError]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      image: [],
      catalog_id: null,
      options: null,
      quantity: {
        max: null,
        min: null,
        step: null,
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
        .length(1, "Please upload only one image")
        .required("Image is required*"),
      quantity: Yup.object({
        max: Yup.number().required("Max quantity is required"),
        min: Yup.number().required("Min quantity is required"),
        step: Yup.number().required("Step amount is required"),
      }),
    }),
    onSubmit: (values) => {
      const formData = {
        name: values.name,
        catalog_id: values.catalog_id,
        options: values.options,
        quantity: values.quantity,
        price: values.price,
        description: values.description,
        image: values.image[0].originFileObj,
      };
      dispatch(createProduct(formData));
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

  return (
    <Modal
      title="Create New Product"
      open={open}
      onOk={handleOk}
      okText="CREATE"
      confirmLoading={createProductstate.isLoading}
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
              placeholder="Max quantity to buy"
              id="quantity.max"
              name="quantity.max"
              style={{ display: "block", width: "100%", marginBottom: "10px" }}
              min={0}
              value={formik.values.quantity.max}
              onChange={(value) => formik.setFieldValue("quantity.max", value)}
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
              style={{ display: "block", width: "100%", marginBottom: "10px" }}
              min={0}
              value={formik.values.quantity.min}
              onChange={(value) => formik.setFieldValue("quantity.min", value)}
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
              style={{ display: "block", width: "100%", marginBottom: "10px" }}
              min={0}
              value={formik.values.quantity.step}
              onChange={(value) => formik.setFieldValue("quantity.step", value)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.quantity?.step && formik.errors.quantity?.step ? (
              <div style={{ color: "red" }}>{formik.errors.quantity.step}</div>
            ) : null}
          </div>
          </Flex>
        </div>
        <div>
          <label htmlFor="price">
            Price <span>*</span>
          </label>
          <InputNumber
            id="price"
            name="price"
            style={{ display: "block", width: "100%" }}
            min={0}
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
            value={formik.values.catalog_id}
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
            onSave={(options) => {
              formik.setFieldValue("options", options);
            }}
            options={formik.getFieldProps('options').value}
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
            maxCount={1}
            fileList={formik.getFieldProps("image").value}
            onPreview={handlePreview}
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
          alt={previewTitle}
          className="preview-image-creation"
          src={previewImage}
        />
      </Modal>
    </Modal>
  );
};
export default ProductCreate;

const uploadButton = (
  <div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Click or drag picture to this area to upload
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
