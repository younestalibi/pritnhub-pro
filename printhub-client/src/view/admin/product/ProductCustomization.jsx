import React, { useEffect, useState } from "react";
import { Button, Input, Popover, Select, Tag } from "antd";

function ProductCustomization({ onSave, options }) {
  const [customizationOptions, setCustomizationOptions] = useState(options?options:[]);
  
  const [newOption, setNewOption] = useState({
    type: "",
    name: "",
    label: "",
    choices: [],
    choiceText: "",
  });

  const handleInputChange = (e) => {
    let name, value;
    if (typeof e === "object") {
      name = e.target.name;
      value = e.target.value;
    } else if (typeof e === "string") {
      name = "type";
      value = e;
    }
    setNewOption((prevOption) => ({
      ...prevOption,
      [name]: value,
    }));
  };

  const addCustomizationOption = () => {
    const { type, name, label, choiceText } = newOption;
    if (type && name && label) {
      const choices = choiceText.split(",").map((choice) => choice.trim());
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
      });
    }
  };

  useEffect(() => {
    onSave(customizationOptions);
  }, [customizationOptions]);
  useEffect(() => {
    if (options) {
      setCustomizationOptions(options);
    }
  }, [options]);

  return (
    <>
      <div>
        <label htmlFor="type">Input Type:</label>
        <Select
          id="type"
          name="type"
          defaultValue=""
          value={newOption.type}
          onChange={handleInputChange}
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
                <label htmlFor="choiceText">Choices (comma-separated):</label>
                <Input
                  type="text"
                  id="choiceText"
                  name="choiceText"
                  value={newOption.choiceText}
                  onChange={handleInputChange}
                />
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
              <>
                <pre>{JSON.stringify(option, null, 2)}</pre>
              </>
            }
            title="Form Details"
            trigger="hover"
          >
            <Tag
              style={{ marginTop: "10px" }}
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
