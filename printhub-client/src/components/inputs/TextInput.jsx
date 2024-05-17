import { Button, Input, Tooltip } from "antd";
import React from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const TextInput = ({ label, name, value, setFormValues,tooltip }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
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
      <Input
        inputMode="text"
        name={name}
        style={{
          width: "auto",
          display: "block",
        }}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
