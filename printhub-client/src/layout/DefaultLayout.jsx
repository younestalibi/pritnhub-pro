import { FloatButton, Layout } from "antd";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/common/header/header";
import AppFooter from "../components/common/footer/footer";
import ChatbotComponent from "../components/ChatBot/ChatBot";
import { useState } from "react";
import { TbMessageChatbot } from "react-icons/tb";

const { Header, Content, Footer } = Layout;

function DefaultLayout() {
  const { settings } = useSelector((state) => state.setting);
  let [showChat, setShowChat] = useState(true);
  const triggerChat = () => {
    setShowChat(!showChat);
  };
  return (
    <Layout className="mainLayout" style={{ overflowX:'hidden' }}>
      <Header style={{ display: "flex", alignItems: "center",zIndex:'0px' }}>
        <AppHeader />
      </Header>

      <Content>
        <Outlet />
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
      <FloatButton.Group
        shape="circle"
        style={{
          right: 20,
        }}
      >
        {settings && (
          <FloatButton
            target="_blank"
            tooltip="Whatsapp"
            href={`https://wa.me/${settings.whatsapp_chat_url}`}
            icon={<FaWhatsapp color="green" />}
          />
        )}
        <FloatButton
          onClick={triggerChat}
          icon={<TbMessageChatbot color="blue" />}
          tooltip="Chatbot"
        />
        <FloatButton.BackTop tooltip="Back to top" />
      </FloatButton.Group>
      <ChatbotComponent showChat={showChat} />
    </Layout>
  );
}

export default DefaultLayout;
