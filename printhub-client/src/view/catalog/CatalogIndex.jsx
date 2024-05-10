import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/BreadCrumb/BreadCrum";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  deleteCatalogById,
  getCatalogs,
  resetStateCatalog,
} from "../../provider/features/catalog/CatalogSlice";
import { Button, Table } from "antd";
import { Image } from "antd";
import { Link } from "react-router-dom";
import Confirmation from "../../components/CustomAlert/Confirmation";
import CatalogCreate from "./CatalogCreate";

const CatalogIndex = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [createCatalogModal, setCreateCatalogModal] = useState(false);
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
      image: (
        <Image
          alt={catalogs[i].name}
          width={60}
          src={`${import.meta.env.VITE_SERVER_URL}/${catalogs[i].image}`}
        />
      ),
      action: (
        <>
          <Link
            to={`/admin/catalog/edit/${catalogs[i].id}`}
            className="btn-edit"
          >
            <BiEdit />
          </Link>
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

  return (
    <div>
      <BreadCrumb titles={["Home", "Catalog"]} />
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          onClick={() => {
            setCreateCatalogModal(true);
          }}
          type="primary"
        >
          Create new catalog
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={getCatalogsState.isLoading}
      />
      <Confirmation
        setOpen={setOpen}
        open={open}
        performAction={() => {
          deleteRecord(deleteId);
        }}
        title="Are you sure you want to delete this Catalog?"
        loading={deleteCatalogByIdState.isLoading}
      />
      <CatalogCreate
        setOpen={setCreateCatalogModal}
        open={createCatalogModal}
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
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];
