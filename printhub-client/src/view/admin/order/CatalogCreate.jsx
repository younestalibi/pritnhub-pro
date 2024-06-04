import { PlusOutlined } from "@ant-design/icons";
import { Input, Modal, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  createCatalog,
  resetStateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const CatalogCreate = (props) => {
  const { open, setOpen } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const { createCatalogState } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (createCatalogState.isSuccess) {
      setOpen(false);
      notification.open({
        description: createCatalogState.message,
        duration: 3,
        type: "success",
      });
    }
    if (createCatalogState.isError) {
      setOpen(false);
      notification.open({
        description: createCatalogState.message,
        duration: 3,
        type: "error",
      });
    }
    formik.resetForm();
    dispatch(resetStateCatalog());
  }, [createCatalogState.isSuccess, createCatalogState.isError]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      image: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required*"),
      image: Yup.array()
        .length(1, "Please upload only one image")
        .required("Image is required*"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image[0].originFileObj);
      dispatch(createCatalog(formData));
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

  return (
    <Modal
      title="Create New Catalog"
      open={open}
      onOk={handleOk}
      okText="CREATE"
      confirmLoading={createCatalogState.isLoading}
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
          <label htmlFor="image">
            Image <span>*</span>
          </label>
          <Upload
            customRequest={({ onSuccess }) => {
              onSuccess("success");
            }}
            listType="picture-card"
            maxCount={1}
            // onRemove={() => {
            //   formik.setFieldValue("image", []);
            //   console.log(formik.getFieldProps("image").value);
            // }}
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
export default CatalogCreate;

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
