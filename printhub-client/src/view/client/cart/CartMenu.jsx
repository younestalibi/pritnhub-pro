import React, { useEffect, useState } from "react";
import { Button, Drawer, Flex, Image, List, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  resetStateCart,
} from "../../../provider/features/cart/CartSlice";
import { calculateItemTotal, calculateTotal } from "../../../utils/functions";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
const CartMenu = (props) => {
  const { open, setOpen } = props;
  const [loading, setLoading] = useState(false);

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

  const [loadingItemId, setLoadingItemId] = useState(null);
  return (
    <>
      <Drawer
        closable
        destroyOnClose
        title={
          <Flex justify="space-between" align="center">
            <h2>Cart Items</h2>
            <Button
              type="link"
              style={{}}
              onClick={() => {
                dispatch(getCartItems());
              }}
            >
              Reload
            </Button>
          </Flex>
        }
        placement="right"
        open={open}
        loading={getCartItemsState.isLoading}
        onClose={() => setOpen(false)}
      >
        <List
          dataSource={carts}
          renderItem={(item) => (
            <List.Item>
              <Flex
                style={{ width: "100%" }}
                justify="space-around"
                gap={20}
                align="flex-start"
              >
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
                    width={60}
                    height={60}
                    style={{ objectFit: "contain" }}
                    crossOrigin={import.meta.env.VITE_CLIENT_URL}
                    loading="lazy"
                    src={`${import.meta.env.VITE_SERVER_URL}/${
                      item.Product.image[0]
                    }`}
                  />
                </Image.PreviewGroup>

                <List.Item.Meta
                  title={item.Product.name}
                  description={`Quantity: ${
                    item.quantity
                  } - Price: ${calculateItemTotal(item).toFixed(2)}$`}
                />
              </Flex>
            </List.Item>
          )}
        />
        <hr />
        <Flex justify="center" align="center">
          <h3>Total: {calculateTotal(carts).toFixed(2)}$</h3>
        </Flex>
        <Link to={"/cart"}>
          <Button
            onClick={() => {
              setOpen(!open);
            }}
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
            Validate Cart
          </Button>
        </Link>
      </Drawer>
    </>
  );
};
export default CartMenu;
