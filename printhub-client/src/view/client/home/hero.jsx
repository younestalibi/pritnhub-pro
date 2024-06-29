import { Carousel, Button, Row, Col, Flex } from "antd";
import { Link } from "react-router-dom";
// import SimpleChatbotComponent from "../../../ChatBot";
import ChatbotComponent from "../../../components/ChatBot/ChatBot";

export default function AppHero() {
  return (
    <div className="hero-container">
      <h1>Enhance Your Brand with Our Digital Printing Services</h1>
      <p>
        Discover our top-tier digital printing services designed to elevate your
        brand. We specialize in delivering high-quality print materials that
        stand out and make an impact.
      </p>
      <div>
        <button className="home-btn">Get Started</button>
        <button className="home-btn btn-white">Learn More?</button>
      </div>
    </div>
  );
}
