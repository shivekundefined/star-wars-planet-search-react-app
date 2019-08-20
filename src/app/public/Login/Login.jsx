import React from 'react';
import { authenticationService } from '../../services';
import { ROUTES } from '../../../constants/Routes';

class Login extends React.Component{
    private_default = ROUTES.DEFAULT_IF_LOGGED_IN
    constructor(props){
        super(props);
        this.state = {
            userName: 'Luke Skywalker',
            password: '19BBY',
            showError: false
        };
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        authenticationService.login(this.state.userName, this.state.password).then( user => {
            this.props.history.push(this.private_default)
            //this.props.isLoggedIn = true;
        }, error => {
            alert(error.message)
        } )
        
    }

    render(){
        const { showError } = this.state;
        return (
            <div className="card-body">
                <h5 className="card-title text-center">Welcome {this.state.userName}</h5>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <div className="form-label-group">
                        <input
                            id="inputEmail"
                            type="text"
                            placeholder="User Name"
                            value={this.state.userName}
                            onChange={event => this.setState({ userName: event.target.value })}
                            required
                            autoFocus
                            className="form-control"
                        />
                        <label htmlFor="inputEmail">Email address</label>
                    </div>

                    <div className="form-label-group">
                        <input
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={event => this.setState({ password: event.target.value })}
                            required
                            className="form-control"
                        />
                        <label htmlFor="inputPassword">Password</label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                </form>   
                <div className="form-group">
                    <div className="col-md-6">
                        {showError && <span >Please Enter Correct Username/Password</span>}
                    </div>
                </div> 
            </div>  
        );    
    }
}

export default Login