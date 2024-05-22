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
  console.log(items);
  useEffect(() => {
    if (carts.length == 0) {
      dispatch(getCartItems());
    } else {
      dispatch(resetStateCart());
    }
  }, []);

  console.log(carts);
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
  // const calculateTotal = (cartItems) => {
  //   return cartItems.reduce((total, item) => {
  //     const basePrice = parseFloat(item.Product.price);
  //     const quantity = item.quantity;

  //     // Calculate the total price adjustment for customizations
  //     const customizationTotal = Object.keys(item.customizations).reduce(
  //       (sum, key) => {
  //         const customizationValue = item.customizations[key];
  //         const option = item.Product.options.find((opt) => opt.name === key);

  //         if (option) {
  //           if (Array.isArray(customizationValue)) {
  //             // For checkbox type customizations
  //             const adjustments = customizationValue.reduce((acc, value) => {
  //               const choice = option.choices.find(
  //                 (choice) => choice.value === value
  //               );
  //               return acc + (choice ? parseFloat(choice.priceAdjustment) : 0);
  //             }, 0);
  //             return sum + adjustments;
  //           } else {
  //             // For text, number, select, radio type customizations
  //             const choice = option.choices
  //               ? option.choices.find(
  //                   (choice) => choice.value === customizationValue
  //                 )
  //               : null;
  //             return sum + (choice ? parseFloat(choice.priceAdjustment) : 0);
  //           }
  //         }

  //         return sum;
  //       },
  //       0
  //     );

  //     // Calculate total price for the item
  //     const itemTotal = (basePrice + customizationTotal) * quantity;
  //     return total + itemTotal;
  //   }, 0);
  // };
  // Function to calculate total price for a single item
  const calculateItemTotal = (item) => {
    const basePrice = parseFloat(item.Product.price);
    const quantity = item.quantity;

    // Calculate the total price adjustment for customizations
    const customizationTotal = Object.keys(item.customizations).reduce(
      (sum, key) => {
        const customizationValue = item.customizations[key];
        const option = item.Product.options.find((opt) => opt.name === key);

        if (option) {
          if (Array.isArray(customizationValue)) {
            // For checkbox type customizations
            const adjustments = customizationValue.reduce((acc, value) => {
              const choice = option.choices.find(
                (choice) => choice.value === value
              );
              return acc + (choice ? parseFloat(choice.priceAdjustment) : 0);
            }, 0);
            return sum + adjustments;
          } else {
            // For text, number, select, radio type customizations
            const choice = option.choices
              ? option.choices.find(
                  (choice) => choice.value === customizationValue
                )
              : null;
            return sum + (choice ? parseFloat(choice.priceAdjustment) : 0);
          }
        }

        return sum;
      },
      0
    );

    // Calculate total price for the item
    const itemTotal = (basePrice + customizationTotal) * quantity;
    return itemTotal;
  };

  // Function to calculate total price for all items in the cart
  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
      const itemTotal = calculateItemTotal(item);
      return total + itemTotal;
    }, 0);
  };

  if (carts.length > 0) {
    console.log(calculateTotal(carts));
    console.log(calculateItemTotal(carts[0]));
  }
  return (
    <Row justify={"space-evenly"} align={"stretch"}>
      <Col lg={{ span: 14 }} md={{ span: 24 }}>
        {carts.length > 0 && (
          <Button
            danger
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
                  style={{ display: "flex", alignItems: "center" }}
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
                <Image
                  alt={item.Product.name}
                  width={272}
                  height={220}
                  style={{ objectFit: "cover" }}
                  crossOrigin={import.meta.env.VITE_CLIENT_URL}
                  loading="lazy"
                  src={`${import.meta.env.VITE_SERVER_URL}/${
                    item.Product.image
                  }`}
                />
              }
            >
              <List.Item.Meta
                title={item.Product.name}
                description={
                  <Paragraph
                    ellipsis={{
                      rows: 3,
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
                      </ul>
                    ),
                  },
                ]}
              />
              <h3>Total: {calculateItemTotal(item)}</h3>
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
              <h1>{calculateTotal(carts)}</h1>
            </Col>
          </Row>
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
            <Link to={"/checkout"}>Checkout</Link>
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default CartIndex;
