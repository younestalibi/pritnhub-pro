import { PlusOutlined } from "@ant-design/icons";
import { Input, InputNumber, Modal, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  createArticle,
  resetStateArticle,
  updateArticle,
} from "../../../provider/features/article/ArticleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextArea from "antd/es/input/TextArea";

const ArticleEdit = (props) => {
  const { open, setOpen, id } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const { updateArticleState, articles } = useSelector(
    (state) => state.article
  );
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (id) {
      const foundArticle = articles.find((e) => e.id === id);
      if (foundArticle) {
        setArticle(foundArticle);
      }
      if (article) {
        formik.setFieldValue("name", article.name);
        formik.setFieldValue("description", article.description);
        formik.setFieldValue("unit_price", article.unit_price);
        formik.setFieldValue("min_quantity", article.min_quantity);
        formik.setFieldValue("quantity", article.quantity);
        formik.setFieldValue("image", [
          {
            name: article.name,
            status: "done",
            originFileObj: null,
            crossOrigin: import.meta.env.VITE_CLIENT_URL,
            url: `${import.meta.env.VITE_SERVER_URL}/${article.image}`,
          },
        ]);
        setPreviewImage(`${import.meta.env.VITE_SERVER_URL}/${article.image}`);
        setPreviewTitle(article.name);
      }
    }
  }, [open, article]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateArticleState.isSuccess) {
      setOpen(false);
      notification.open({
        description: updateArticleState.message,
        duration: 3,
        type: "success",
      });
    }
    if (updateArticleState.isError) {
      setOpen(false);
      notification.open({
        description: updateArticleState.message,
        duration: 3,
        type: "error",
      });
      formik.resetForm();
      dispatch(resetStateArticle());
    }
  }, [updateArticleState.isSuccess, updateArticleState.isError]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      unit_price: null,
      min_quantity: null,
      quantity: null,
      image: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required*"),
      description: Yup.string().required("Description is required*"),
      unit_price: Yup.number().required("Unit Price is required*"),
      quantity: Yup.number().required("Quantity is required*"),
      min_quantity: Yup.number().required("Min Quantity is required*"),
      image: Yup.array()
        .length(1, "Please upload only one image")
        .required("Image is required*"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      console.log(values)
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("min_quantity", values.min_quantity);
      formData.append("unit_price", values.unit_price);
      formData.append("quantity", values.quantity);
      formData.append("image", values.image[0].originFileObj);
      dispatch(updateArticle({ id, article: formData }));
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
      title="Edit Article"
      open={open}
      onOk={handleOk}
      okText="UPDATE"
      confirmLoading={updateArticleState.isLoading}
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
          <TextArea
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
          <label htmlFor="unit_price">
            Unit price <span>*</span>
          </label>
          <InputNumber
            id="unit_price"
            name="unit_price"
            style={{ display: "block", width: "100%" }}
            min={0}
            value={formik.values.unit_price}
            onChange={(unit_price) => {
              formik.setFieldValue("unit_price", unit_price);
            }}
          />
          {formik.errors.unit_price && formik.touched.unit_price && (
            <div style={{ color: "red" }}>{formik.errors.unit_price}</div>
          )}
        </div>
        <div>
          <label htmlFor="quantity">
            Quantity <span>*</span>
          </label>
          <InputNumber
            placeholder="the quantity available"
            id="quantity"
            name="quantity"
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
            min={0}
            value={formik.values.quantity}
            onChange={(value) => formik.setFieldValue("quantity", value)}
            onBlur={formik.handleBlur}
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <div style={{ color: "red" }}>{formik.errors.quantity}</div>
          )}
        </div>
        <div>
          <label htmlFor="min_quantity">
            min_quantity <span>*</span>
          </label>
          <InputNumber
            placeholder="the min quantity for this article"
            id="min_quantity"
            name="min_quantity"
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
            min={0}
            value={formik.values.min_quantity}
            onChange={(value) => formik.setFieldValue("min_quantity", value)}
            onBlur={formik.handleBlur}
          />
          {formik.touched.min_quantity && formik.errors.min_quantity && (
            <div style={{ color: "red" }}>{formik.errors.min_quantity}</div>
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
export default ArticleEdit;

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
