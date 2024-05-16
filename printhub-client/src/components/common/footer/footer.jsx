import { FloatButton, Row, Col } from "antd";
import "./footer.css";

export default function AppFooter() {
  return (
    <div className="container-fluid">
      <div className="footer ">
        <Row>
          <Col span={12}>
            <div className="logoSocials">
                <div className="logo">
                <strong>
                  <span>PrintHub</span>-Pro
                </strong>
                </div>
              <ul className="socials">
                <li>
                  <a href="https://www.pinterest.com">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col span={12}>
            <div className="menu">
              <h5>Site Map</h5>
              <div className="sitemap">
              <ul  >
                <li>
                  <a href="about.html">About us</a>
                </li>

                <li>
                  <a href="#">Our Products</a>
                </li>

                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
              </div>
            </div>
          </Col>
        </Row>
        <div className="copyright">
          Copyright &copy; 2024 PrintHub-Pro{" "}
        </div>
        <FloatButton.BackTop />
      </div>
    </div>
  );
}
