import { PlusOutlined } from "@ant-design/icons";
import { Input, Modal, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  createCatalog,
  resetStateCatalog,
  updateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const CatalogEdit = (props) => {
  const { open, setOpen, id } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const { updateCatalogState, catalogs } = useSelector(
    (state) => state.catalog
  );
  const [catalog, setCatalog] = useState(null);

  useEffect(() => {
    if (id) {
      const foundCatalog = catalogs.find((e) => e.id === id);
      if (foundCatalog) {
        setCatalog(foundCatalog);
      }
      if (catalog) {
        formik.setFieldValue("name", catalog.name);
        formik.setFieldValue("image", [
          {
            name: catalog.name,
            status: "done",
            originFileObj: null,
            crossOrigin: import.meta.env.VITE_CLIENT_URL,
            url: `${import.meta.env.VITE_SERVER_URL}/${catalog.image}`,
          },
        ]);
        setPreviewImage(`${import.meta.env.VITE_SERVER_URL}/${catalog.image}`);
        setPreviewTitle(catalog.name);
      }
    }
  }, [open, catalog]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateCatalogState.isSuccess) {
      setOpen(false);
      notification.open({
        description: updateCatalogState.message,
        duration: 3,
        type: "success",
      });
    }
    if (updateCatalogState.isError) {
      setOpen(false);
      notification.open({
        description: updateCatalogState.message,
        duration: 3,
        type: "error",
      });
      formik.resetForm();
      dispatch(resetStateCatalog());
    }
  }, [updateCatalogState.isSuccess, updateCatalogState.isError]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required*"),
      description: Yup.string().required("Description is required*"),
      image: Yup.array()
        .length(1, "Please upload only one image")
        .required("Image is required*"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", values.image[0].originFileObj);
      dispatch(updateCatalog({ id, catalog: formData }));
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
      title="Edit Catalog"
      open={open}
      onOk={handleOk}
      okText="UPDATE"
      confirmLoading={updateCatalogState.isLoading}
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
          <label htmlFor="description">
            Description <span>*</span>
          </label>
          <Input
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && formik.touched.description && (
            <div style={{ color: "red" }}>{formik.errors.description}</div>
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
export default CatalogEdit;

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
