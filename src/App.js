import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import Film from "./components/film";
import FilmForm from "./components/filmForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NotFound from "./components/notFound";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <ToastContainer></ToastContainer>
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/movies/:id" component={FilmForm}></Route>
          <Route path="/movies" component={Film}></Route>
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

export default App;
