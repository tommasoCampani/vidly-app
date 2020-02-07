import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { nickname: "", password: "" },
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
      .required()
      .error(() => {
        return { message: "Il nickname è obbligatorio!" };
      }),
    password: Joi.string()
      .required()
      .error(() => {
        return { message: "La password è obbligatoria!" };
      })
  };

  async handleSubmit(e) {
    super.handleSubmit(e);
    //if no validation error -> do Submit
    try {
      const { nickname, password } = this.state.data;
      await auth.login(nickname, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.nickname = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("nickname", "Nickname", true, "text")}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderSubmitButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
