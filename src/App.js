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
import ProtectedRoute from "./components/common/protectedRoute";
import Footer from "./components/footer";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    if (auth.loggedUser)
      toast(`Welcome to Vidly ${auth.loggedUser.name}`, {
        position: "bottom-center"
      });
    this.setState({ user: auth.loggedUser });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={auth.loggedUser} />
        <ToastContainer></ToastContainer>
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <ProtectedRoute path="/movies/:id" component={FilmForm} />} />
            <Route
              path="/movies"
              render={props => <Film {...props} user={user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
        <Footer year={new Date().getFullYear()}></Footer>
      </React.Fragment>
    );
  }
}

export default App;
