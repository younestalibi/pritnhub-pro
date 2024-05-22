import React from "react";
import { Tabs, Flex } from "antd";
import ProfileInformation from "./ProfileInformation";
import UpdatePassword from "./UpdatePassword";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "profile",
    label: "Profile",
    children: <ProfileInformation />,
  },
  {
    key: "update-password",
    label: "Update Password",
    children: <UpdatePassword />,
  },
  {
    key: "address",
    label: "Addresses",
    children: "Content of Tab Pane 3",
  },
];
const ProfileIndex = () => (
  <Flex
    style={{ minHeight: "80vh" }}
    justify="center"
    align="center"
  >
    <Tabs style={{ minWidth:'70%' }} defaultActiveKey="profile" items={items} onChange={onChange} />
  </Flex>
);
export default ProfileIndex;
