import { InputNumber, Tooltip } from "antd";
import React from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const NumberInput = ({ label, name, value, setFormValues, tooltip, error }) => {
  const handleChange = (e) => {
    setFormValues(name, e);
    // setFormValues((prevValues) => ({ ...prevValues, [name]: e }));
  };
  console.log(error)

  return (
    <div style={{ margin: "20px 0px" }}>
      <label className="custom-input-label">
        <b>{label}</b>
        <Tooltip placement="top" title={tooltip}>
          <FaCircleQuestion />
        </Tooltip>
      </label>
      <InputNumber
        min={0}
        name={name}
        inputMode="numeric"
        value={value}
        style={{
          // width: "100%",
          display: "block",
        }}
        onChange={handleChange}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default NumberInput;
