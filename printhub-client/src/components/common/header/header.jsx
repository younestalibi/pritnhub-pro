import { Menu,Input } from "antd";
import "./header.css";
const { Search } = Input;
import { useNavigate } from "react-router-dom";

const onSearch = (value, _e, info) => console.log(info?.source, value);
export default function AppHeader() {
  const navigate = useNavigate();
  const items = [
    { key: 1, label: "Home" },
    { key: 2, label: "Our products" },
    { key: 3, label: "About us" },
    { key: 4, label: "Contact" },
  ];
  const HandleOnClick = ({ key }) => {
    navigate(key);
  };
  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <strong>
            <span>PrintHub</span>-Pro
          </strong>
        </div>
        <div className="SearchInput">
          <Search
            placeholder="search product"
            onSearch={onSearch}
            enterButton
            style={{ flex: 1, minWidth: 0, alignItems: "center" }}
          />
        </div>
        <div
          style={{
            width: "400px",
          }}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 400,
            }}
            onClick={HandleOnClick}
          />
        </div>
      </div>
    </div>
  );
}
