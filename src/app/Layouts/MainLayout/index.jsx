

import React from 'react';
import Header from '../../LayoutComponents/Header';
import Footer from '../../LayoutComponents/Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
//import starWarsLogo from './assets/images/star-wars-logo.png'
import NoMatch from '../../public/404';
import { authenticationService } from '../../services/authentication-service';
import { LoggerService } from '../../helpers/logger-service';
import {AppContextLoader} from '../../Providers/Context'
import { PlanetSearch } from '../../Protected/Search/PlanetSearch';
import { PlanetDetails } from '../../Protected/PlanetDetails';

export class MainLayout extends React.Component{
    userData
    constructor(props){
        super(props)
        LoggerService.log(props)
        LoggerService.log("MainLayout Component:: Constructor");
        this.userData = JSON.parse(localStorage.getItem("currentUser"));
    }

    render(){
        LoggerService.log("MainLayout Component:: render");
        return (
            <>  
                <AppContextLoader.Consumer>
                    {context => (
                        <React.Fragment>
                            <Header />
                            <div className="container">
                                <Switch>
                                    <Route path="/search-planet" render={ () => <PlanetSearch context={context} user={this.userData}  />} />
                                    <Route path="/planet-details/:planetId" render={ (props) => <PlanetDetails {...props} context={context} />} />
                                    <Route component={NoMatch} />
                                </Switch>
                                <Footer props={this.props} />
                            </div>
                         </React.Fragment> 
                        )
                    }
                </AppContextLoader.Consumer>
            </>
        )
    }
}