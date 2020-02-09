import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import auth from "./services/authService";
import NavBar from "./components/navbar";
import Film from "./components/film";
import FilmForm from "./components/filmForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import NotFound from "./components/notFound";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = { user: "" };

  componentDidMount() {
    const user = auth.loggedUser;
    this.setState({ user });
    if (user)
      toast(`Welcome to Vidly ${user.name}`, { position: "bottom-center" });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <ToastContainer></ToastContainer>
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/movies/:id" component={FilmForm}></Route>
            <Route
              path="/movies"
              render={props => <Film {...props} user={this.state.user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
