import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({
  component: Component,
  render: customRender,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.loggedUser)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : customRender(props);
      }}
    />
  );
};

export default ProtectedRoute;
