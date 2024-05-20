import React, { useEffect } from "react";
import "../../style/AvatarProfile.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Dropdown, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../provider/features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const AvatarProfile = () => {
  const dispatch = useDispatch();
  const { logoutState } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (logoutState.isSuccess) {
      navigate("/");
    }
  }, [logoutState.isSuccess]);
  const items = [
    {
      label: <a href="">Profile</a>,
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: <b onClick={handleLogOut}>Log out</b>,
      danger: true,
      key: "1",
    },
  ];

  return (
    <Dropdown
      style={{ color: "blue" }}
      className="hello"
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space direction="vertical" size={16}>
          <Avatar
            size="middle"
            icon={<UserOutlined />}
            style={{
              backgroundColor: "#1890ff",
            }}
          />
        </Space>
      </a>
    </Dropdown>
  );
};
export default AvatarProfile;
