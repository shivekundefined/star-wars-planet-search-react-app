
import React from 'react'
import Login from '../../public/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Register } from '../../public/Register';
import './LoginLayout.scss'
import { ROUTES } from '../../../constants/Routes';
import { LoggerService } from '../../helpers/logger-service';

export class LoginLayout extends React.Component{
    default_route_if_logged_in = ROUTES.DEFAULT_IF_LOGGED_IN;
    constructor(props){
        super(props)
        LoggerService.log("Login Layout:: Class Constructor")
        LoggerService.log("Login Layout::",props)
    }   

    render(){
        LoggerService.log("Login Layout:: Render")
        return (
            <>
                <Route
                    {...this.props}
                    render={props =>
                        !this.props.isLoggedIn ? (  
                            <div className="container">
                            <div className="row align-items-center h-100">
                                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                    <div className="card card-signin my-5">
                                    <Switch>
                                       {/*  <Route exact path="/" component={Login}/> */}
                                        <Route path="/login" isLoggedIn={this.props.isLoggedIn} component={Login}/>
                                        <Route path="/register" component={Register}/>
                                    </Switch>  
                                    </div>
                                </div> 
                            </div>           
                        </div>
                    ) : (
                        <Redirect
                        to={{
                            pathname: this.default_route_if_logged_in,
                            state: { from: props.location }
                        }}
                        />
                    )
                    }
                />
            </>
        );
    }
}
