import React from "react";

const Select = ({
  name,
  selectedItem,
  items,
  label,
  errors,
  valueProperty,
  textProperty,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={selectedItem}
        {...rest}
        className="custom-select"
      >
        {items.map(item => (
          <option key={item[valueProperty]} value={item[valueProperty]}>
            {item[textProperty]}
          </option>
        ))}
      </select>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

Select.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Select;
