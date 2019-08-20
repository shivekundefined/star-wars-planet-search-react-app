import React from 'react';
//import  { ReactComponent as Logo } from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Redirect, Switch, StaticRouter} from 'react-router-dom';
import { LoginLayout } from './app/Layouts/Login/LoginLayout';
import { ROUTES } from './constants/Routes';
import { MainLayout } from './app/Layouts/Main/MainLayout';
import PrivateRoute from './app/shared/Protected';
import NoMatch from './app/public/404/404';
import { authenticationService } from './app/services';
import "./sass/App.scss";

class App extends React.Component{
  public_routes = ROUTES.PUBLIC
  protected_routes = ROUTES.PROTECTED
  public_default = ROUTES.DEFAULT_IF_NOT_LOGGED_IN;

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    if(user){
      authenticationService.isLoggedIn = true
        this.setState({
          isLoggedIn: true
        });
    }else{
      localStorage.clear();
      authenticationService.isLoggedIn = false
    }
    /* authenticationService.currentUser.subscribe( user => {
      if(user){
        authenticationService.isLoggedIn = true
        this.setState({
          isLoggedIn: true
        });
      }else{
        localStorage.clear();
        authenticationService.isLoggedIn = false
      }
    }) */
  }

   
  render(){
    return ( 
        <>
         {/*  <div className="stars"></div>
          <div className="twinkling"></div>
          <div className="clouds"></div> */}
          <div className="App"> 
            <Router>
              <Switch>
                <Route 
                    path={this.public_routes } 
                    render={ () => <LoginLayout isLoggedIn={this.state.isLoggedIn} />} />
                <PrivateRoute path={this.protected_routes} 
                    isLoggedIn={this.state.isLoggedIn} 
                    component={MainLayout} />
                <Route component={NoMatch} />
              </Switch>
            </Router>
          </div>
        </>
    );
  }

}


export default App;
