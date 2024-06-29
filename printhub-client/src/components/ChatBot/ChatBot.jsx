import React from "react";
import ChatBot from "react-simple-chatbot";
import "./ChatBot.css";
import { useSelector } from "react-redux";
function ChatbotComponent({ showChat }) {
  const { settings } = useSelector((state) => state.setting);

  const steps = [
    {
      id: "1",
      message: "Hello!👋 How can I assist you today?",
      trigger: "options",
    },
    {
      id: "options",
      options: [
        {
          value: "orderStatus",
          label: "Check Order Status",
          trigger: "orderStatus",
        },
        {
          value: "shippingInfo",
          label: "Shipping Information",
          trigger: "shippingInfo",
        },

        {
          value: "contactSupport",
          label: "Contact Support",
          trigger: "contactSupport",
        },
        {
          value: "productInfo",
          label: "Product Information",
          trigger: "productInfo",
        },
        {
          value: "paymentMethods",
          label: "Payment Methods",
          trigger: "paymentMethods",
        },
        {
          value: "customizationOptions",
          label: "Customization Options",
          trigger: "customizationOptions",
        },
      ],
    },
    {
      id: "orderStatus",
      message:
        "You can check your order status by logging into your account and navigating to 'My Orders'.",
      trigger: "moreHelp",
    },
    {
      id: "shippingInfo",
      message:
        "We offer fast shipping within 3-5 business days.",
      trigger: "moreHelp",
    },
    {
      id: "contactSupport",
      message:
        `Please contact our support team at ${settings?.contact_email} for assistance.`,
      trigger: "moreHelp",
    },
    {
      id: "productInfo",
      message:
        "We offer a variety of printing products including business cards, brochures, flyers, and more.",
      trigger: "moreHelp",
    },
    {
      id: "paymentMethods",
      message:
        "We accept various payment methods including credit cards, PayPal, and bank transfers.",
      trigger: "moreHelp",
    },
    {
      id: "customizationOptions",
      message:
        "We offer a range of customization options for our products including different sizes, finishes, and designs.",
      trigger: "moreHelp",
    },

    {
      id: "moreHelp",
      message: "Do you need more help?",
      trigger: "helpOptions",
    },
    {
      id: "helpOptions",
      options: [
        { value: "yes", label: "Yes", trigger: "options" },
        { value: "no", label: "No", trigger: "endMessage" },
      ],
    },
    {
      id: "endMessage",
      message: "Thank you for using our service! Have a great day!",
      end: true,
    },
  ];

  const config = {
    width: "300px",
    height: "400px",
    headerTitle: `${settings?.website_name} | Chatbot`,
    recognitionEnable: true,
    recognitionLang: "en",
    className: "custom-chatbot",
  };

  return (
    <div className="chatbot-container">
      <div style={{ display: showChat ? "none" : "" }}>
        <ChatBot steps={steps} {...config} />
      </div>
    </div>
  );
}

export default ChatbotComponent;
