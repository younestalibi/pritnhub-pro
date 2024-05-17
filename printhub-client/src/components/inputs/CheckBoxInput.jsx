import { Checkbox, Tooltip } from "antd";
import React from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const CheckBoxInput = ({
  label,
  name,
  value,
  choices,
  setFormValues,
  tooltip,
}) => {
  const handleChange = (e) => {
    const { value: checkboxValue, checked } = e.target;

    setFormValues((prevValues) => {
      const currentValues = prevValues[name] || [];

      if (checked) {
        // Add the checkbox value if it is checked
        return {
          ...prevValues,
          [name]: [...currentValues, checkboxValue],
        };
      } else {
        // Remove the checkbox value if it is unchecked
        return {
          ...prevValues,
          [name]: currentValues.filter((val) => val !== checkboxValue),
        };
      }
    });
  };

  return (
    <div style={{ margin: "20px 0px" }}>
      <label className="custom-input-label">
        <b>{label}</b>
        <Tooltip placement="top" title={tooltip}>
          <FaCircleQuestion />
        </Tooltip>
      </label>
      <Checkbox.Group>
        {choices.map((choice, index) => (
          <Checkbox
            key={index}
            id={`${name}-${choice.value}`}
            name={name}
            value={choice.value}
            checked={value.includes(choice.value)}
            onChange={handleChange}
          >
            {choice.value}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
};

export default CheckBoxInput;
