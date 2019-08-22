import React from 'react'
import { authenticationService } from '../../services';
import { LoggerService } from '../../helpers/logger-service';

const Footer = ({props}) => {
    LoggerService.log(props)
    const footer_styles= {
            'backgroundColor': '#f5f5f5'
    }

    const logout = (e) => {
        authenticationService.logout();
        props.history.push('/login');
    }

    return (
       <>
            <div className="mt-5 p-3 text-center" style={footer_styles}>
                <span className="btn btn-outline-primary" onClick={(event) => logout(event)}> Logout </span>
            </div>
       </>
    )
}

export default Footer