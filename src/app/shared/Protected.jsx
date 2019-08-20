import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
//import { authenticationService } from '../services';
import { ROUTES } from '../../constants/Routes';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const public_default = ROUTES.DEFAULT_IF_NOT_LOGGED_IN

    // Add your own authentication on the below line.
    //const isLoggedIn = rest.isLoggedIn//AuthService.isLoggedIn()
    const isLoggedIn = true //AuthService.isLoggedIn()

  
    return (
        <Route
        {...rest}
        render={props =>
            isLoggedIn ? (
            <Component {...props} /> 
          ) : (
            <Redirect
              to={{
                pathname: public_default,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )
  }

export default PrivateRoute 