import React from "react";
import { Tabs, Flex, Divider, Typography } from "antd";
import ProfileInformation from "./ProfileInformation";
import ProfilePassword from "./ProfilePassword";
import ProfileAddress from "./ProfileAddress";
import Container from "../../../components/common/container/Container";

const ProfileIndex = () => (
  <Container>
    <Divider orientation="left">
      <Typography.Title>Profile</Typography.Title>
    </Divider>
    <Flex style={{ minHeight: "80vh" }} justify="center">
      <Tabs
        animated
        style={{ width: "100%" }}
        defaultActiveKey="profile"
        items={items}
      />
    </Flex>
  </Container>
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
