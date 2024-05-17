import { Badge, Button, Col, Descriptions, Row, Tag, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import TextInput from "../../../components/inputs/TextInput";
import NumberInput from "../../../components/inputs/NumberInput";
import SelectInput from "../../../components/inputs/SelectInput";
import RadioInput from "../../../components/inputs/RadioInput";
import CheckBoxInput from "../../../components/inputs/CheckBoxInput";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
const { Title, Paragraph } = Typography;
const ProductDetail = () => {
  const [expanded, setExpanded] = useState(false);

  const product = {
    catalog_id: "353",
    createdAt: "2024-05-16T10:49:12.378Z",
    description: "High-quality business cards to leave a lasting impression.",
    id: 82,
    images: [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
      },
      {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
      },
      {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
      },
      {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
      },
    ],
    name: "Premium Business Cards",
    options: [
      {
        type: "text",
        name: "name",
        label: "Name",
        placeholder: "Enter your name",
        tooltip: "Your full name as it will appear on the business card",
        priceAdjustment: 0,
      },
      {
        type: "text",
        name: "company",
        label: "Company Name",
        placeholder: "Enter your company name",
        tooltip: "Your company name as it will appear on the business card",
        priceAdjustment: 0,
      },
      {
        type: "select",
        name: "paper_type",
        label: "Paper Type",
        choices: [
          { value: "Matte", priceAdjustment: 0 },
          { value: "Glossy", priceAdjustment: 10 },
          { value: "Textured", priceAdjustment: 20 },
          { value: "Recycled", priceAdjustment: 5 },
        ],
        defaultValue: "Matte",
        tooltip: "Choose the type of paper for your business cards",
      },
      {
        type: "radio",
        name: "size",
        label: "Size",
        choices: [
          { value: "3.5 x 2 inches", priceAdjustment: 0 },
          { value: "2.5 x 2.5 inches", priceAdjustment: 5 },
          { value: "2.125 x 3.375 inches", priceAdjustment: 10 },
          { value: "3.5 x 4 inches", priceAdjustment: 15 },
          { value: "3.5 x 5.5 inches", priceAdjustment: 20 },
          { value: "3.125 x 4.375 inches", priceAdjustment: 25 },
        ],
        defaultValue: "3.5 x 2 inches",
        tooltip: "Select the size of your business cards",
      },
      {
        type: "radio",
        name: "corner_style",
        label: "Corner Style",
        choices: [
          { value: "Square", priceAdjustment: 0 },
          { value: "Rounded", priceAdjustment: 10 },
        ],
        defaultValue: "Square",
        tooltip: "Select the corner style for your business cards",
      },
      {
        type: "checkbox",
        name: "additional_features",
        label: "Additional Features",
        choices: [
          { value: "Foil Stamping", priceAdjustment: 30 },
          { value: "Embossing", priceAdjustment: 25 },
          { value: "Spot UV", priceAdjustment: 20 },
          { value: "Custom Shapes", priceAdjustment: 50 },
        ],
        defaultValue: [],
        tooltip: "Choose any additional features for your business cards",
      },
    ],
    basePrice: 20,
    quantity: {
      min: 100,
      max: 1000,
      step: 100,
      tooltip: "Select the number of business cards you want to print",
    },
    updatedAt: "2024-05-16T10:49:12.378Z",
  };

  const [formValues, setFormValues] = useState({});

  const calculateTotalPrice = (formValues) => {
    console.log(formValues);
    let totalPrice = product.basePrice;
    if (!formValues["quantity"]) {
      totalPrice = "------------";
    } else {
      totalPrice *= formValues["quantity"];
      product.options.forEach((option) => {
        const value = formValues[option.name];

        if (option.type === "number") {
          const number = value;
          totalPrice *= number;
        } else if (option.type === "select" || option.type === "radio") {
          const choice = option.choices.find(
            (choice) => choice.value === value
          );
          if (choice) {
            totalPrice += choice.priceAdjustment;
          }
        } else if (option.type === "checkbox") {
          const selectedChoices = value || [];
          selectedChoices.forEach((selectedChoice) => {
            const choice = option.choices.find(
              (choice) => choice.value === selectedChoice
            );
            if (choice) {
              totalPrice += choice.priceAdjustment;
            }
          });
        }
      });
    }

    return totalPrice;
  };

  const customization = [];
  for (let i = 0; i <= product.options.length; i++) {
    if (i == product.options.length) {
      customization.push({
        key: i + 1,
        label: <b style={{ color: "red" }}>Total Price</b>,
        children: (
          <Tag bordered={false} color="magenta">
            <b>{calculateTotalPrice(formValues)}</b>
          </Tag>
        ),
      });
    } else {
      customization.push({
        key: i + 1,
        label: product.options[i].name,
        children:
          formValues[product.options[i].name] == null
            ? "------------"
            : typeof formValues[product.options[i].name] == "object"
            ? formValues[product.options[i].name].join(", ")
            : formValues[product.options[i].name],
      });
    }
  }
  const quantities = [];
  for (
    let i = product.quantity.min;
    i <= product.quantity.max;
    i += product.quantity.step
  ) {
    quantities.push({ value: i });
  }
  return (
    <Row
      justify={"space-evenly"}
      align={"stretch"}
      style={{ marginTop: "40px" }}
    >
      <Col md={{ span: 10 }} sm={{ span: 20 }}>
        <BreadCrumb titles={["home", "categories", "products", product.name]} />
        <div style={{ position: "sticky", top: "-175px" }}>
          <ImageGallery
            showNav={true}
            showPlayButton={false}
            lazyLoad={true}
            showIndex={true}
            thumbnailPosition="left"
            items={product.images}
          />
          <Descriptions
            style={{ marginTop: "10px" }}
            title="Customization info"
            size="small"
            column={1}
            colon={false}
            bordered
            items={customization}
          />
        </div>
      </Col>
      <Col md={{ span: 10 }} sm={{ span: 20 }}>
        <div>
          <Title level={3}>{product.name}</Title>
          <Paragraph
            ellipsis={{
              rows: 3,
              expandable: "collapsible",
              expanded: expanded,
              onExpand: (_, info) => {
                setExpanded(info.expanded);
              },
            }}
          >
            {product.description}
          </Paragraph>

          <form>
            <RadioInput
              tooltip={product.quantity.tooltip}
              setFormValues={setFormValues}
              label={"Quantity"}
              name={"quantity"}
              value={formValues["quantity"] || ""}
              choices={quantities}
            />

            {product.options.map((option, index) => {
              switch (option.type) {
                case "text":
                  return (
                    <TextInput
                      tooltip={option.tooltip}
                      setFormValues={setFormValues}
                      key={index}
                      label={option.label}
                      name={option.name}
                      value={formValues[option.name] || ""}
                    />
                  );
                case "number":
                  return (
                    <NumberInput
                      tooltip={option.tooltip}
                      setFormValues={setFormValues}
                      key={index}
                      label={option.label}
                      name={option.name}
                      value={formValues[option.name] || ""}
                    />
                  );
                case "select":
                  return (
                    <SelectInput
                      tooltip={option.tooltip}
                      setFormValues={setFormValues}
                      key={index}
                      label={option.label}
                      name={option.name}
                      choices={option.choices}
                      value={formValues[option.name] || ""}
                    />
                  );
                case "radio":
                  return (
                    <RadioInput
                      tooltip={option.tooltip}
                      setFormValues={setFormValues}
                      key={index}
                      label={option.label}
                      name={option.name}
                      choices={option.choices}
                      value={formValues[option.name] || ""}
                    />
                  );
                case "checkbox":
                  return (
                    <CheckBoxInput
                      tooltip={option.tooltip}
                      setFormValues={setFormValues}
                      key={index}
                      label={option.label}
                      name={option.name}
                      choices={option.choices}
                      value={formValues[option.name] || []}
                    />
                  );
                default:
                  return null;
              }
            })}
          </form>
          <Button
            type="primary"
            style={{
              backgroundColor: "#c43b53",
              padding: "19px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            // loading={true}
            block={true}
          >
            Add To Cart
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetail;
