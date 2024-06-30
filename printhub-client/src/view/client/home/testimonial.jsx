import { Carousel, Flex, Typography } from "antd";
import image1 from "../../../assets/images/avatar.png";
import { Fade } from "react-awesome-reveal";

const items = [
  {
    key: "1",
    name: "John Doe",
    position: "Marketing Manager, ABC Printers",
    description:
      "We've been using ABC Printers for years now, and their service has always been exceptional. From business cards to large banners, they deliver top-notch quality and always meet our deadlines.",
  },
  {
    key: "2",
    name: "Jane Smith",
    position: "Owner, XYZ Designs",
    description:
      "Working with XYZ Designs, we need reliable printing partners. ABC Printers has been our go-to for all our printing needs. Their attention to detail and customer service are second to none.",
  },
  {
    key: "3",
    name: "Michael Johnson",
    position: "Creative Director, Print Solutions Inc.",
    description:
      "Print Solutions Inc. has trusted ABC Printers with our projects for years. Their ability to handle complex printing jobs with precision and their commitment to quality make them a valuable partner.",
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
