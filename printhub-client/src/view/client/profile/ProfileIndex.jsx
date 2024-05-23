import React from "react";
import { Tabs, Flex } from "antd";
import ProfileInformation from "./ProfileInformation";
import ProfilePassword from "./ProfilePassword";
import ProfileAddress from "./ProfileAddress";

const ProfileIndex = () => (
  <div style={{ width: "80%", margin: "auto" }}>
    <h2>Profile</h2>
    <Flex style={{ minHeight: "80vh" }} justify="center">
      <Tabs
        animated
        style={{ width: "100%" }}
        defaultActiveKey="profile"
        items={items}
      />
    </Flex>
  </div>
);
export default ProfileIndex;

const items = [
  {
    key: "profile",
    label: "Profile",
    children: <ProfileInformation />,
  },
  {
    key: "update-password",
    label: "Update Password",
    children: <ProfilePassword />,
  },
  {
    key: "address",
    label: "Addresses",
    children: <ProfileAddress />,
  },
];
