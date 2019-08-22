import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
//import { authenticationService } from '../services';
import { ROUTES } from '../../constants/Routes';
import { LoggerService } from '../helpers/logger-service';

const PrivateRoute = ({ component: Component, ...rest }) => {
    LoggerService.log("PrivateRoute Component:: initialize");
    const default_route_if_not_logged_in = ROUTES.DEFAULT_IF_NOT_LOGGED_IN

    // Add your own authentication on the below line.
    const isLoggedIn = rest.isLoggedIn//AuthService.isLoggedIn()
    //const isLoggedIn = true //AuthService.isLoggedIn()

    LoggerService.log(isLoggedIn)
    //LoggerService.log(Component)
    LoggerService.log(rest)
  
    return (
        <Route
        {...rest}
        render={props =>
            isLoggedIn ? (
            <Component {...props} /> 
          ) : (
            <Redirect
              to={{
                pathname: default_route_if_not_logged_in,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )
  }

export default PrivateRoute 