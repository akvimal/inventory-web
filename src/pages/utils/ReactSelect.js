import React from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";

const animatedComponents = makeAnimated();

export default function ReactSelect({
  customStyles,
  value,
  defaultValue,
  options,
  onChange,
  defaultInputValue,
  placeholder,
  Multi
}) {
  return (
    <Select
      styles={customStyles}
      components={animatedComponents}
      value={value}
      defaultValue={defaultValue}
      isSearchable
      isMulti={Multi}
      options={options}
      onChange={onChange}
      defaultInputValue={defaultInputValue}
      placeholder={placeholder}
    />
  );
}
