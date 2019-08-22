import React from 'react';
import { authenticationService } from '../../services';
import { ROUTES } from '../../../constants/Routes';
import { LoggerService } from '../../helpers/logger-service';

class Login extends React.Component{
    logged_in_success = ROUTES.SUCCESS_LOGGED_IN
    constructor(props){
        super(props);
        LoggerService.log("Login:: Class Constructor")
        this.state = {
            userName: 'Luke Skywalker',
            password: '19BBY',
            showError: false,
            submitted: false
        };
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ submitted: true });
        const { userName, password } = this.state;
        if (userName && password) {
            authenticationService.login(userName, password).then( user => {
                //this.props.isLoggedIn = true;
                this.props.history.push(this.logged_in_success)
            }, error => {
                LoggerService.log(error);
                this.setState({
                    showError : true
                })
                alert(error.message)
            } )
        }
        
        
    }

    render(){
        LoggerService.log("Login:: Render")
        LoggerService.log(this.state);
        const { showError, submitted, userName, password } = this.state;
        LoggerService.log(showError);
        return (
            <div className="card-body">
                <h5 className="card-title text-center">Welcome {this.state.userName}</h5>
                {
                    showError && <div className="alert alert-danger" role="alert">
                                    <span >Please Enter Correct Username/Password</span>
                                </div>
                }
                
                <form className="form-signin" onSubmit={this.handleSubmit} noValidate>
                    <div className="form-label-group">
                        <input
                            id="inputEmail"
                            type="text"
                            placeholder="User Name"
                            value={this.state.userName}
                            onChange={event => this.setState({ userName: event.target.value })}
                            required
                            autoFocus
                            className={'form-control' + (submitted && !userName ? ' is-invalid' : '')}
                        />
                        <label htmlFor="inputEmail">Email address</label>
                        {submitted && !userName &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </div>

                    <div className="form-label-group">
                        <input
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            required
                            onChange={event => this.setState({ password: event.target.value })}
                            className={'form-control' + (submitted && !userName ? ' is-invalid' : '')}
                        />
                        <label htmlFor="inputPassword">Password</label>
                        {submitted && !password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                </form>   
                
            </div>  
        );    
    }
}

export default Login