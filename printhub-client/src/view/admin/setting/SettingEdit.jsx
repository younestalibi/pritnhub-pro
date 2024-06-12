import { PlusOutlined } from "@ant-design/icons";
import { Input, Modal, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateCatalog } from "../../../provider/features/catalog/CatalogSlice"; // Update with the correct import path
import {
  resetStateSetting,
  updateSetting,
} from "../../../provider/features/setting/SettingSlice";

const SettingEdit = (props) => {
  const { open, setOpen } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const { settings, updateSettingState } = useSelector(
    (state) => state.setting
  );
  useEffect(() => {
    if (settings) {
      formik.setValues({
        phone_number: settings.phone_number,
        address: settings.address,
        contact_email: settings.contact_email,
        website_name: settings.website_name,
        whatsapp_chat_url: settings.whatsapp_chat_url,
        social_media_links: settings.social_media_links,
        favicon: [
          {
            name: "favicon.ico",
            status: "done",
            originFileObj: null,
            crossOrigin: import.meta.env.VITE_CLIENT_URL,
            url: `${import.meta.env.VITE_SERVER_URL}/${settings.favicon}`,
          },
        ],
        logo: [
          {
            name: "logo.png",
            status: "done",
            originFileObj: null,
            crossOrigin: import.meta.env.VITE_CLIENT_URL,
            url: `${import.meta.env.VITE_SERVER_URL}/${settings.logo}`,
          },
        ],
      });
      setPreviewImage(`${import.meta.env.VITE_SERVER_URL}${settings.logo}`);
      setPreviewTitle(settings.website_name);
    }
  }, [settings, open]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (updateSettingState.isSuccess) {
      setOpen(false);
      notification.open({
        description: updateSettingState.message,
        duration: 3,
        type: "success",
      });
    }
    if (updateSettingState.isError) {
      setOpen(false);
      notification.open({
        description: updateSettingState.message,
        duration: 3,
        type: "error",
      });
      formik.resetForm();
      dispatch(resetStateSetting());
    }
  }, [updateSettingState.isSuccess, updateSettingState.isError]);

  const formik = useFormik({
    initialValues: {
      phone_number: "",
      address: "",
      contact_email: "",
      favicon: null,
      logo: null,
      website_name: "",
      social_media_links: {
        twitter: "",
        facebook: "",
        instagram: "",
      },
      whatsapp_chat_url: "",
    },
    validationSchema: Yup.object({
      phone_number: Yup.string().required("Phone number is required*"),
      address: Yup.string().required("Address is required*"),
      contact_email: Yup.string()
        .email("Invalid email address")
        .required("Contact email is required*"),
      favicon: Yup.mixed().required("Favicon is required*"),
      logo: Yup.mixed().required("Logo is required*"),
      website_name: Yup.string().required("Website name is required*"),
      social_media_links: Yup.object({
        twitter: Yup.string()
          .url("Invalid URL")
          .required("Twitter link is required*"),
        facebook: Yup.string()
          .url("Invalid URL")
          .required("Facebook link is required*"),
        instagram: Yup.string()
          .url("Invalid URL")
          .required("Instagram link is required*"),
      }),
      whatsapp_chat_url: Yup.string().required(
        "WhatsApp chat URL is required*"
      ),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("phone_number", values.phone_number);
      formData.append("address", values.address);
      formData.append("contact_email", values.contact_email);
      if (
        values.favicon &&
        values.favicon[0] &&
        values.favicon[0].originFileObj
      ) {
        formData.append("favicon", values.favicon[0].originFileObj);
      }
      if (values.logo && values.logo[0] && values.logo[0].originFileObj) {
        formData.append("logo", values.logo[0].originFileObj);
      }
      formData.append("website_name", values.website_name);
      formData.append(
        "social_media_links[twitter]",
        values.social_media_links.twitter
      );
      formData.append(
        "social_media_links[facebook]",
        values.social_media_links.facebook
      );
      formData.append(
        "social_media_links[instagram]",
        values.social_media_links.instagram
      );
      formData.append("whatsapp_chat_url", values.whatsapp_chat_url);
      dispatch(updateSetting(formData));
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

  const handleFileChange = (field, fileList) => {
    formik.setFieldValue(field, fileList);
  };

  return (
    <Modal
      title="Edit Settings"
      open={open}
      onOk={handleOk}
      okText="UPDATE"
      confirmLoading={updateSettingState.isLoading}
      onCancel={handleCancel}
    >
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="phone_number">
            Phone Number <span>*</span>
          </label>
          <Input
            id="phone_number"
            name="phone_number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
          />
          {formik.errors.phone_number && formik.touched.phone_number && (
            <div style={{ color: "red" }}>{formik.errors.phone_number}</div>
          )}
        </div>

        <div>
          <label htmlFor="address">
            Address <span>*</span>
          </label>
          <Input
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          {formik.errors.address && formik.touched.address && (
            <div style={{ color: "red" }}>{formik.errors.address}</div>
          )}
        </div>

        <div>
          <label htmlFor="contact_email">
            Contact Email <span>*</span>
          </label>
          <Input
            id="contact_email"
            name="contact_email"
            value={formik.values.contact_email}
            onChange={formik.handleChange}
          />
          {formik.errors.contact_email && formik.touched.contact_email && (
            <div style={{ color: "red" }}>{formik.errors.contact_email}</div>
          )}
        </div>

        <div>
          <label htmlFor="logo">
            Logo <span>*</span>
          </label>
          <Upload
            customRequest={({ onSuccess }) => {
              onSuccess("success");
            }}
            listType="picture-card"
            maxCount={1}
            fileList={formik.getFieldProps("logo").value}
            onPreview={handlePreview}
            onChange={({ fileList }) => handleFileChange("logo", fileList)}
          >
            {formik.getFieldProps("logo").value?.length < 1 && uploadButton}
          </Upload>
          {formik.errors.logo && formik.touched.logo && (
            <div style={{ color: "red" }}>{formik.errors.logo}</div>
          )}
        </div>

        <div>
          <label htmlFor="website_name">
            Website Name <span>*</span>
          </label>
          <Input
            id="website_name"
            name="website_name"
            value={formik.values.website_name}
            onChange={formik.handleChange}
          />
          {formik.errors.website_name && formik.touched.website_name && (
            <div style={{ color: "red" }}>{formik.errors.website_name}</div>
          )}
        </div>

        <div>
          <label htmlFor="whatsapp_chat_url">
            WhatsApp Chat URL <span>*</span>
          </label>
          <Input
            id="whatsapp_chat_url"
            name="whatsapp_chat_url"
            value={formik.values.whatsapp_chat_url}
            onChange={formik.handleChange}
          />
          {formik.errors.whatsapp_chat_url &&
            formik.touched.whatsapp_chat_url && (
              <div style={{ color: "red" }}>
                {formik.errors.whatsapp_chat_url}
              </div>
            )}
        </div>

        <div>
          <label htmlFor="social_media_links.twitter">
            Twitter Link <span>*</span>
          </label>
          <Input
            id="social_media_links.twitter"
            name="social_media_links.twitter"
            value={formik.values.social_media_links.twitter}
            onChange={formik.handleChange}
          />
          {formik.errors.social_media_links?.twitter &&
            formik.touched.social_media_links?.twitter && (
              <div style={{ color: "red" }}>
                {formik.errors.social_media_links.twitter}
              </div>
            )}
        </div>

        <div>
          <label htmlFor="social_media_links.facebook">
            Facebook Link <span>*</span>
          </label>
          <Input
            id="social_media_links.facebook"
            name="social_media_links.facebook"
            value={formik.values.social_media_links.facebook}
            onChange={formik.handleChange}
          />
          {formik.errors.social_media_links?.facebook &&
            formik.touched.social_media_links?.facebook && (
              <div style={{ color: "red" }}>
                {formik.errors.social_media_links.facebook}
              </div>
            )}
        </div>

        <div>
          <label htmlFor="social_media_links.instagram">
            Instagram Link <span>*</span>
          </label>
          <Input
            id="social_media_links.instagram"
            name="social_media_links.instagram"
            value={formik.values.social_media_links.instagram}
            onChange={formik.handleChange}
          />
          {formik.errors.social_media_links?.instagram &&
            formik.touched.social_media_links?.instagram && (
              <div style={{ color: "red" }}>
                {formik.errors.social_media_links.instagram}
              </div>
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

export default SettingEdit;

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
