

import React from 'react';
import Header from '../../LayoutComponents/Header/Header';
import Footer from '../../LayoutComponents/Footer/Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import PlanetSearch from '../../Protected/Search/PlanetSearch';
import { PlanetDetails } from '../../Protected/planet-details/PlanetDetails';
//import starWarsLogo from './assets/images/star-wars-logo.png'
import NoMatch from '../../public/404/404';
import { authenticationService } from '../../services/authentication-service';
import { LoggerService } from '../../helpers/logger-service';

export class MainLayout extends React.Component{
    userData
    constructor(props){
        super(props)
        console.log(props)
        console.log("MainLayout Component:: Constructor");
        this.userData = JSON.parse(localStorage.getItem("currentUser"));
    }

    style = {
        color: 'red',
        fontSize: 50
      };

    componentDidMount(){
        
       /*  authenticationService.currentUser.subscribe( user => {
            if(user){
                this.userData = user;
            }
        }); */
    }  

    render(){
        console.log("MainLayout Component:: render");
        return (
            <>
                <Header />
                <div className="container">
                    <Switch>
                        <Route path="/search-planet" render={ () => <PlanetSearch  user={this.userData}  />} />
                        <Route path="/planet-details/:planetId" component={PlanetDetails}/>
                        <Route component={NoMatch} />
                    </Switch>
                    <Footer props={this.props} />
                </div>
            </>
        )
    }
}