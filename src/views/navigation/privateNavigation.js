import React from "react";
import { Redirect, Route } from "react-router";
import auth from "../../utils/auth";

function PrivateNavigation ({component: Component, ...rest}) {
  const isLogin = !!auth.firstName();

  return (
  
    <Route
      {...rest}
      render={props => {
        return isLogin ? <Component {...props} /> : <Redirect to="/" />
      }}
    ></Route>
  )
}

export default PrivateNavigation;
