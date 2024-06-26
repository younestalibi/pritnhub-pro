import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";

import {
  deleteCatalogById,
  getCatalogs,
  resetStateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import { Button, Table, Typography, notification } from "antd";
import { Image } from "antd";
import { Link } from "react-router-dom";
import Confirmation from "../../../components/CustomAlert/Confirmation";
import CatalogCreate from "./CatalogCreate";
import { icons } from "antd/es/image/PreviewGroup";
import CatalogEdit from "./CatalogEdit";

const CatalogIndex = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const [createCatalogModal, setCreateCatalogModal] = useState(false);
  const [editCatalogModal, setEditCatalogModal] = useState(false);
  const { catalogs, getCatalogsState, deleteCatalogByIdState } = useSelector(
    (state) => state.catalog
  );
  const data = [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (catalogs.length == 0) {
      dispatch(getCatalogs());
    } else {
      dispatch(resetStateCatalog());
    }
  }, []);

  useEffect(() => {
    if (deleteCatalogByIdState.isSuccess) {
      setOpen(false);
      notification.open({
        description: deleteCatalogByIdState.message,
        duration: 3,
        type: "success",
      });
    }
    if (deleteCatalogByIdState.isError) {
      setOpen(false);
      notification.open({
        description: deleteCatalogByIdState.message,
        duration: 3,
        type: "error",
      });
    }
    dispatch(resetStateCatalog());

  }, [deleteCatalogByIdState.isSuccess, deleteCatalogByIdState.isError]);

  const deleteRecord = (e) => {
    dispatch(deleteCatalogById(deleteId));
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };
  for (let i = 0; i < catalogs.length; i++) {
    data.push({
      key: i,
      name: catalogs[i].name,
      description: catalogs[i].description,
      image: (
        <Image
          alt={catalogs[i].name}
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
          crossOrigin={import.meta.env.VITE_CLIENT_URL}
          loading="lazy"
          src={`${import.meta.env.VITE_SERVER_URL}/${catalogs[i].image}`}
        />
      ),
      action: (
        <>
          <span
            onClick={() => {
              setEditId(catalogs[i].id);
              setEditCatalogModal(true);
            }}
            className="btn-edit"
          >
            <BiEdit />
          </span>
          <span
            className="btn-delete"
            onClick={() => showModal(catalogs[i].id)}
          >
            <AiFillDelete />
          </span>
        </>
      ),
    });
  }
  const start = () => {
    dispatch(getCatalogs());
  };

  return (
    <div>
      <BreadCrumb titles={["Home", "Catalog"]} />
      <Typography.Title level={2}>Catalogs</Typography.Title>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="dashed"
          onClick={start}
          loading={getCatalogsState.isLoading}
        >
          Refresh Catalogs
        </Button>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            setCreateCatalogModal(true);
          }}
          type="primary"
          icon={<IoAddOutline size={20} />}
        >
          Create new catalog
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={getCatalogsState.isLoading}
        scroll={{ x: 1000}}
      />
      <Confirmation
        setOpen={setOpen}
        open={open}
        performAction={() => {
          deleteRecord(deleteId);
        }}
        okType="danger"
        okText="Delete anyway!"
        description="Are you sure you want to delete this Catalog?"
        title="Confirmation"
        loading={deleteCatalogByIdState.isLoading}
      />
      <CatalogCreate
        setOpen={setCreateCatalogModal}
        open={createCatalogModal}
      />
      <CatalogEdit
        setOpen={setEditCatalogModal}
        open={editCatalogModal}
        id={editId}
      />
    </div>
  );
};

export default CatalogIndex;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];
