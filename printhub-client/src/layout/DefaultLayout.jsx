import { FloatButton, Layout } from "antd";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/common/header/header";
import AppFooter from "../components/common/footer/footer";
const { Header, Content, Footer } = Layout;

function DefaultLayout() {
  const { settings } = useSelector((state) => state.setting);

  return (
    <Layout className="mainLayout">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <AppHeader />
      </Header>

      <Content style={{ padding: "50px 0px" }}>
        <Outlet />
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
      <FloatButton.Group
        shape="circle"
        style={{
          right: 0,
        }}
      >
        {settings && (
          <FloatButton
            tooltip="Whatsapp"
            href={`https://wa.me/${settings.whatsapp_chat_url}`}
            icon={<FaWhatsapp color="green" />}
          />
        )}
        <FloatButton.BackTop tooltip="Back to top" />
      </FloatButton.Group>
    </Layout>
  );
}

export default DefaultLayout;
