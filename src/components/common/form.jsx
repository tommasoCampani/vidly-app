import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { data } = this.state;
    const options = { abortEarly: false };

    //Validation
    /* TEST var result = Joi.validate(data, this.schema, options);
    console.log(result);*/
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;

    const errors = error.details.map(detail => {
      const errors = {};
      errors[detail.path[0]] = detail.message;
      return errors;
    });

    return errors;
  };

  validateProperty = ({ name, value }) => {
    //Standard validation
    /*if (name === "nickname") {
      if (value.trim() === "") return "Il nickname è obbligatorio";
    }*/

    //Validation with joi
    const data = { [name]: value }; //create a local object with only the validable property
    const schema = { [name]: this.schema[name] }; //create a local schema with only the validable property
    var { error } = Joi.validate(data, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit2 = e => {
    e.preventDefault();

    //Validation
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //if no validation error -> do Submit
    //this.doSubmit();
  };

  handleSubmit(e) {
    e.preventDefault();

    //Validation
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
  }

  handleOnChange = ({ currentTarget: input }) => {
    const { data: statedata, errors: stateErrors } = this.state;
    const data = { ...statedata };
    data[input.name] = input.value;

    //validation
    const errors = { ...stateErrors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ data, errors });
  };

  renderSubmitButton = label => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  };

  renderInput = (
    name,
    label,
    autoFocus = false,
    type = "text",
    hidden = false,
    placeholder = ""
  ) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        type={type}
        onChange={this.handleOnChange}
        autoFocus={autoFocus}
        errors={errors[name]}
        hidden={hidden}
        placeholder={placeholder}
      ></Input>
    );
  };

  //Props: name, label,title,items,textProperty,valueProperty,selectedItem,errors,onChange

  renderSelect = (name, label, items) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        items={items}
        selectedItem={data[name]}
        onChange={this.handleOnChange}
        errors={errors[name]}
      ></Select>
    );
  };
}

export default Form;
