import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import {
  deleteArticleById,
  getArticles,
  resetStateArticle,
} from "../../../provider/features/article/ArticleSlice";
import { Button, Table, Typography, notification } from "antd";
import { Image } from "antd";
import Confirmation from "../../../components/CustomAlert/Confirmation";
import ArticleCreate from "./ArticleCreate";
import ArticleEdit from "./ArticleEdit";

const ArticleIndex = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const [createArticleModal, setCreateArticleModal] = useState(false);
  const [editArticleModal, setEditArticleModal] = useState(false);
  const { articles, getArticlesState, deleteArticleByIdState } = useSelector(
    (state) => state.article
  );
  const data = [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (articles.length == 0) {
      dispatch(getArticles());
    } else {
      dispatch(resetStateArticle());
    }
  }, []);

  useEffect(() => {
    if (deleteArticleByIdState.isSuccess) {
      setOpen(false);
      notification.open({
        description: deleteArticleByIdState.message,
        duration: 3,
        type: "success",
      });
    }
    if (deleteArticleByIdState.isError) {
      setOpen(false);
      notification.open({
        description: deleteArticleByIdState.message,
        duration: 3,
        type: "error",
      });
    }
    dispatch(resetStateArticle());
  }, [deleteArticleByIdState.isSuccess, deleteArticleByIdState.isError]);

  const deleteRecord = (e) => {
    dispatch(deleteArticleById(deleteId));
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };

  for (let i = 0; i < articles.length; i++) {
    data.push({
      key: i,
      name: articles[i].name,
      description: articles[i].description,
      unit_price: articles[i].unit_price,
      quantity: articles[i].quantity,
      min_quantity: articles[i].min_quantity,
      image: (
        <Image
          alt={articles[i].name}
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
          crossOrigin={import.meta.env.VITE_CLIENT_URL}
          loading="lazy"
          src={`${import.meta.env.VITE_SERVER_URL}/${articles[i].image}`}
        />
      ),
      action: (
        <>
          <span
            onClick={() => {
              setEditId(articles[i].id);
              setEditArticleModal(true);
            }}
            className="btn-edit"
          >
            <BiEdit />
          </span>
          <span
            className="btn-delete"
            onClick={() => showModal(articles[i].id)}
          >
            <AiFillDelete />
          </span>
        </>
      ),
    });
  }
  const start = () => {
    dispatch(getArticles());
  };

  return (
    <div>
      <BreadCrumb titles={["Home", "Article"]} />
      <Typography.Title level={2}>Articles</Typography.Title>
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
          loading={getArticlesState.isLoading}
        >
          Refresh Articles
        </Button>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            setCreateArticleModal(true);
          }}
          type="primary"
          icon={<IoAddOutline size={20} />}
        >
          Create new article
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={getArticlesState.isLoading}
        scroll={{ x: 1000 }}
      />
      <Confirmation
        setOpen={setOpen}
        open={open}
        performAction={() => {
          deleteRecord(deleteId);
        }}
        okType="danger"
        okText="Delete anyway!"
        description="Are you sure you want to delete this Article?"
        title="Confirmation"
        loading={deleteArticleByIdState.isLoading}
      />
      <ArticleCreate
        setOpen={setCreateArticleModal}
        open={createArticleModal}
      />
      <ArticleEdit
        setOpen={setEditArticleModal}
        open={editArticleModal}
        id={editId}
      />
    </div>
  );
};

export default ArticleIndex;

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
    title: "Unit Price",
    dataIndex: "unit_price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Min Quantity",
    dataIndex: "min_quantity",
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
