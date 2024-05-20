import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";

import {
  getCatalogs,
  resetStateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import { Button, Popover, Table, notification } from "antd";
import { Image } from "antd";
import Confirmation from "../../../components/CustomAlert/Confirmation";

import {
  deleteProductById,
  getProducts,
  resetStateProduct,
} from "../../../provider/features/product/ProductSlice";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";

const ProductIndex = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const { products, getProductsState, deleteProductByIdState } = useSelector(
    (state) => state.product
  );
  const { catalogs } = useSelector((state) => state.catalog);
  const data = [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length == 0) {
      dispatch(getProducts());
    } else {
      dispatch(resetStateProduct());
    }

    if (catalogs.length == 0) {
      dispatch(getCatalogs());
    } else {
      dispatch(resetStateCatalog());
    }
  }, []);

  useEffect(() => {
    if (deleteProductByIdState.isSuccess) {
      setOpen(false);
      notification.open({
        description: deleteProductByIdState.message,
        duration: 3,
        type: "success",
      });
    }
    if (deleteProductByIdState.isError) {
      setOpen(false);
      notification.open({
        description: deleteProductByIdState.message,
        duration: 3,
        type: "error",
      });
    }
  }, [deleteProductByIdState.isSuccess, deleteProductByIdState.isError]);

  const deleteRecord = (e) => {
    dispatch(deleteProductById(deleteId));
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };
  for (let i = 0; i < products.length; i++) {
    data.push({
      key: i,
      name: products[i].name,
      description: (
        <Popover
          content={products[i].description}
          title="Description"
          trigger="hover"
        >
          {products[i].description.slice(0, 13) + "..."}
        </Popover>
      ),
      catalog: catalogs.find((e) => e.id == products[i].catalog_id).name,
      price: products[i].price,
      quantity: products[i].quantity.max,
      options: (
        <Popover
          content={products[i].options.map((option, i) => (
            <pre key={i}>{JSON.stringify(option, null, 2)}</pre>
          ))}
          title="Form Details"
          trigger="hover"
        >
          Customizations list
        </Popover>
      ),
      image: (
        <Image
          alt={products[i].name}
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
          crossOrigin={import.meta.env.VITE_CLIENT_URL}
          loading="lazy"
          src={`${import.meta.env.VITE_SERVER_URL}/${products[i].image}`}
        />
      ),
      action: (
        <>
          <span
            onClick={() => {
              setEditId(products[i].id);
              setEditProductModal(true);
            }}
            className="btn-edit"
          >
            <BiEdit />
          </span>
          <span
            className="btn-delete"
            onClick={() => showModal(products[i].id)}
          >
            <AiFillDelete />
          </span>
        </>
      ),
    });
  }
  const refreshProducts = () => {
    dispatch(getProducts());
  };

  return (
    <div>
      <BreadCrumb titles={["Home", "Product"]} />
      <h1>Products</h1>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="dashed"
          onClick={refreshProducts}
          loading={getProductsState.isLoading}
        >
          Refresh Products
        </Button>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            setCreateProductModal(true);
          }}
          type="primary"
          icon={<IoAddOutline size={20} />}
        >
          Create new product
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={getProductsState.isLoading}
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
        description="Are you sure you want to delete this Product?"
        title="Confirmation"
        loading={deleteProductByIdState.isLoading}
      />
      <ProductCreate
        setOpen={setCreateProductModal}
        open={createProductModal}
      />
      <ProductEdit
        setOpen={setEditProductModal}
        open={editProductModal}
        id={editId}
      />
    </div>
  );
};

export default ProductIndex;

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
    title: "Catalog",
    dataIndex: "catalog",

  },
  {
    title: "Options",
    dataIndex: "options",

  },
  {
    title: "Quantity",
    dataIndex: "quantity",

  },
  {
    title: "Price",
    dataIndex: "price",

  },
  {
    title: "Actions",
    dataIndex: "action",

  },
];
