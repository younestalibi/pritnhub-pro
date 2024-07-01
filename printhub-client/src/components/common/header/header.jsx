import { useEffect, useState } from "react";
import { Menu, Input, Badge, Avatar, Image, AutoComplete } from "antd";
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
import {
  getCatalogs,
  resetStateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import {
  getProducts,
  resetStateProduct,
} from "../../../provider/features/product/ProductSlice";

export default function AppHeader() {
  const [current, setCurrent] = useState(null);
  const { carts, addCartItemState } = useSelector((state) => state.cart);
  const { catalogs, getCatalogsState } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.setting);
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = useAuth();
  const [open, setOpen] = useState(false);
  const items = [];
  const { products, getProductsState } = useSelector((state) => state.product);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  for (let i = 0; i < catalogs.length; i++) {
    items.push({
      key: `${catalogs[i].name} ${i}`,
      label: catalogs[i].name,
      children: catalogs[i]?.Products.map((product, index) => {
        return {
          key: `${product.name} ${index}`,
          label: <Link to={`/product/${product.id}`}>{product.name}</Link>,
        };
      }),
    });
  }
  useEffect(() => {
    if (carts.length == 0 && isAuthenticated) {
      dispatch(getCartItems());
    } else {
      dispatch(resetStateCart());
    }
  }, [user]);
  useEffect(() => {
    if (catalogs.length == 0) {
      dispatch(getCatalogs());
    } else {
      dispatch(resetStateCatalog());
    }
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    } else {
      dispatch(resetStateProduct());
    }
  }, []);
  const onSearch = (e) => {
    setSearchValue(e);

    if (!e) {
      setFilteredOptions([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(true);
  };

  const handleSelect = (id) => {
    setSearchValue("");
    setShowOptions(false);
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className="header">
        <div className="container-fluid">
          <div className="headerMain">
            <div className="logo">
              <Link to={"/"}>
                <img
                  alt={settings?.website_name}
                  width={200}
                  style={{ objectFit: "contain" }}
                  crossOrigin={import.meta.env.VITE_CLIENT_URL}
                  loading="lazy"
                  src={`${import.meta.env.VITE_SERVER_URL}/${settings?.logo}`}
                />
              </Link>
            </div>

            <div className="autocomplete-container">
              <input
                type="text"
                className="autocomplete-input"
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search products"
              />
              {showOptions && searchValue && (
                <ul className="autocomplete-options">
                  {filteredOptions.map((product) => (
                    <li
                      key={product.id}
                      className="autocomplete-option"
                      onClick={() => handleSelect(product.id)}
                    >
                      <span>{product.name}</span>
                      <img
                        width={40}
                        height={40}
                        style={{ objectFit:'contain' }}
                        crossOrigin={import.meta.env.VITE_CLIENT_URL}
                        src={`${import.meta.env.VITE_SERVER_URL}/${
                          product.image[0]
                        }`}
                        alt=""
                      />
                    </li>
                  ))}
                </ul>
              )}
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
