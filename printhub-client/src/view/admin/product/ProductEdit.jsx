import { PlusOutlined } from "@ant-design/icons";
import { Input, InputNumber, Modal, Select, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  createCatalog,
  getCatalogs,
  resetStateCatalog,
  updateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductCustomization from "./ProductCustomization";
import { updateProduct } from "../../../provider/features/product/ProductSlice";
import { resetProductState } from "../../../provider/features/product/ProductState";

const ProductEdit = (props) => {
  const { open, setOpen, id } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { TextArea } = Input;

  const { updateProductstate, products } = useSelector(
    (state) => state.product
  );

  const { catalogs,getCatalogsState } = useSelector((state) => state.catalog);

  useEffect(() => {
    if (catalogs.length == 0) {
      dispatch(getCatalogs());
    } else {
      dispatch(resetStateCatalog());
    }
  }, []);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((e) => e.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      if (product) {
        formik.setFieldValue("name", product.name);
        formik.setFieldValue("description", product.description);
        formik.setFieldValue("price", product.price);
        formik.setFieldValue("quantity", product.quantity);
        formik.setFieldValue("catalog_id", product.catalog_id);
        formik.setFieldValue("options", product.options);
        formik.setFieldValue("quantity", product.quantity);
        formik.setFieldValue("image", [
          {
            name: product.name,
            status: "done",
            originFileObj: null,
            crossOrigin: import.meta.env.VITE_CLIENT_URL,
            url: `${import.meta.env.VITE_SERVER_URL}/${product.image}`,
          },
        ]);
        setPreviewImage(`${import.meta.env.VITE_SERVER_URL}/${product.image}`);
        setPreviewTitle(product.name);
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
      dispatch(resetProductState());

    }
  }, [updateProductstate.isSuccess, updateProductstate.isError]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      image: [],
      catalog_id: null,
      options: null,
      quantity: 0,
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
      quantity: Yup.number()
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required*"),
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
      dispatch(updateProduct({id,product:formData}));
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
          <InputNumber
            id="quantity"
            name="quantity"
            style={{ display: "block", width: "100%" }}
            min={0}
            value={formik.values.quantity}
            onChange={(quantity) => {
              formik.setFieldValue("quantity", quantity);
            }}
          />
          {formik.errors.quantity && formik.touched.quantity && (
            <div style={{ color: "red" }}>{formik.errors.quantity}</div>
          )}
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
            labelInValue={true}
            value={{ value:formik.values.catalog_id}}
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
            options={formik.getFieldProps('options').value}
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
