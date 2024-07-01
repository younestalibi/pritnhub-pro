import { Carousel, Flex, Typography } from "antd";
import image1 from "../../../assets/images/avatar.png";
import { Fade } from "react-awesome-reveal";

const items = [
  {
    key: "1",
    name: "Emily White",
    position: "Marketing Director, Creative Ventures",
    description:
      "We've been partnering with PrintHub for all our printing needs, and their service is outstanding. From high-quality business cards to stunning large-format banners, they consistently deliver excellence and meet our tight deadlines.",
  },
  {
    key: "2",
    name: "Alex Turner",
    position: "Owner, Design Hub",
    description:
      "PrintHub is our go-to printing partner. Their attention to detail and exceptional customer service make them stand out. Whether it's brochures, flyers, or custom prints, PrintHub always exceeds our expectations.",
  },
  {
    key: "3",
    name: "Sarah Brown",
    position: "Creative Lead, BrandMasters Inc.",
    description:
      "BrandMasters Inc. relies on PrintHub for all our printing projects. Their ability to handle intricate designs with precision and their unwavering commitment to quality make them an invaluable partner. We highly recommend their services.",
  },
];

export default function AppTestimonial() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0px" }}>
      <Fade triggerOnce direction="up">
        <Flex
          justify="center"
          align="center"
          vertical={true}
          style={{ padding: "10px 40px" }}
        >
          <Typography.Title level={2}>Testimonials</Typography.Title>
        </Flex>
      </Fade>

      <Carousel
        autoplay
        dots
        infinite
        pauseOnDotsHover={false}
        pauseOnFocus={false}
        effect="fade"
      >
        {items.map((item) => (
          <div key={item.key}>
            <div
              style={{
                background: "#f5f5f5",
                width: "fit-content",
                margin: "auto",
                padding: "30px",
                textAlign: "center",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={image1}
                alt={item.name}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                }}
              />
              <Typography.Title level={4} style={{ marginBottom: "0" }}>
                {item.name}
              </Typography.Title>
              <Typography.Text style={{ fontSize: "14px", color: "#ccc" }}>
                {item.position}
              </Typography.Text>
              <Typography.Paragraph
                style={{
                  marginTop: "20px",
                  lineHeight: "1.6",
                  position: "relative",
                }}
                strong
                italic
              >
                <i
                  className="fa-solid fa-quote-left"
                  style={{
                    position: "absolute",
                    left: "5px",
                    top: "-24px",
                    fontSize: "24px",
                    color: "black",
                  }}
                ></i>
                {item.description}
                <i
                  className="fa-solid fa-quote-right"
                  style={{
                    position: "absolute",
                    right: "5px",
                    bottom: "-24px",
                    fontSize: "24px",
                    color: "black",
                  }}
                ></i>
              </Typography.Paragraph>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
