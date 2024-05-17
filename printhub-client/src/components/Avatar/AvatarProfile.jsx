import React from "react";
import "../../style/AvatarProfile.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Dropdown } from "antd";
const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "Log out",
    danger: true,
    key: "3",
  },
];
const AvatarProfile = () => (
  <Dropdown
    style={{ color: "blue" }}
    className="hello"
    menu={{
      items,
    }}
    trigger={["click"]}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space direction="vertical" size={16}   >
        <Avatar size="middle" 
        icon={<UserOutlined />}  
        style={{
        backgroundColor: '#1890ff',
        }}/>
      </Space>
    </a>
  </Dropdown>
);
export default AvatarProfile;
