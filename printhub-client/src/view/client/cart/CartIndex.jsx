import { useEffect, useState } from "react";
import {
  clearCart,
  deleteItemById,
  getCartItems,
  resetStateCart,
} from "../../../provider/features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Avatar,
  List,
  Space,
  Row,
  Collapse,
  Image,
  Typography,
  Button,
  notification,
} from "antd";
import React from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { calculateItemTotal, calculateTotal } from "../../../utils/functions";
import useAuth from "../../../hooks/useAuth";

const { Title, Paragraph } = Typography;

const CartIndex = () => {
  const { carts, deleteItemByIdState, getCartItemsState, clearCartState } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const items = carts
    ? [
        ...carts.map((item, index) => {
          return {
            key: index,
            label: "Details",
            children: (
              <ul>
                {Object.keys(item.customizations).map((key) => (
                  <li key={key}>{`${key}: ${item.customizations[key]}`}</li>
                ))}
              </ul>
            ),
          };
        }),
      ]
    : [];

  const isAuthenticated = useAuth();

  useEffect(() => {
    if (carts.length == 0 && isAuthenticated) {
      dispatch(getCartItems());
    } else {
      dispatch(resetStateCart());
    }
  }, []);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (deleteItemByIdState.isSuccess || clearCartState.isSuccess) {
      notification.open({
        description: deleteItemByIdState.message || clearCartState.message,
        duration: 3,
        type: "success",
      });
    }
    if (deleteItemByIdState.isError || clearCartState.isError) {
      notification.open({
        description: deleteItemByIdState.message || clearCartState.message,
        duration: 3,
        type: "error",
      });
    }
    dispatch(resetStateCart());
  }, [
    deleteItemByIdState.isSuccess,
    deleteItemByIdState.isError,
    clearCartState.isSuccess,
    clearCartState.isError,
  ]);

  const [loadingItemId, setLoadingItemId] = useState(null);

  return (
    <Row justify={"space-evenly"} align={"stretch"} style={{ minHeight:'100vh' }}>
      <Col lg={{ span: 14 }} md={{ span: 24 }}>
        {carts.length > 0 && (
          <Button
            danger
            style={{
              paddingLeft: "0px",
              marginBottom: "10px",
            }}
            type="link"
            onClick={() => {
              dispatch(clearCart());
            }}
            loading={clearCartState.isLoading}
          >
            Clear Cart
          </Button>
        )}
        <List
          itemLayout="vertical"
          size="small"
          pagination={{
            pageSize: 5,
          }}
          loading={getCartItemsState.isLoading}
          dataSource={carts}
          renderItem={(item) => (
            <List.Item
              style={{
                boxShadow: "0px 0px 7px 0px #00000029",
                marginBottom: "10px",
              }}
              key={item.id}
              actions={[
                <Button
                  type="link"
                  danger={true}
                  loading={
                    deleteItemByIdState.isLoading && item.id == loadingItemId
                  }
                  disabled={deleteItemByIdState.isLoading}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0px",
                  }}
                >
                  <AiFillDelete
                    size={22}
                    color="red"
                    cursor={"pointer"}
                    onClick={() => {
                      setLoadingItemId(item.id);
                      dispatch(deleteItemById(item.id));
                    }}
                  />
                </Button>,
              ]}
              extra={
                // <Image
                //   alt={item.Product.name}
                //   width={200}
                //   height={200}
                //   style={{ objectFit: "cover" }}
                //   crossOrigin={import.meta.env.VITE_CLIENT_URL}
                //   loading="lazy"
                //   src={`${import.meta.env.VITE_SERVER_URL}/${
                //     item.Product.image
                //   }`}
                // />
                <Image.PreviewGroup
                  items={item.Product.image.map((image, index) => {
                    return {
                      src: `${import.meta.env.VITE_SERVER_URL}/${image}`,
                      crossOrigin: import.meta.env.VITE_CLIENT_URL,
                      loading: "lazy",
                      alt: item.Product.name,
                    };
                  })}
                >
                  <Image
                    alt={item.Product.name}
                    width={200}
                    height={200}
                    style={{ objectFit: "contain" }}
                    crossOrigin={import.meta.env.VITE_CLIENT_URL}
                    loading="lazy"
                    src={`${import.meta.env.VITE_SERVER_URL}/${
                      item.Product.image[0]
                    }`}
                  />
                </Image.PreviewGroup>
              }
            >
              <List.Item.Meta
                title={item.Product.name}
                description={
                  <Paragraph
                    ellipsis={{
                      rows: 1,
                      expandable: "collapsible",
                      expanded: expanded,
                      onExpand: (_, info) => {
                        setExpanded(info.expanded);
                      },
                    }}
                  >
                    {item.Product.description}
                  </Paragraph>
                }
              />
              <Collapse
                items={[
                  {
                    key: item.index,
                    label: "Details",
                    children: (
                      <ul>
                        <li key={"quantity"}>
                          <b>Quantity =</b> <span>{item.quantity}</span>
                        </li>
                        {Object.keys(item.customizations).map((key) => (
                          <li key={key}>
                            <b>{key} =</b>{" "}
                            <span>{item.customizations[key]}</span>
                          </li>
                        ))}
                        <li>
                          <Image.PreviewGroup
                            items={item.image.map((image, index) => {
                              return {
                                src: `${
                                  import.meta.env.VITE_SERVER_URL
                                }/${image}`,
                                crossOrigin: import.meta.env.VITE_CLIENT_URL,
                                loading: "lazy",
                              };
                            })}
                          >
                            <Image
                              width={60}
                              height={60}
                              style={{ objectFit: "contain" }}
                              crossOrigin={import.meta.env.VITE_CLIENT_URL}
                              loading="lazy"
                              src={`${import.meta.env.VITE_SERVER_URL}/${
                                item.image[0]
                              }`}
                            />
                          </Image.PreviewGroup>
                        </li>
                      </ul>
                    ),
                  },
                ]}
              />
              <h3>Total: {calculateItemTotal(item).toFixed(2)}$</h3>
            </List.Item>
          )}
        />
      </Col>
      <Col lg={{ span: 8 }} md={{ span: 24 }}>
        <div style={{ position: "sticky", top: "0px" }}>
          <Row justify={"space-between"} align={"middle"}>
            <Col>
              <h1>Total Price</h1>
            </Col>
            <Col>
              <h1>{calculateTotal(carts).toFixed(2)}$</h1>
            </Col>
          </Row>
          <Link to={"/checkout"}>
            <Button
              block
              type="primary"
              style={{
                backgroundColor: "#c43b53",
                padding: "19px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Checkout
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default CartIndex;
