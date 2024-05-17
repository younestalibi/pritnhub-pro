import { Select, Tooltip } from "antd";
import React from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const SelectInput = ({ label, name, value, choices, setFormValues,tooltip }) => {
  const handleChange = (e) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: e }));
  };
  const options = [];
  for (let i = 0; i < choices.length; i++) {
    options.push({
      label: choices[i].value,
      value: choices[i].value,
    });
  }

  return (
    <div style={{ margin: "20px 0px" }}>
      <label className="custom-input-label">
      <b>{label}</b>
        <Tooltip placement="top" title={tooltip}>
          <FaCircleQuestion />
        </Tooltip>
      </label>
      <Select
        mode="multiple"
        maxCount={1}
        allowClear
        style={{
          width: "100%",
        }}
        placeholder="Please select"
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default SelectInput;
