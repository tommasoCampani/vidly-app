import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { nickname: "", password: "", name: "" },
    errors: {}
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //REF: Access to a dom element in React
  // define a ref in class -> nickname = React.createRef();
  // reference a dom element:  <input type="text" ref={this.nickname} />
  // get value on a method: const username = this.nickname.current.value;

  schema = {
    nickname: Joi.string()
      .email()
      .required()
      .label("Nickname"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{5,30}$/)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  handleSubmit(e) {
    super.handleSubmit(e);
    //if no validation error -> do Submit
    console.log("Submitted!");
    this.props.history.replace("/");
  }

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("nickname", "Nickname", true)}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderInput("name", "Name")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
