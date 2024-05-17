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
    setFormValues((prevValues) => ({ ...prevValues, [name]: e }));
  };

  return (
    <div style={{ margin: "20px 0px" }}>
      <label className="custom-input-label">
        <b>{label}</b>
        <Tooltip placement="top" title={tooltip}>
          <FaCircleQuestion />
        </Tooltip>
      </label>
      {choices.map((choice, index) => (
        <>
          <Checkbox.Group onChange={handleChange}>
            <Checkbox
              key={index}
              id={`${name}-${choice.value}`}
              name={name}
              value={choice.value}
              checked={value.includes(choice.value)}
            >
              {choice.value}
            </Checkbox>
          </Checkbox.Group>
        </>
      ))}
    </div>
  );
};

export default CheckBoxInput;
