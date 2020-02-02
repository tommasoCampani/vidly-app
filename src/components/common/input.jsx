import React from "react";

const Input = ({ name, label, errors, ...rest }) => {
  return (
    <div className="form-group">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input {...rest} name={name} id={name} className="form-control" />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

Input.defaultProps = {
  autoFocus: false,
  hidden: false,
  placeholder: ""
};

export default Input;
