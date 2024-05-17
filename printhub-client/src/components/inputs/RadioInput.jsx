import { Card, Flex, Radio, Tooltip } from "antd";
import React from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const RadioInput = ({
  label,
  name,
  value,
  choices,
  setFormValues,
  tooltip,
}) => {
  const handleChange = (e) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: e.target.value }));
  };

  return (
    <div style={{ margin: "20px 0px" }}>
      <label className="custom-input-label">
        <b>{label}</b>
        <Tooltip placement="top" title={tooltip}>
          <FaCircleQuestion />
        </Tooltip>
      </label>
      <Radio.Group buttonStyle="solid">
        {choices.map((choice, index) => (
          <>
            <Radio.Button
              style={{
                borderRadius: "2px",
                margin: "2px",
                
              }}
              id={`${name}-${choice.value}`}
              name={name}
              key={index}
              value={choice.value}
              checked={value === choice.value}
              onChange={handleChange}
            >
              {choice.value}
            </Radio.Button>
          </>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioInput;
