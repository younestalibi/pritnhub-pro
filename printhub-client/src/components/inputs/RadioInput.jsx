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
  error,
}) => {
  const handleChange = (e) => {
    setFormValues(name, e.target.value);
    // setFormValues((prevValues) => ({ ...prevValues, [name]: e.target.value }));
  };

  return (
    <div style={{ margin: "20px 0px" }}>
      <label className="custom-input-label">
        <b>{label}</b>
        {tooltip && (
          <Tooltip placement="top" title={tooltip}>
            <FaCircleQuestion />
          </Tooltip>
        )}
      </label>
      <Radio.Group value={value} buttonStyle="solid">
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
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default RadioInput;
