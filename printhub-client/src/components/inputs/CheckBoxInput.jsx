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
  error
}) => {


  const pushToVariable = (variable, newValue) => {
    
    variable.push(newValue);
    return variable;
  };
  const handleChange = (e) => {
    const { value: checkboxValue, checked } = e.target;
    if (!Array.isArray(value)) {
      value = [];
    }
    if(checked){
      setFormValues(name,[...value,checkboxValue])
    }else{
      setFormValues(name,value.filter((val) => val !== checkboxValue))
    }
    // setFormValues((prevValues) => {
    //   const currentValues = prevValues[name] || [];
    //   console.log(currentValues)
    //   if (checked) {
    //     // Add the checkbox value if it is checked
    //     return {
    //       ...prevValues,
    //       [name]: [...currentValues, checkboxValue],
    //     };

    //   } else {
    //     // Remove the checkbox value if it is unchecked
    //     return {
    //       ...prevValues,
    //       [name]: currentValues.filter((val) => val !== checkboxValue),
    //     };
    //   }
    // });
  };

  return (
    <div style={{ margin: "20px 0px" }}>
      <label className="custom-input-label">
        <b>{label}</b>
        <Tooltip placement="top" title={tooltip}>
          <FaCircleQuestion />
        </Tooltip>
      </label>
      <Checkbox.Group value={value}>
        {choices.map((choice, index) => (
          <Checkbox
            key={index}
            id={`${name}-${choice.value}`}
            name={name}
            value={choice.value}
            onChange={handleChange}
          >
            {choice.value}
          </Checkbox>
        ))}
      </Checkbox.Group>
      {error && <div style={{ color: "red" }}>{error}</div>}

    </div>
  );
};

export default CheckBoxInput;
