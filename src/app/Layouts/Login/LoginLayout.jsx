
import React from 'react'
import Login from '../../public/Login/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Register } from '../../public/Register/Register';
import './LoginLayout.scss'
import { ROUTES } from '../../../constants/Routes';

export class LoginLayout extends React.Component{
    private_default = ROUTES.DEFAULT_IF_LOGGED_IN;
    constructor(props){
        super(props)
    }   

    render(){
        return (
            <>
                <Route
                    {...this.props}
                    render={props =>
                        !this.props.isLoggedIn ? (
                            <div className="container">
                            <div className="row">
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
                            pathname: this.private_default,
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
