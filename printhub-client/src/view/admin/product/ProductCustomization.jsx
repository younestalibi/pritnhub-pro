import React, { useEffect, useState } from "react";
import { Button, Input, Popover, Select, Tag } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

function ProductCustomization({ onSave, options }) {
  // const validationSchema = Yup.object({
  //   type: Yup.string().required("Type is required"),
  //   name: Yup.string().required("Name is required"),
  //   label: Yup.string().required("Label is required"),
  //   choiceText: Yup.string().when('type', {
  //     is: (type) => ['select', 'radio', 'checkbox'].includes(type),
  //     then: Yup.string().required("Choice value is required")
  //   }),
  //   choicePrice: Yup.number().when('type', {
  //     is: (type) => ['select', 'radio', 'checkbox'].includes(type),
  //     then: Yup.number().required("Price adjustment is required").min(0, "Price must be at least 0")
  //   }),
  // });
  //  const formik = useFormik({
  //     initialValues: {
  //       type: "",
  //       name: "",
  //       label: "",
  //       choiceText: "",
  //       choicePrice: "",
  //     },
  //     validationSchema,
  //     onSubmit: (values, { resetForm }) => {
  //       const { type, name, label } = values;
  //       if (type && name && label) {
  //         const newCustomizationOption = {
  //           type,
  //           name,
  //           label,
  //           choices: type === "text" || type === "number" ? [] : choices,
  //         };
  //         setCustomizationOptions((prevOptions) => [...prevOptions, newCustomizationOption]);
  //         setChoices([]);
  //         resetForm();
  //       }
  //     },
  //   });

  const [customizationOptions, setCustomizationOptions] = useState(
    options ? options : []
  );
  const [newOption, setNewOption] = useState({
    type: "",
    name: "",
    label: "",
    choices: [],
    choiceText: "",
    choicePrice: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOption((prevOption) => ({
      ...prevOption,
      [name]: value,
    }));
  };

  const handleTypeChange = (value) => {
    setNewOption((prevOption) => ({
      ...prevOption,
      type: value,
    }));
  };

  const addChoice = () => {
    const { choiceText, choicePrice } = newOption;
    if (choiceText && choicePrice) {
      const newChoice = {
        value: choiceText.trim(),
        priceAdjustment: parseFloat(choicePrice),
      };
      setNewOption((prevOption) => ({
        ...prevOption,
        choices: [...prevOption.choices, newChoice],
        choiceText: "",
        choicePrice: "",
      }));
    }
  };

  const addCustomizationOption = () => {
    const { type, name, label, choices } = newOption;
    if (type && name && label) {
      const newCustomizationOption = {
        type,
        name,
        label,
        choices: type === "text" || type === "number" ? [] : choices,
      };
      setCustomizationOptions((prevOptions) => [
        ...prevOptions,
        newCustomizationOption,
      ]);
      setNewOption({
        type: "",
        name: "",
        label: "",
        choices: [],
        choiceText: "",
        choicePrice: "",
      });
    }
  };

  useEffect(() => {
    onSave(customizationOptions);
  }, [customizationOptions]);

  useEffect(() => {
    if (options) {
      setCustomizationOptions(options);
    } else {
      setCustomizationOptions([]);
    }
  }, [options]);
console.log(customizationOptions)
  return (
    <>
      <div>
        <label htmlFor="type">Input Type:</label>
        <Select
          id="type"
          name="type"
          defaultValue=""
          value={newOption.type}
          onChange={handleTypeChange}
          style={{ display: "block" }}
          options={[
            { value: "", disabled: true, label: "Select Type" },
            { value: "text", label: "Text" },
            { value: "number", label: "Number" },
            { value: "select", label: "Select" },
            { value: "radio", label: "Radio" },
            { value: "checkbox", label: "Checkbox" },
          ]}
        />
        {newOption.type && (
          <div>
            <label htmlFor="name">Input Name:</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={newOption.name}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="label">Input Label:</label>
            <Input
              type="text"
              id="label"
              name="label"
              value={newOption.label}
              onChange={handleInputChange}
            />
            <br />
            {["select", "radio", "checkbox"].includes(newOption.type) && (
              <>
                <label htmlFor="choiceText">Choice Value:</label>
                <Input
                  type="text"
                  id="choiceText"
                  name="choiceText"
                  value={newOption.choiceText}
                  onChange={handleInputChange}
                />
                <br />
                <label htmlFor="choicePrice">Price Adjustment:</label>
                <Input
                  type="number"
                  id="choicePrice"
                  name="choicePrice"
                  value={newOption.choicePrice}
                  onChange={handleInputChange}
                />
                <Button
                  style={{ marginTop: "10px" }}
                  type="dashed"
                  onClick={addChoice}
                >
                  Add Choice
                </Button>
                <div>
                  {newOption.choices.map((choice, index) => (
                    <Tag
                      color="cyan-inverse"
                      style={{ marginTop: "10px" }}
                      key={index}
                      closable
                      onClose={() => {
                        setNewOption({
                          ...newOption,
                          choices: newOption.choices.filter(
                            (_, i) => i !== index
                          ),
                        });
                      }}
                    >
                      {choice.value} - ${choice.priceAdjustment}
                    </Tag>
                  ))}
                </div>
              </>
            )}

            <Button
              style={{ marginTop: "10px" }}
              type="dashed"
              onClick={addCustomizationOption}
            >
              Add Customization Option
            </Button>
          </div>
        )}
      </div>
      <div>
        {customizationOptions.map((option, index) => (
          <Popover
            key={index}
            content={
              <pre
                style={{
                  maxHeight: "200px",
                  overflowY:'auto'
                }}
              >
                {JSON.stringify(option, null, 2)}
              </pre>
            }
            title="Form Details"
            trigger="hover"
          >
            <Tag
              style={{ marginTop: "10px",cursor:'pointer' }}
              closable
              onClose={() => {
                setCustomizationOptions(
                  customizationOptions.filter((_, i) => i !== index)
                );
              }}
            >
              {option.label} ({option.type})
            </Tag>
          </Popover>
        ))}
      </div>
    </>
  );
}

export default ProductCustomization;
