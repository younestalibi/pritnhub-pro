import { PlusOutlined } from "@ant-design/icons";
import { Input, Modal, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import { createCatalog } from "../../provider/features/catalog/CatalogSlice";
import { useDispatch, useSelector } from "react-redux";

const CatalogCreate = (props) => {
  const { open, setOpen } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const initialState = {
    name: "",
    image: null,
  };
  const [catalog, setCatalog] = useState(initialState);
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
  }, [createCatalogState.isSuccess, createCatalogState.isError]);

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
  const handleOk = () => {
    const formData = new FormData();
    formData.append("name", catalog.name);
    formData.append("image", catalog.image);
    dispatch(createCatalog(formData));
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      title="Title"
      open={open}
      onOk={handleOk}
      confirmLoading={createCatalogState.isLoading}
      onCancel={handleCancel}
    >
      <Input
        name="name"
        value={catalog.name}
        onChange={(e) => {
          setCatalog((prev) => ({ ...prev, name: e.target.value }));
        }}
      />

      <Upload
        customRequest={({ onSuccess }) => {
          onSuccess("success");
        }}
        listType="picture-card"
        maxCount={1}
        onPreview={handlePreview}
        onChange={({ file }) => {
          setCatalog((prev) => ({ ...prev, image: file.originFileObj }));
        }}
      >
        {uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img
          alt="example"
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
