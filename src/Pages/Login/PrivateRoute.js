
import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../Shared/Spinner";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <Spinner />
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email || user.displayName ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
