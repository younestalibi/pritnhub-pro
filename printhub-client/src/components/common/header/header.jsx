import { useEffect, useState } from "react";
import { Menu, Input, Badge, Avatar } from "antd";
import AvatarProfile from "../../Avatar/AvatarProfile";
import "./header.css";
import { ShoppingCartOutlined, CaretDownOutlined } from "@ant-design/icons";
const { Search } = Input;
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  resetStateCart,
} from "../../../provider/features/cart/CartSlice";
import useAuth from "../../../hooks/useAuth";
import CartMenu from "../../../view/client/cart/CartMenu";


export default function AppHeader() {
  const [current, setCurrent] = useState("mail");
  const { carts, addCartItemState } = useSelector((state) => state.cart);
  const { settings } = useSelector((state) => state.setting);

  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = useAuth();
  const [open, setOpen] = useState(false);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (carts.length == 0 && isAuthenticated) {
      dispatch(getCartItems());
    } else {
      dispatch(resetStateCart());
    }
  }, [user]);
  const onSearch=(e)=>{
    console.log(e)
  }

  return (
    <>
      <div className="header">
        <div className="container-fluid">
          <div className="headerMain">
            <div className="logo">
              <strong>
                {settings&&settings.website_name}
              </strong>
            </div>
            <div className="SearchInput">
              <Search
                size="large"
                placeholder="search product"
                onSearch={onSearch}
                enterButton
                style={{ flex: 2, minWidth: 0 }}
              />
            </div>
            <div className="header-user-actions">
              <Link to={"contact"}>
                <i className="fa-solid fa-headset headset-icon"></i>
              </Link>
              {isAuthenticated ? (
                <>
                  <Badge count={carts.length}>
                    {/* <Link to={"cart"}> */}
                    <ShoppingCartOutlined
                      onClick={() => setOpen(!open)}
                      style={{ fontSize: "32px" }}
                    />
                    {/* </Link> */}
                  </Badge>
                  <AvatarProfile />
                </>
              ) : (
                <>
                  <Link to={"login"}>Join us</Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="navBar">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ width: "100%" }}
            items={items}
          />
        </div>
      </div>
      <CartMenu open={open} setOpen={setOpen} />
    </>
  );
}

const items = [
  {
    label: (
      <span>
        Business Cards <CaretDownOutlined />
      </span>
    ),
    key: "BusinessCards",
    children: [
      {
        type: "group",
        label: "Standard Cards",
        children: [
          {
            label: "Standard Matte",
            key: "product:1",
          },
          {
            label: "Standard Glossy",
            key: "product:2",
          },
        ],
      },
      {
        type: "group",
        label: "Premium Cards",
        children: [
          {
            label: "Premium Matte",
            key: "product:3",
          },
          {
            label: "Premium Glossy",
            key: "product:4",
          },
        ],
      },
    ],
  },
  {
    label: (
      <span>
        Flyers <CaretDownOutlined />
      </span>
    ),
    key: "Flyers",
    children: [
      {
        type: "group",
        label: "Standard Flyers",
        children: [
          {
            label: "A5 Flyers",
            key: "product:5",
          },
          {
            label: "A4 Flyers",
            key: "product:6",
          },
        ],
      },
      {
        type: "group",
        label: "Folded Flyers",
        children: [
          {
            label: "Tri-Fold Flyers",
            key: "product:7",
          },
          {
            label: "Z-Fold Flyers",
            key: "product:8",
          },
        ],
      },
    ],
  },
  {
    label: (
      <span>
        Posters <CaretDownOutlined />
      </span>
    ),
    key: "Posters",
    children: [
      {
        type: "group",
        label: "Standard Posters",
        children: [
          {
            label: "A2 Posters",
            key: "product:9",
          },
          {
            label: "A1 Posters",
            key: "product:10",
          },
        ],
      },
      {
        type: "group",
        label: "Large Format Posters",
        children: [
          {
            label: "B1 Posters",
            key: "product:11",
          },
          {
            label: "B0 Posters",
            key: "product:12",
          },
        ],
      },
    ],
  },
  {
    label: (
      <span>
        Brochures <CaretDownOutlined />
      </span>
    ),
    key: "Brochures",
    children: [
      {
        type: "group",
        label: "Bi-Fold Brochures",
        children: [
          {
            label: "A4 Bi-Fold",
            key: "product:13",
          },
          {
            label: "A3 Bi-Fold",
            key: "product:14",
          },
        ],
      },
      {
        type: "group",
        label: "Tri-Fold Brochures",
        children: [
          {
            label: "A4 Tri-Fold",
            key: "product:15",
          },
          {
            label: "A3 Tri-Fold",
            key: "product:16",
          },
        ],
      },
    ],
  },
];
