import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../style/DashboardLayout.css";
import AvatarProfile from "../components/Avatar/AvatarProfile";

const { Header, Sider, Content } = Layout;
const DasbhoardLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical"></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[getSelectedDefault()]}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            {
              key: "overview",
              icon: <UserOutlined />,
              label: "OverView",
            },
            {
              key: "catalog",
              icon: <VideoCameraOutlined />,
              label: "Catalog",
            },
            {
              key: "orders",
              icon: <UploadOutlined />,
              label: "Orders",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <header className="header-nav">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="avatar-container">
              <AvatarProfile />
            </div>
          </header>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
function getSelectedDefault() {
  const location = useLocation();
  const currentPath = location.pathname;
  const parts = currentPath.split("/");
  if (parts.length > 2) {
    return parts[2];
  }
  return "";
}
export default DasbhoardLayout;
