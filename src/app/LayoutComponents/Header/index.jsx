
import React from 'react';
//import logo from '/assets/images/logo-star-wars.png';

const Header = (props) => {
    const style = {
        height: '80px',
        padding: '10px',
        background: '#3d3939'
    }
    return (
        <>
            <nav className="text-center mb-3" style={style}>
                <img
                    className="img-fluid h-100"
                    src="/assets/images/logo-star-wars.png"
                    alt="Star Wars: App"
                />
            </nav>
        </>
    )
}

export default Header