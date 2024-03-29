import React from 'react';
//import  { ReactComponent as Logo } from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import AppLoaderProvider from './app/Providers/AppLoaderProvider/index';
import { LoginLayout } from './app/Layouts/LoginLayout';
import { ROUTES } from './constants/Routes';
import { MainLayout } from './app/Layouts/MainLayout';
import PrivateRoute from './app/shared/Protected';
import NoMatch from './app/public/404';
import { authenticationService } from './app/services';
import "./sass/App.scss";
import { LoggerService } from './app/helpers/logger-service';
import AppLoader from './app/utilities/Loader';


class App extends React.Component{
  public_routes = ROUTES.PUBLIC
  protected_routes = ROUTES.PROTECTED
  default_route_if_not_logged_in = ROUTES.DEFAULT_IF_NOT_LOGGED_IN;
  default_route_if_logged_in = ROUTES.DEFAULT_IF_LOGGED_IN;

  constructor(props){
    super(props);
    LoggerService.log("App Component:: Constructor");
    this.state = {
      isLoggedIn: false,
      displayLoader: false
    }
    //LoggerService.log(props);
    
  }

  componentDidMount(){
    /* let user = JSON.parse(localStorage.getItem('currentUser'))
    if(user){
      authenticationService.isLoggedIn = true
        this.setState({
          isLoggedIn: true
        });
    }else{
      localStorage.clear();
      authenticationService.isLoggedIn = false
    } */
  }

  componentWillMount() {
    authenticationService.currentUser.subscribe( user => {
      if(user){
        authenticationService.isLoggedIn = true
        this.setState({
          isLoggedIn: true
        });
      }else{
        localStorage.clear();
        authenticationService.isLoggedIn = false
        this.setState({
          isLoggedIn: false
        });
      }
    })
  }

   
  render(){
    //LoggerService.log("App Component:: Render");
    return ( 
        <>
         {/*  <div className="stars"></div>
          <div className="twinkling"></div>
          <div className="clouds"></div> */}
          <AppLoaderProvider>
            <div className="App"> 
                  <Router>
                    <Switch>
                    
                      <Route 
                          path={this.public_routes } 
                          render={ () => <LoginLayout isLoggedIn={this.state.isLoggedIn} />} />
                      <PrivateRoute path={this.protected_routes} 
                          isLoggedIn={this.state.isLoggedIn} 
                          component={MainLayout} />
                      <Route exact path="/"
                      render={ 
                          props => this.state.isLoggedIn ? (
                            <Redirect
                              to={{
                                pathname: this.default_route_if_logged_in,
                                state: { from: this.props.location }
                              }}
                            />
                          ) : (
                            <Redirect
                              to={{
                                pathname: this.default_route_if_not_logged_in,
                                state: { from: this.props.location }
                              }}
                            />
                          )
                        } />
                      <Route exact component={NoMatch} /> 
                    </Switch>
                  </Router>
                 <AppLoader />
              </div>
          </AppLoaderProvider>
            
        </>
    );
  }

}


export default App ;
